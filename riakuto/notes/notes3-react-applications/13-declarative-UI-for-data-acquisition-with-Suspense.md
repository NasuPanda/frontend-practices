# 第13章 Suspense でデータ取得の宣言的 UI を実現する

# 13-1. Suspense とは何か

## Effect Hook で副作用を扱う難しさ

Effect Hookはそれ以前の方法と比べればかなり敷居が下がっているとはいえ、それでもまだ問題がある。

1つは無限ループに陥りやすいこと。
React はコンポーネントの state を書き換えると再レンダリングが発生するので、 `useEffect` の中で state を更新しつつ依存配列の設定を間違えると、すぐに無限ループが発生してしまう。

もう1つの問題は `useEffect` が全く宣言的ではないということ。
この点については、実験的に提供されている React の新しい機能により対応出来る。

## Suspense for Code Splitting

### バンドラによるコード分割

CRA で作成された React アプリは、デフォルトではビルド時に Webpack によってファイルがまとめられる。

※ この作業を「バンドル」、バンドルを実行するツールを「モジュールバンドラ」「バンドラ」と呼ぶ

このバンドルは、アプリが大規模になるとバンドル後のファイルサイズもそれに比例して肥大化してしまう傾向にある。
そうなると初回アクセスのアプリ起動に時間がかかってしまう。

それを防ぐため、**コード分割(code splitting)** という仕組みが最近のバンドラには存在する。
これは、バンドルファイルを適切な単位で分割、必要になった時点で動的にロードされるようにするもの。
HTTP/2 であれば複数ファイルのロードを並列で行う事ができるので、正しく活用すればパフォーマンス向上が期待できる。

この分割は、動的なインポート構文を用いることで、 webpack がそれを検出して行う。
その設定は CRA がよしなにやってくれる。

従来のような `import` ではなく、 `import` キーワードを関数として使えばコード分割が行われる。

```js
import("./math).then(({ add }) => {
  console.log(add(2, 5));
});
```

### 遅延コンポーネント

React16.6 から導入された機能。

これを使えば、動的インポートしたコンポーネントファイルを通常のコンポーネントとしてレンダリング出来る。

```js
import React from 'react';

const Foo = React.lazy(() => import('./Foo'));
```

こう書くことでビルド時にファイルが分割され、 `Foo` コンポーネントが初めてレンダリングされる時、それが含まれるバンドルファイルが自動でロードされるようになる。
なお、 `lazy` メソッドの引数は デフォルトエクスポートで React Elements を Promise で返す関数でなければいけない。

さらに、 `lazy` を使って読み込んだ遅延コンポーネントをレンダリングするのに、また別の待ち受けのための構文が必要になる。それが `Suspense` 。

```jsx
import { lazy, Suspense } from "react";

const Foo = lazy(() => import("./Foo"));

const App = () => (
  <>
    <h1>Awesome</h1>
    <Suspense fallback={<div>loading...</div>}>
      <Foo />
    </Suspense>
  </>
)
```

この `Suspense` は「サスペンスドラマ」などの「サスペンス」と同様。
*suspense* というのはもともと「何かが宙ぶらりんになって、あっちこっちに行ったりする、不安定でどっちつかずの状態」という意味。
それが転じて不安や緊張といった心理状態が続く作品のジャンルを示すようになった。(へーーー)

つまりここでは、「読み込まれているかどうかはっきりしない状態のコンポーネント」という意味になる。

*fallback* は「予備の、代替の」といった意味。
「本命が読み込まれるまでこのコンポーネントを表示していろ」という props になる。

動作 : https://codesandbox.io/s/suspense-import-bqb5t?file=/src/App.js

これが Suspense for code splitting と呼ばれるもの。

### `lazy` の実体 : Error Boundary

React のコードを読んでみると、 `lazy` はモジュールを非同期でインポートして、その Promise が解決したらそのインポートした中身を return するようになっているが、解決するまではその Promise そのものを throw している。

JavaScriptは、言語仕様として例外だけでなく文字列やオブジェクトなど何でも throw 出来るようになっている。

ライフサイクルメソッドには子孫コンポーネントの例外をキャッチしてくれる `getDerivedStateFromError` や `componentDidCatch` がある。
これらのメソッドを用いて子孫コンポーネントで throw された例外をキャッチ出来るようにしておき、例外発生時は通常のコンポーネントツリーの代わりに fallback のUI を表示してくれるようなコンポーネントのことを **Error Boundary** という。

Suspenseはこれと似ていて、「子孫コンポーネントで throw された Promise を補足、その Promise が解決するまでは fallback のコンポーネントをレンダリングし、解決したら改めて子孫コンポーネントを正常にレンダリングし直す」という動きをする。
いわば「Promise Boundary」。

「Algebraic Effects」という OCaml 等に実装されている「継続が取れる例外」を実現する機能からインスピレーションを得たらしい。

## Suspense を非同期的なデータ取得に使う : Suspense for Data Fetching

外部 API への通信の非同期処理を普通に書き、その Promise を throw する。
そして Promise が解決したらそのデータを中に埋め込んだコンポーネントを返す。
これを Suspense で待ち受けるようにすれば、データ取得が終わるまでは fallback を表示し、データ取得が完了した時点で中身が表示されるという UI が作れる。

```tsx
import React, { Suspense } from 'react';
import './styles.css';
let membersCache = null;

const membersResource = (orgCode) => {
  if (membersCache) return membersCache;

  const promise = fetch(`https://api.github.com/orgs/${orgCode}/members`)
    .then((response) => response.json())
    .then((members) => {
      membersCache = members;
    });

  throw promise;
};

const MemberList = ({ orgCode }) => {
  const members = membersResource(orgCode);

  return (
  <ul>
    {
      members.map(member => (
        <li key={member.id}>{member.login}</li>
      ))
    }
  </ul>
  );
};

constApp=()=>(
  <Suspense fallback={<div>Loading...</div>}>
    <MemberList orgCode="facebook" />
  </Suspense>
);

export default App;

// SEE: https://codesandbox.io/s/suspense-members-lucy4
```

`memberResource` は データ取得が完了するまでは `promise` を throw し、取得後はそのデータを返してくれる関数。
`memberResource` の返り値を `MemberList` コンポーネントの中で普通に使っているが、 `<Suspense>` でラップすることで上手く遅延を解決してくれる。

このコードの前半だけ隠して `MemberList` と `App` だけ見てみれば、非同期処理が宣言的に書けていると言え無くもない。
Promise を throw する部分、 `membersCache` というグローバル変数を使っている点が主な問題なので、そこを隠蔽出来れば良さそう。

