# Reduxでグローバルな状態を扱う

React ではコンポーネントそれぞれが状態を持つ。
そのため、ログインなどのグローバルに保持しておきたい状態の管理に問題を抱えていた。

その解決策となったのが Flux パターン、及びその実装である Redux というライブラリ。


# 11-1. Redux の歴史

## Fluxパターン

![flux-pattern](../../images/8639fd865b61ac1ce2f1741e040d5daef508367291f71c61e7e86bbd4b2f64f2.png)

- Store ...... アプリケーション全体で参照したい状態データの保管庫
- Action ...... イベントにおける『何をどうしたいか』という意図を表現したもの
- Dispatcher ......actionの種類を判断して、それにひもづけられたstoreの更新処理を行うもの

## Redux

Redux は Flux パターンを実装したライブラリ。2022年現在の覇権。

TODO 見る : https://www.youtube.com/watch?v=xsSnOQynTHs

# 11-2. Redux の使い方

## Redux の思想

- Single source of truth
- State is read-only
- Changes are made with pure functions

Redux において store は状態を格納する1つのステートツリーと、それを更新するための reducer という純粋関数で表現される装置から構成されている。

reducer を極限まで抽象化すると、 `(prevState, action) => newState` という式で表現される。
reducer では状態を内部に抱えず、ただの入出力値として扱う。それによって action が同じであれば、入力した状態と出力された状態の差分も常に同一であることが保証される。

reduce には 「減らす」以外に「還元する」「減数分裂させる」といった意味もある。

## Redux をアプリケーションに組み込む

必要なライブラリは Redux と [React Redux](https://react-redux.js.org/)。

後者は Redux を React バインディングするための公式ライブラリ。
Redux自体はReact専用ではないので、それぞれのフレームワークに組み込むためのバインディングが必要になる。

```zsh
yarn add redux react-redux
(typesync)
yarn
```

## サンプルコード

ディレクトリ構造は以下。
`actions.ts` と `reducer.ts` が Redux 特有のファイル。

```zsh
├── App.css
├── App.tsx
├── actions.ts
├── components
│   ├── molecules
│   │   ├── ColorfulBeads.css
│   │   └── ColorfulBeads.tsx
│   └── organ
│       ├── CounterBoard.css
│       └── CounterBoard.tsx
├── containers
│   ├── molecules
│   │   └── ColorfulBeads.tsx
│   └── organisms
│       ├── CounterBoard-HOC.tsx
│       └── CounterBoard.tsx
├── index.css
├── index.tsx
├── react-app-env.d.ts
├── reducer.ts
├── reportWebVitals.ts
└── setupTests.ts
```

### `index.tsx`

#### `Provider` コンポーネント

```tsx
// index.tsx
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { counterReducer, initialState } from 'reducer';
import reportWebVitals from './reportWebVitals';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

const store = createStore(counterReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);

reportWebVitals();
```

Redux では、上位のコンポーネントで provider コンポーネントを設置しておいて、その子孫のコンポーネントの中でライブラリが提供する Hooks API でその機能を使うようになっている。

provider コンポーネントは `Provider` という名前で、最初に store を初期化、 props として渡してやる必要がある。

#### `createStore`

`Provider` コンポーネントに渡す store を作成する。
引数として reducer と state の初期値を渡す様になっている。

### `action.ts`

```ts
export const CounterActionType = {
  ADD: 'ADD',
  DECREMENT: 'DECREMENT',
  INCREMENT: 'INCREMENT',
} as const;

type ValueOf<T> = T[keyof T];

export type CounterAction = {
  type: ValueOf<typeof CounterActionType>; // 'ADD' | 'INCREMENT' | 'DECREMENT'
  amount?: number;
};

export const add = (amount: number): CounterAction => ({
  type: CounterActionType.ADD,
  amount,
});

export const decrement = (): CounterAction => ({
  type: CounterActionType.DECREMENT,
});

export const increment = (): CounterAction => ({
  type: CounterActionType.INCREMENT,
});
```

サンプルコードにはインクリメント、デクリメント、任意の数の加算という3種類のイベントがあるので、冒頭で `CounterActionType` として3種類のアクションの型を定義している。

更に、 `ValueOf` を使って `CounterAction` が 文字列共用体型 を `type` の型として持つようにしている。

#### action creator

Redux の action は「どんなイベントが起こったのか表現するプレーンなオブジェクト」。

定義している関数 `add` `decrement` `increment` はそれぞれ action を生成する **action creator** と呼ばれる関数。
despatcher に action を発行する際は直接生の値を渡す ( `{type: 'ADD', amount: 10}` のように ) のではなく、 action creator 関数の返り値を使うようにする。

### reducer.ts

```ts
import { Reducer } from 'redux';
import { CounterAction, CounterActionType as Type } from 'actions';

export type CounterState = { count: number };
export const initialState: CounterState = { count: 0 };

export const counterReducer: Reducer<CounterState, CounterAction> = (
  state: CounterState = initialState,
  action: CounterAction,
): CounterState => {
  switch (action.type) {
    case Type.ADD:
      return {
        ...state,
        count: state.count + (action.amount || 0),
      };
    case Type.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case Type.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    default: {
      const _: never = action.type;

      return state;
    }
  }
};
```

#### reducer

reducer とは、 `(prevState, action) => newState` で表現される純粋関数。

この `counterReducer` も state と action を引数にとった上で、 `action.type` によって分岐した中で `count` の値を更新、新しい state を返している。

### `CounterBoard.tsx` (Presentational)

```tsx
import { VFC } from 'react';
import { Button, Card, Statistic } from 'semantic-ui-react';
import './CounterBoard.css';

const BULK_UNIT = 10;
type Props = {
  count?: number;
  add?: (amount: number) => void;
  decrement?: () => void;
  increment?: () => void;
};

const CounterBoard: VFC<Props> = ({
  count = 0,
  add = () => undefined,
  decrement = () => undefined,
  increment = () => undefined,
}) => (
  <Card>
    <Statistic className="number-board">
      <Statistic.Label>count</Statistic.Label>
      <Statistic.Value>{count}</Statistic.Value>
    </Statistic>
    <Card.Content>
      <div className="ui two buttons">
        <Button color="red" onClick={decrement}>
          -1
        </Button>
        <Button color="green" onClick={increment}>
          +1
        </Button>
      </div>
      <div className="fluid-button">
        <Button fluid color="grey" onClick={() => add(BULK_UNIT)}>
          +{BULK_UNIT}
        </Button>
      </div>
    </Card.Content>
  </Card>
);

export default CounterBoard;
```

このコンポーネントでは `count` `add` `decrement` `increment` が全て Redux とつなぎこむ器として props で受け取れるようになっている。

props は2種類に分かれている。

1. 値を参照するだけの `count`
2. `onClick` のコールバック関数として定義されている `add` `decrement` `increment`

この区別で Redux とのつなぎ方が異なる。

### CounterBoard.tsx (Container Component)

```tsx
import { VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { add, decrement, increment } from 'actions';
import { CounterState } from 'reducer';
import CounterBoard from 'components/organisms/CounterBoard';

const EnhancedCounterBoard: VFC = () => {
  const count = useSelector<CounterState, number>((state) => state.count);
  const dispatch = useDispatch();

  return (
    <CounterBoard
      count={count}
      add={(amount: number) => dispatch(add(amount))}
      decrement={() => dispatch(decrement())}
      increment={() => dispatch(increment())}
    />
  );
};

export default EnhancedCounterBoard;
```

#### `useSelector`

store から任意の state の値を抽出するためのAPI。

引数として、 「state を受け取ってそこから必要な値を抜き出して返す関数」を取る。

型引数は `<CounterState, number>` となっている。
第1引数は store の state ツリー全体の型、第2引数が抽出する state 値の型。

#### `useStore`

store の state をまるごと取得する。
あまり使う機会がない。

#### `useDispatch`

`dispatch` を定義するために使っている。

action を dispatch する、つまり dispatcher に渡すための関数を取得するもの。

action creator 関数を引数に取る。 `dispatch(increment())` のように記述する。

#### 厳密に書くと

`increment` props に渡す関数をレンダリングごとに生成せず、かつボタン要素のデフォルト挙動を抑制しようとするとこうなる。

```tsx
  const increment = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(increment());
    }, [dispatch],
  );
  // ...
  return (
    <Counter>
      count={count},
      increment={increment},
      // ...
  )
```
