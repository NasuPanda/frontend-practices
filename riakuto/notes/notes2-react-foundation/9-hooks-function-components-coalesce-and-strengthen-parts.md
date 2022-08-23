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

# 9-3. Hooks で副作用を扱う

## 副作用の概要

副作用を扱う Hooks API を **Effect Hook** という。

コンポーネントの副作用とは何か。
具体例を示すと、ネットワークを介したデータの取得やそのリアクティブな購読、ログの記録、リアルDOMの手動での書き換えなど。

副作用は英語では *side-effect* 、 または単に *effect* と呼ばれる。
もともとは関数型プログラミングの文脈で用いられる用語で、React でもその意味で使われている。

React における副作用とは、コンポーネントの状態を変化させ、それ以降の出力を変えてしまう処理のこと。

React におけるコンポーネントとは、状態を持った関数のようなもの。
関数 *y = f(x)* は本来なら 参照透過性が保たれているが、状態を抱える関数は必ずともそうとは限らない。
例えば、 f(x) は 2 を返していたのがある処理を実行することで、それ以降は 4 を返すようになる、といった具合に。これが副作用。

Hooks が適用されるコンポーネントは関数コンポーネント。
Effect Hook とは、 props が同一でもその関数コンポーネントの出力内容を変えてしまうような処理をレンダリングのタイミングに同期させて実行するための Hooks API のこと。

## Effect Hook の使い方

```tsx
const SampleComponent: VFC = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    doSomething();

    return () => clearSomething();
  }, [someDeps]);
};
```

`useEffect` は第1引数として、引数を持たない関数を受け取る。この関数の中身が任意のタイミングで実行されるもの。
ここでは省略されているが、一般的には何らかの処理の結果、そのコンポーネントの sate 変数を書き換えたりする。

そして、 `useEffect` に引数として渡された関数が `clearSomething` 関数を返している。

このようにして、第1引数として渡す関数が任意の引数を返すようになっていると、そのコンポーネントがアンマウントされる時にその返り値の関数を実行してくれる。
アンマウント時に実行したい処理が特に無ければ何も返さなくていい。

具体例: 外部のAPIからリアクティブにデータを購読していた場合、その購読を解除する。

***

`useEffect` は第2引数として、変数の配列を渡せるようになっている。

この配列の中に格納された変数が一つでも前のレンダリング時と比較して差分があったときだけ、第1引数の関数が実行される。
この第2引数のことを **依存配列 (dependencies array)** とも言う。

省略した場合、レンダリングごとに第1引数の関数が実行される。
一方 空配列 `[]` を渡すと、初回レンダリング時のみ第1引数の関数が実行される。

### サンプルコード: タイマー

```tsx
import React, { FC, useEffect, useState } from 'react';
import { Button, Card, Icon, Statistic } from 'semantic-ui-react';
import './Timer.css';

const Timer: FC<{ limit: number }> = ({ limit }) => {
  const [timeLeft, setTimeLeft] = useState(limit);
  const reset = (): void => setTimeLeft(limit);
  const tick = (): void => setTimeLeft((t) => t - 1);

  useEffect(() => {
    const timerId = setInterval(tick, 1000);

    return () => clearInterval(timerId);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (timeLeft === 0) setTimeLeft(limit);
  }, [timeLeft, limit]);

  return (
    <Card>
      <Statistic className="number-board">
        <Statistic.Label>time</Statistic.Label>
        <Statistic.Value>{timeLeft}</Statistic.Value>
      </Statistic>
      <Card.Content>
        <Button color="red" fluid onClick={reset}>
          <Icon name="redo" />
          Reset
        </Button>
      </Card.Content>
    </Card>
  );
};

export default Timer;
```

`useState` で `timeLeft` 変数と `setTimeLeft` 関数を定義。
`timeLeft` に `props` から受け取った `limit` を渡すことで値を初期化。

1つ目の `useEffect` では、 `setInterval` により `tick` 関数が1秒毎に実行されるように設定。
第1引数の関数から `clearInterval` を実行する関数を返すことで、アンマウント時に `clearInterval` を実行する。
第2引数に空配列を渡しているので、初回のみ実行される。

2つ目の `useEffect` では、 `timeLeft` の値が `0` だったとき、 `setTimeLeft` に `limit` を渡すことで `timeLeft` の値を初期化している。
なお、第2引数を省略してしまうと、以下のようなエラーが出る。

> error:  React Hook useEffect contains a call to 'setTimeLeft'. Without a list of dependencies, this can lead to an infinite chain of updates. To fix this, pass [timeLeft, limit] as a second argument to the useEffect

ここでは判断材料に `timeLeft` を使っている。また、値の再設定に props である `limit` を使っている。

つまり、この処理は `timeLeft` か `limit` が変更された後でなければ実行する意味がない。
そのため、依存配列として `[timeLeft, limit]` が必要。
