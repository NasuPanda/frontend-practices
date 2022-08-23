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

## Effect Hook と ライフサイクルメソッドの相違点

`useEffect` は `componentDidMount` や `componentDidUpdate` とは厳密には異なる。
違いは主に以下の3つ。

1. 実行されるタイミング
2. props と state の値の即時性
3. 凝集の単位


### 実行されるタイミング

`componentDicMount` はそのコンポーネントがマウントされてレンダリング内容が仮想DOMからリアルDOMへ反映される前に、ブラウザの表示をブロックして実行される。
そのため、時間のかかる同期的な処理が登録されているとその部分には何も表示されない。

一方、 `useEffect` が実行されるのは最初のレンダリングが行われてその内容がブラウザに反映された直後。
コンポーネントは初期値でレンダリングされた後、改めて副作用が反映された内容で再レンダリングされる。

なぜかというと、副作用の処理がコンポーネントの表示をブロックしない、というのがレスポンス性を高めてアプリケーション全体でのUX向上につながるから。
処理に時間がかかるのは同じだとして、それが終わるまで何も表示されないかとりあえず何かが表示されるかでは後者の方が良い。

例
![placeholder in loading](../../images/7ec2fb88aec8eb4a9cbd8bc7aeb8b9904f528c934eeb26176b754df719de0730.png)

なお、 `useLayoutEffect` という、 `componentDidMount` などと同じタイミングで画面の更新をブロックして実行される Effect Hooks API も用意はされている。

### props と state の値の即時性

クラスコンポーネントではマウント時にインスタンスが生成され、アンマウント時に破棄されるまでそのインスタンスは生き続ける。

意識しておきたいのは、クラスコンポーネントにとってのレンダリング = そのインスタンスの `render` メソッドの実行だということ。
そして、 props と state はそのインスタンスの中に保持されている可変のメンバー変数であり、**レンダリングのタイミングに関わらずメンバーメソッドからはつねに最新の値が参照される**。

一方、関数コンポーネントにとってレンダリングとはその関数が最初から最後まで実行されること。

クラスコンポーネントと違い、関数コンポーネントは毎回自身が実行されてそのまま終わる。
故にその中で定義されている変数や関数も実行の度に定義し直され、実行が終わればその都度破棄される。

普通の関数コンポーネントなら実行された後に何も残らないが、その中で State Hook が使われていた場合、そのレンダリング後の state がコンポーネントシステムの外に保存され、次のレンダリングが始まるタイミングで改めてまたコンポーネントに渡される。
そのため、**関数コンポーネントでは props と state がレンダリングごとで不変**。

では、具体的にどのような違いがあるのか。
クラスコンポーネントのメンバーメソッドで参照される props や state は常に最新の値なので、負荷のかかる処理を伴う UI ではタイムラグを考慮する必要がある。
処理に時間がかかってレンダリングが追いつかない状態で UI を操作をすると、新しすぎる props や state の値が想定外の挙動を起こすことがある。
関数コンポーネントではそれがない。

↑の挙動の詳細 : [関数コンポーネントはクラスとどう違うのか? — Overreacted](https://overreacted.io/ja/how-are-function-components-different-from-classes/)

### 凝集の単位

**関心の分離** の観点から ライフサイクルメソッドと Effect Hook を比較すると分かりやすい。

クラスコンポーネントではそのコンポーネントのライフサイクルのフェーズにあたり、対応するライフサイクルメソッドがコールされる。
そのため時間的凝集度が高く、機能的凝集度が低い。

どういうことかというと、クラスコンポーネントで外部 API からデータのリアクティブ な購読をしたい場合、`componentDidMount` に購読開始の処理を書き、`componentDidUpdate` に購読対象の切り替え処理を書き、`componentWillUnmount` に購読解除の処理を書くというように、購読に関する機能が3つのライフサイクルメソッドに分散されてしまう。
これが機能的凝集度が低いということ。

関数コンポーネント内に記述された `useEffect` の第1引数の関数は、基本、毎回のレンダリング直後に実行される。(正確には依存配列を参照するが)
そのため、↑の例にあった購読のための3つの処理も同じ `useEffect` の中にまとめて書く事ができる。つまり、機能的凝集度が高い。

機能的凝集度が高いということは、同じ機能が分散されて書かれないためコードの可読性が高い。
また、機能によってまとまったロジックをコンポーネントから切り離して再利用しやすい。


設計においては、
コンポーネントのライフサイクルという時間軸の中でどこに副作用処理を埋め込むか
という観点から、
この副作用処理を行うべきなのはコンポーネントの状態がどういう時か、と言う考え方が求められるようになる。

## 学習リソース

[useEffect完全ガイド — Overreacted](https://overreacted.io/ja/a-complete-guide-to-useeffect/)

# 8-4. Hooks におけるメモ化

## メモ化とは

関数型プログラミングの文脈でよく用いられる手法。
関数内における任意のサブルーチンを呼び出した結果を後で再利用するために保持しておき、その関数が呼び出される度に再計算されることを防ぐ、プログラム高速化の手法のこと。

## `useMemo`

次のような関数の計算結果をメモ化する。

```tsx
export const getPrimes = (maxRange: number): number[] =>
  [...Array(maxRange + 1).keys()].slice(2).filter((n) => {
    for (let i = 2; i < n; i += 1) {
      if (n % i === 0) return false;
    }

    return true;
  });
```

```tsx
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button, Card, Icon, Statistic } from 'semantic-ui-react';
import { getPrimes } from 'utils/math-tool';
import './Timer.css';

type TimerProps = {
  limit: number;
};

const Timer: FC<TimerProps> = ({ limit }) => {
  const [timeLeft, setTimeLeft] = useState(limit);
  // メモ化
  const primes = useMemo(() => getPrimes(limit), [limit]);
  const reset = () => setTimeLeft(limit);
  const tick = () => setTimeLeft((t) => t - 1);

  useEffect(() => {
    const timerId = setInterval(tick, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) setTimeLeft(limit);
  }, [timeLeft, limit]);

  return (
    <Card>
      <Statistic className="number-board">
        <Statistic.Label>time</Statistic.Label>
        <Statistic.Value
          className={primes.includes(timeLeft) ? 'prime-number' : undefined}
        >
          {timeLeft}
        </Statistic.Value>
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

`useMemo` の第1引数に実行したい関数、第2引数にその依存配列を渡す。
ここでは `limit` が変わったときだけ再計算すればいいので、依存配列に `limit` を入れている。

## `useCallback`

`useEffect` に次のような変更を加えてみる。

```tsx
  useEffect(() => {
  - if (timeLeft === 0) setTimeLeft(limit);
  + if (timeLeft === 0) reset();
  }, [timeLeft, reset]);
```

すると、「useEffect Hook における reset 関数への依存がレンダリングごとに変わってしまい ます。これを修正するには、reset の定義を useCallback() にラップしてください」というエラーが出る。

これは、関数のアドレスが違う事による。
関数は、値が同じなら同一のものをみなされるプリミティブ型の変数と異なり、内容が同じであっても定義ごとに指しているメモリアドレスが異なる。
そのため、比較では別物と判断される。

そのため、 `useEffect` の依存配列に `reset` 関数を入れるのは、毎回のレンダリングで第1引数の関数を実行することと等しい。

そこで、 `useCallback` を使う。
これは、関数定義そのものをメモ化するためのもの。

```tsx
- const reset = () => setTimeLeft(limit);
+ const reset = useCallback(() => setTimeLeft(limit), [limit]);
```

こうすることで、 props である `limit` が変わったときだけ、 `reset` 関数が再定義されるようになる。

このように、メモ化はパフォーマンスの最適化以外に、依存関係を適切化して不要な再レンダリングを避けるためにも用いられる事がある。

## `useRef`

本来はリアルDOMへの参照に用いる **refオブジェクト** を生成するために使う。

```tsx
import React, { FC, SyntheticEvent, useEffect, useRef } from 'react';

const TextInput: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = (e: SyntheticEvent): void => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    if (inputRef.current) alert(inputRef.current.value);
  };
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick} type="button">
        Click
      </button>
    </>
  );
};

export default TextInput;
```

`useRef` で生成した ref オブジェクト `inputRef` を JSX の `<input>` 要素の `ref` 属性に代入している。
こうすることで、 `<input>` のリアルDOMのノードが `inputRef.current` で参照出来るようになる。

`useRef` により、あらゆる書き換え可能な値を保持しておくことが出来る。

state との違いは、再レンダリングが発生しない点。
再レンダリングを伴わずに何らかのデータを関数コンポーネントで保持しておきたいケースでは `useRef` を使う。

### 具体例

次のサンプルコードを参照。

```tsx
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button, Card, Icon, Statistic } from 'semantic-ui-react';
import { getPrimes } from 'utils/math-tool';
import './Timer.css';

type TimerProps = {
  limit: number;
};

const Timer: FC<TimerProps> = ({ limit }) => {
  const [timeLeft, setTimeLeft] = useState(limit);
  const primes = useMemo(() => getPrimes(limit), [limit]);
  const reset = () => setTimeLeft(limit);

  const tick = () => setTimeLeft((t) => t - 1);

  useEffect(() => {
    const timerId = setInterval(tick, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) reset();
  }, [timeLeft, reset]);

  return (
    <Card>
      <Statistic className="number-board">
        <Statistic.Label>time</Statistic.Label>
        <Statistic.Value
          className={primes.includes(timeLeft) ? 'prime-number' : undefined}
        >
          {timeLeft}
        </Statistic.Value>
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

問題点として、 props の `limit` が変更された場合には新しい `limit` でタイマーが初期化されるべきだが、それがない。
そのため、1つ目の `useEffect` の依存配列に `limit` を入れて上げる必要がある。

ただし、そうすると `limit` が変わる度に `setInterval` が呼ばれ、タイマーの挙動がおかしくなってしまう。

そこで、残り時間をリセットした上で以前のカウントダウンタスクをクリアする必要がある。
そのため、 `useRef` を使ってタイマーIDを保持しておき、 `limit` が変更されたらそのIDでクリア処理を行う。

```tsx
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, Card, Icon, Statistic } from 'semantic-ui-react';
import { getPrimes } from 'utils/math-tool';
import './Timer.css';

const Timer: FC<{ limit: number }> = ({ limit }) => {
  const [timeLeft, setTimeLeft] = useState(limit);
  const primes = useMemo(() => getPrimes(limit), [limit]);
  const timerId = useRef<NodeJS.Timeout>();
  const reset = useCallback(() => setTimeLeft(limit), [limit]);
  const tick = () => setTimeLeft((t) => t - 1);

  useEffect(() => {
    const clearTimer = () => {
      if (timerId.current) clearInterval(timerId.current);
    };

    reset();
    clearTimer();
    timerId.current = setInterval(tick, 1000);

    return clearTimer;
  }, [limit, reset]);

  useEffect(() => {
    if (timeLeft === 0) reset();
  }, [timeLeft, reset]);

  return (
    <Card>
      <Statistic className="number-board">
        <Statistic.Label>time</Statistic.Label>
        <Statistic.Value
          className={primes.includes(timeLeft) ? 'prime-number' : undefined}
        >
          {timeLeft}
        </Statistic.Value>
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

`useRef` により `timerId` にタイマーIDを保持。

`useEffect` 内の処理は `limit` / `reset` が変更されたときに実行され、
`timerId` に値があればそれを使って `clearInterval` を呼び出し、カウントダウンのリセット、 `timerId` の初期化等を行う。

## 学習リソース

[フックに関するよくある質問 – React](https://ja.reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)
