# 9. Hooks、関数コンポーネントの合体強化パーツ

# 9-1. Hooks に至るまでの物語

## 手軽ながら壊れやすかった Mixins

2013年に公開された当初のReactではコンポーネントはクラスしかなく、しかもそれを通常のクラス定義ではなく `React.createClass` というメソッドを使って生成するようになっていた。
その引数はオブジェクト。 `render` メソッドなどのそのプロパティとして実装していく形だった。
そして、 `mixins` というプロパティでそのコンポーネントに追加したいクラスメンバーを任意のオブジェクトに格納して登録出来た。それが mixins という手法。

mixinsの問題点

- コンポーネントとの間に暗黙的な依存関係を持ってしまう
  - ミックス先コンポーネントに特定の名前の props, state, メソッド 等があることを前提とした記述になりがち
- 名前の衝突が起きやすい
- ある mixin は 他の mixin に依存するようになり、どれか一つを削除すると他の mixin が壊れるような事態が生じがち

## コミニティにより普及したHOC

HOC =Higher Order Component で、日本語では **高階コンポーネント** 。
HOC とはコンポーネントを引数ニトリ、返り値としてコンポーネントを返す関数のこと。

```ts
type Props = {target: string};
const HelloComponent: FC<Props> = ({target}) => <h1>hello {target}</h1>;

export default withTarget(HelloComponent);

// 呼び出し
const withTarget = (WrappedComponent: FC<Props>) => WrappedComponent({target: 'Parry'});
```

`withTarget` はコンポーネントを受け取り `target` の実体を注入したコンポーネントを返す関数、
すなわち高階コンポーネント。

## Hooksの対抗馬 Render Props

軒並みメジャーなライブラリのインターフェースとして採用され、Recompose が普及して一世を風靡したといっていい HOC だったが、公式はほどなく HOC を推すことをやめ、別の新しい手法を推奨するようになった。
それが Render Props と呼ばれるパターン。

コンポーネントが React Elements を返す関数を props として受け取り、それを自身のレンダリングに利用する。
厳密には受け渡されてレンダリングに使われる props の方を指す言葉。

## Hooks の登場

HOC や render props が共通して抱えていた問題は、ロジックの追加が著しくコンポーネントツリーを汚染してしまうこと。
追加するロジックの分だけコンポーネントの階層が深くなってしまう。

また、HOC も render props も状態を持つロジックを分離はできても、積極的に再利用出来るほどには抽象化出来なかった。

Hooks はコンポーネントにロジックを抱えた別のコンポーネントをかぶせるのではなく、コンポーネントシステムの外に状態やロジックを持つ手段を提供した。
状態を持ったロジックを完全に任意のコンポーネントから切り離し、それ単体でテストしたり、別のコンポーネントで再利用することが簡単にできるようになった。

React が根本的に抱えていた大きな問題の1つに、クラスコンポーネントの存在がある。
React にとっての理想のコンポーネントは純粋関数であるはずなのに、 state やライフサイクルメソッドはクラスコンポーネントしか持つことが出来なかったため、クラスコンポーネントを使わざるを得なかった。
しかし、Hooks がコンポーネントシステムの外に状態やロジックを保つ仕組みを提供したため、ほぼ関数コンポーネントだけでアプリケーションを作れるようになった。

### Hooks の由来

コンポーネントに外から状態やロジックを紐付ける、つまり「引っ掛けて」おく仕組みを提供するというニュアンス。
引っ掛けておけば、後は React が然るべきタイミングで然るべき処理をしてくれるので、 React らしい宣言的な手法と言える。

# 9-2. Hooks で state を扱う

## State Hook の基礎

まずは Hooks で state を使う方法から。
これは **State Hook** と言い、クラスコンポーネントの `state` に相当するものを関数コンポーネントでも使えるようにする機能。

```jsx
const [count, setCount] = useState(0);
setCount(100);
setCount(prevCount => prevCount + 1);
```

`useState(initialValue)` は返り値として `state` 変数とその `state` 更新関数をタプルとして返す。
そのため、上のように分割代入で受け取る。

クラスコンポーネントと異なる点は、 `useState` ではプロパティを特定する必要がなく、 state 変数・state 更新関数がそれぞれ独立している点。

## TypeScriptで `useState` を使う時の注意点

**state の型が推論出来るかどうか** という点に注意する必要がある。
`number` や `string` などの型であれば引数を型推論してくれる。

しかし、例えば外部APIにリクエストしてユーザ情報を取得、そのオブジェクトを state に入れるような場合は、明示的に型引数を渡してやる必要がある。

```tsx
const [author, setAuthor] = useState<User>();
const [articles, setArticles] = useState<Article[]>([]);
```

最初の例は `User` というオブジェクト型を型引数として渡し、引数には何も渡していない。
こうすると `author` は `User` オブジェクトを格納できる、初期値 `undefined` の state 変数になる。

次の例は、初期値を渡しながらも型推論が使えない場合の書き方。
`Article[]` にしたくて、初期値は `[]`空配列 にしたい場合。

## サンプルコード: カウンター

```tsx
import React, { FC, useState } from 'react';
import { Button, Card, Statistic } from 'semantic-ui-react';
import './Counter.css';

const Counter: FC = () => {
  const [count, setCount] = useState(0);
  const reset = () => setCount(0);
  const increment = () => setCount((c) => c + 1);

  return (
    <Card>
      <Statistic className="number-board">
        <Statistic.Label>count</Statistic.Label>
        <Statistic.Value>{count}</Statistic.Value>
      </Statistic>
      <Card.Content>
        <div className="ui two buttons">
          <Button color="red" onClick={reset}>
            Reset
          </Button>
          <Button color="green" onClick={increment}>
            +1
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default Counter;
```

## 制限事項

### state 変数がレンダリングごとに一定

次のコードは、直感的にはどちらも `count` が `3` 加算されるように思える、

```jsx
const plusThreeDirectly = () => [0, 1, 2].forEach((_) => setCount(count + 1));
const plusThreeWithFunction = () => [0, 1, 2].forEach((_) => setCount((c) => c + 1));
```

しかし、実際には前者の `plusThreeDirectly` は `1` しか加算されない。

なぜなら、 **state 変数はコンポーネントのレンダリングごとで一定だから**。
`plusTheeDirectly` はそのレンダリング時点での `count` が `0` だった場合、それを `1` に上書きする処理を3回繰り返すことになる。

そのため、必ず `setState((prevState) => prevState + 1);` のように書くべき。

### Hooks の呼び出しは論理階層のトップレベルでなければならない

以下のように、条件文や繰り返し処理の中で呼び出してはいけない。
これは Hooks の実装に起因するもの。

```jsx
const Counter: VFC<{max: number}> = ({max}) => {
  const [count, setCount] = useState(0);

  if (count >= max) {
    const [isExceeded, setIsExceeded] = useState(true);
    doSomething(...);
  }
}
```
