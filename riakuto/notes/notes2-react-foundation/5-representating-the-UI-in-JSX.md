# 5. JSXでUIを表現する

***

# 5-1. なぜReactはJSXを使うのか

## JSXの本質を理解する

JSXとは、RailsにおけるERBのようなテンプレート言語・・・ではない。

JSXと言う名前は、「JavaScript」と「XML」の組み合わせで出来てる。JSXはXMLライクな記述ができるようにしたECMAScript2015に対する構文拡張。
Babel や tsc によりコンパイルされることを前提としたシンタックスシュガー。

例えば、以下のような形で変換される。

```jsx
// JSX
<button type="submit" autoFocus>
  Click Here
</button>
```

```js
// JS
React.createElement(
  'button',
  { type: 'submit', autoFocus: true },
  'Click Here'
);
```

JSXがやっているのは、 `React.createElement` というメソッドのコールへの変換を前提として、XMLタグとその組み合わせによるノードツリーをJavaScriptの中でシームレスに書けるようにすること。
`React.createElement` は、 TypeScriptでは `ReactElement` というインターフェースを下敷きにしたオブジェクトになる。
つまりJSXの構文は、本質的には `ReactElement` オブジェクトを表現するためのJavaScriptの拡張リテラル。

→ JSXはJavaScriptにおいては単なるオブジェクトを表現する式に還元されるものであって、特別な存在ではない。

### 構文拡張とは

言語標準には含まれない特殊用途のための便利な構文を、後づけで使えるようにしたもの。

## フレームワーク・ライブラリの人気度を比較したい時

色々やり方はあるが、DL数を見るのが最も確実。
「Googleトレンドに載っていた」というのは参考にならない。

何故なら、無駄に複雑・決まりごとが多いが故に検索数が増えているだけであることも多いため。

## なぜReactは見た目とロジックを混在させるのか

### コンポーネント: 機能単位にパーツを分割する

Reactでは、関心の分離の単位が**アプリケーションの機能**になっている。
独立した機能単位のパーツとして分割するためには、パーツの中に見た目とロジックを閉じ込める必要がある。

### MVCパターン

RORに代表されるサーバーサイドのフレームワークは、そのほとんどがMVCアーキテクチャを採用している。
(= 見た目とロジックを分離させている)

ソフトウェア工学において、アーキテクチャやデザインパターンは **関心の分離** を行うためにある。
MVCでは **技術の役割** の関心を分離している。

**技術のによって関心を分離する** というのは1時代を築いた考え方ではあるが、普遍的な真理ではない。
特にフロントエンド開発では、MVCパターンは上手く機能しないと言う見方が主流になっている。

### テンプレート形式 vs JSX

テンプレート形式は初見はとっつきやすく見えるが、複雑なアプリケーションを構成しようとすると「呪い」のせいでDXが低下していく。

- フレームワーク独自の制御構文や各種バインディングなどの暗黙の文脈といったものを大量に用意せざるを得なくなる。
  - 複雑なアプリケーションを開発しようと思うと決まりごとが次から次へと出てきて、それを覚える必要に迫られる。
- コンポーネントをテンプレート / ロジックで分けて書いてしまうと、コンポーネントが肥大化したときに分割しにくく、リファクタリングの障害になる。
- フレームワークによるコンパイルを挟むため、エラーがわかりにくくなる。
- 型推論が難しい。

## なぜReactはViewをタグツリーで表現するのか

JSXが表記にタグを用いるのはテンプレート形式を模倣してHTMLを直接書くためというより、単にXMLの記法がUIを表現するのに適しているからというニュアンスの方が強い。
アプリケーションを構成するコンポーネントを表現するには各種の属性値を持ったオブジェクトのノードツリーを用いるのが最適で、それをコードで視覚的に表現するのに最も優れているのが囲みタグ形式だったというだけ。

JSXは、XML全般を表現するためのもの。
Reactがオープンソースとして公開された直後に投稿された公式ブログの記事 [Why did we build React?](https://reactjs.org/blog/2013/06/05/why-react.html) を読むと、「HTML is just the beginning」というくだりがある。
それを読むと、Reactは当初からレンダラーを本体から分離する設計になっていて、レンダラーを入れ替えることで様々なプラットフォームのアプリケーションやドキュメントを表現出来るようにしようとしていた事がわかる。

現在、React用のレンダラーの中で活発に開発されているものを以下に示す。

- React DOM  ...... HTML DOM(公式標準パッケージ)
- react-test-renderer ......JavaScriptオブジェクト(公式標準パッケージ)
- ReactART ......HTML5CanvasやSVGなどのベクターグラフィック(公式標準パッケージ)
- React Native  ...... iOS および Android のネイティブアプリケーション
- React Native for Windows + macOS  ...... Windows および macOS のネイティブアプリケ ーション
- React 360  ...... ブラウザ上で動く VR アプリケーション
- React-pdf ......PDFドキュメント
- react-three-fiber ......WebGLによる3Dグラフィック

これらは別バージョンのReactというわけではなく、コア部分は共通、その仮想DOMを view に反映させるレンダラーのバリエーションということ。

つまり React とはWebに留まらず、アプリケーションやドキュメントを包括的に抽象化するもの。それを各プラットフォームに合わせて具現化するためのものがレンダラー。
そしてこれらレンダラーの共通記述言語がJSX。

Webフロントエンド開発で主に使うのは HTML DOMのレンダラーであるReact DOM。
1行目がReactコア本体を、2行目がReact DOMレンダラーをインポートしている。

```tsx:src/index.tsx
import React from 'react';
import ReactDom from 'react-dom';
// ...
ReactDOM.render(<App />, document.getElementById('root'));
```

# 5-2. JSXの書き方

## JSXの基本的な文法

### 不要な `import React from 'react'`

`import React from 'react'` は実は不要。

```tsx
// これ
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
```

1つ実験をしてみる。

`tsconfig.json` を以下のように変更。

```json
{
  "compilerOptions": {
    // ...
    + "jsx": "react"
    - "jsx": "react-jsx"
  },
}
```

この状態で `src/App.tsx` の `import React ...` を消すと、JSXの記述部分でエラーが出る。
これは、JSXはあくまで `React.CreateElement` のシンタックスシュガーであり、実際には `React` モジュールが使われているため。

ただし、 TypeScript4.1以降は新しいJSX変換形式に対応していて、 `tsconfig.json` の `jsx` が `react-jsx` になっているとそれが有効になる。
その場合はインポート文込みで変換されるので、 `import React from 'react'` が省略出来る。

つまり、CRAで作成されたプロジェクトの `import React from 'react'` は全て省略可能。

### JSXの性質

JSXは最終的に `ReactElement` オブジェクトの生成式になる。
式であるがゆえに、変数に代入したり、オブジェクトのプロパティ値にしたり、関数の引数・戻り値にすることが出来る。

テンプレート形式では文による制御が多用されるが、JSXでは値を返す式でなければならない。
関数型プログラミングの風味が強い。

### `{}` による式の埋め込み

JSXの中に別の式を埋め込む事もできる。 `{}` を使う。
JavaScript・TypeScriptのコードをそのまま書ける・・・わけではなく、書けるのは式。つまり値を返す表現のみ。

```tsx
const name = 'Patty';
const greet = (name: string) => <p>Hello, {name || 'Guest'}</p>;

return <div>{greet(name)}</div>;
```

### `if-else` 文

`null` `undefined` `true` `false` は `{}` の中では何も出力されない。

```tsx
// 全部 ``
<div />
<div></div>
<div>{undefined}</div>
<div>{null}</div>
<div>{true}</div>
<div>{false}</div>
```

それを利用して、任意の条件によりレンダリングするものを分ける事ができる。
`n > threshold` の箇所が `if` の代用。 `&&` 演算子によるショートサーキット評価を使っている。
`n % 2 == 0` の箇所が `if-else` の代用。 三項演算子を使う。

```tsx
const n = Math.floor(Math.random() * 10);
const threshold = 5;

return(
  <div>
    {n > threshold && <p>`n`` is lather than {threshold}</p>}
    <p>`n` is {n % 2 == 0 ? 'even' : 'odd'}</p>
  </div>
)
```

### 繰り返し処理

JSXでは文は書けず、常に値を返す式でなければならない。
例えば繰り返し処理は以下のようになる。

```tsx
const list = [1, 2, 3];

return (
  <ul>
    {list.map((name) => (
      <li>Number: {name}</li>
    ))}
  </ul>
)
```

### コメント

```tsx
<div>
  {
    3 > 1 && 'foo' // インラインコメント
  }
  {
    // インラインコメント
    /*
      複数行に渡る
      長いコメント
    */
  }
</div>
```

### トップレベル要素の成約

複数の要素が含まれる時、トップレベルは1つの要素でなければいけない。

下のコードはコンパイルエラーになる。

```tsx
const elements = {
  <div>foo</div>
  <div>bar</div>
  <div>baz</div>
}
```

解決方法はこれをさらに `div` で囲むこと。

```tsx
const elements = {
  <div>
    <div>foo</div>
    <div>bar</div>
    <div>baz</div>
  </div>
}
```

ただし、上の方法だと無意味なノード階層ができてしまう。
そこで **フラグメント** を使うことで、不要なノードを追加せず複数要素をまとめて扱える。

`<React.Fragment>` というコンポーネントだが、省略記法で空タグが使える。

```tsx
const elements = {
  <>
    <div>foo</div>
    <div>bar</div>
    <div>baz</div>
  </>
}
```

## JSXとコンポーネントの関係

JSXの構文は `React.createElement` のメソッドコールに変換され、最終的に `ReactElement` オブジェクトを生成する。
`ReactElement` オブジェクトはそのコンポーネント関数を特定の引数でコールするための実行リンクのようなものだと言える。

```tsx
<MyComponent foo="bar">baz</MyComponent>

↓

React.createElement(MyComponent, { foo: 'bar' }, 'baz');

↓

{
type: 'MyComponent',
props: { foo: 'bar', children: 'baz' }, key: null,
ref: null,
}
```

### `props`

`props` とは、 `Properties` の略。
コンポーネントを関数として考えた時、その引数に相当するもの。

```tsx
import React from 'react';

type Props = { name: string; times?: number };

const Greets: React.FunctionComponent<Props> = (props) => {
  const { name, times = 1, children } = props;
  return (
    <>
      {[...Array(times)].map((_) => (
        <p>Hello, {name}! {children}</p>
      ))}
    </>
  );
};
```

上のサンプルでは、 `Greets` を関数コンポーネントとして定義するため、 `React.FunctionComponent` インターフェースを適用している。
このジェネリクスとなっている `P` が `props` の型となる。ここでは `Props` という型エイリアスで定義している。

- `name` と `times` が `Greets` に props として渡される
- `times` にデフォルト値 `1` が設定されている
- `children` は `React.createElement` の第3引数に相当するもの

`React.createElement` の第3引数は子要素。
呼ばれた側のコンポーネントでは暗黙の `props` として渡されるようになっている。

※ 通常のHTMLタグの子要素 = <p>子要素</p>

なおJSX構文における属性値としての props は、通常は `times={4}` のように `{}` による式埋め込みで値を渡す。
ただ、値が文字列の場合は `name="patty"` のようにクォーテーションで囲む形式により渡すことも出来る。

### 注意が必要な挙動

- HTMLエスケープされた文字列を `props` として渡すと受け取ったコンポーネント側で元の文字列に復元される。
- JSXで**子要素として文字列を記述するとき**、行の先頭と末尾の空白文字が削除され、空白行も削除される。
- Boolean値で `true` の場合、値を省略出来る。

```tsx
// true の省略
<MyButton color="blue" disable={true} />
<MyButton color="blue" disable />
```

