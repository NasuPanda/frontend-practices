***
トラハック
***

# 講座構成

1. React基礎
2. JSX記法
3. `create-react-app`による環境構築
4. propsでデータを受け渡す
5. `import`と`export`の使い方
6. コンポーネントの状態管理
   1. useStateの基本
   2. useStateによるデータ操作
7. ライフサイクル
   1. useEffect
   2. 典型的なユースケース

# 1.React基礎

## Reactとは

- Facebookが開発したUIライブラリ。現在はOSS化されている。
- UIを作るためのコンポーネントという概念が特徴的。
  - コンポーネント = 外見 + 機能
- コンポーネントを組み合わせて画面を作っていく。

## Reactを使わない場合

DOM(Document Object Model)はHTMLにアクセスするための窓口。
DOMを直接変更してHTMLを再描画するのはコストが高い。

## 仮想DOMという解決策

仮想DOMとは、ブラウザのDOMツリーをJSのオブジェクトとして扱うこと。

これにより、効率の良い再描画(レンダリング)が可能。
また、DOMの状態(=Reactのステート)をJSで管理することができる。

仮想DOMは、差分のみ描画→DOMへ反映というスタイル。

# 2.JSX記法

## JSXとは

- JavaScripの拡張言語。
- HTMLライクな記述 + JavaScriptの構文が使える。
- JSXは最終的にReact要素を生成する。

## なぜJSXを使うのか

以下2つの構文は等価。
JSXを使う方が、直感的・HTMLライクに書ける。

```jsx
// 非JSX
React.createElement(
  "button",
  {className: "btn-blue"},
  "Click me!"
)

// JSX
<button className={ "btn-blue" }>
  Click me!
</button>
```

## JSXは何をしているのか

### コンパイル時

1. JSX → `React.createElement`の式に変換
2. React要素を生成

## 基礎文法

- Reactライブラリを`import`する。
  - バージョン17~ は不要。
- `return`の中がJSXの構文。
  - `class` ではなく `className` にする。 `class` だとJSのクラスと見分けがつかないため。

- キャメルケースで記述する。
- `{}`内で変数を扱える。
- 閉じタグが必要。

```jsx
import React from 'react';

const Thumbnail = () => {
  const caption = "画像のキャプション"
  const imagePath = "/img.png"

  return (
    <div className={ "example-image" }>
     <p>{caption}</p>
     <img src={imagePath}></img>
    </div>
  )
}

export default Thumbnail
```

## JSXの階層構造

JSXは必ず階層構造にする必要がある。つまり、最上位コンポーネントを並列には出来ない。

並列構造にしたい場合、`React.Fragment`で囲む。

- HTMLタグとして出力されない、特殊なタグ。
- 省略形で書ける。

```jsx
// Error
return (
  <p>Content 1</p>
  <p>Content 2</p>
)

// OK
return (
  <React.Fragment>
    <p>Content 1</p>
    <p>Content 2</p>
  </React.Fragment>
)

// OK (React.Fragmentの省略形)
return (
  <>
    <p>Content 1</p>
    <p>Content 2</p>
  </>
)
```

# 3.環境構築

## `create-react-app`

サクッとReactの開発環境を構築できるコマンド。

本来のReactは以下の設定が必要。

- トランスパイラーのBabel
- バンドラーのWebpack

### 要件

既にnodenvを導入済だったので講座の環境構築は無視して進めた。

- node 10.16以上
- npm 5.6以上

### `npx`

ネットワーク上に存在するnpmコマンドを実行する。

## ディレクトリ構成

### `src`

開発用ファイルが格納される。
ReactコンポーネントのJSXファイルなどはここに置く。

### `public`

静的ファイル。
htmlや画像ファイル。

### `build`

`npm run build` で生成される本番用のファイル。

## スクリプト

使い方などはだいたい`README.md`に書いてある。

`package.json` を見に行くと以下のような感じ。
react-scriptsにまとめられている。

```json
  // 省略...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

### `npm start`

- ローカルサーバの起動。
- ホットリロード(ファイルに変更を加えたとき自動更新される)に対応。

### `npm run build`

- `build` フォルダ配下に本番用ファイルを出力する。
- `src` と `public` に含まれるファイルを1つにまとめる。(バンドル)
- See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

- Babel, webpackの設定を変えたいときに使う。
- create-react-app コマンドで作られた環境は react-scripts でまとめられているが、それを解放し、必要なモジュールを一つ一つ手でインストールしたのと同じ状態にする。
- **Note: this is a one-way operation. Once you `eject`, you can't go back!**

# 4.コンポーネントとprops

## コンポーネントとは

- **見た目**と**機能**を持つUI部品
- コンポーネントの組み合わせによりWebページを構成
- 大きく2種類
  - Class Component クラスコンポーネント
  - Functional Component : 関数コンポーネント

### Class vs Functional

関数コンポーネントの方が記述量が少なく書ける。

昔はクラスコンポーネントでしか出来ないことがあったため、クラスコンポーネントが主流だった。
しかし、React hooksの登場により、classでしか出来ない主要機能を使えるようになったため現在は関数コンポーネントの方がよく使われる。

### Why component used?

要するにモジュール化・疎結合。

- 再利用♲
- コードの見通しを良くする👀
  - 1コンポーネント = 1ファイル
- 変更に強くするため🔧

## コンポーネントの基本的な使い方

- ファイル名はキャメルケース
- 子コンポーネントで `export` して使えるように
- 親コンポーネントで `import` して利用する

```jsx
// App.jsx(親)
import Article from "./components/Article.jsx"

function App() {
  return (
    <div>
      <Article />
    </div>
  );
}
export default App;

// components/Article.jsx(子)
const Article = () => {
  return <h2>Section1</h2>
};

export default Article
```

### 再利用

- 同じコンポーネントを何回も呼び出せる
- 配列データを `map` で処理するのが一般的

## propsでデータの受け渡し

- props = Properties の意
- 子コンポーネントの引数に `props` を指定する
- 親から子にデータを渡す

```jsx
// App.jsx(親)
import Article from "./components/Article.jsx"

function App() {
  return (
    <div>
      <Article
        title={"this is a title"}
        content={"contents"}
      />
    </div>
  );
}
export default App;

// components/Article.jsx(子)
const Article = (props) => {
  return <div>
    <h2>{props.title}</h2>
    <p>{props.content}</p>
  </div>
};

export default Article
```

### 渡せるデータ

- データは `{}` 内に記述する
- 文字列、数値、真偽値、配列、オブジェクトなど何でもOK
- 変数を渡せる
- 文字列は `{}` 不要

# 5.モジュール機能 import/export

## コンポーネントを分けよう!

- 1ファイル = 1コンポーネントにすべし
- なぜ分けるのか?
  - 責務を明確にする(なんのためのパーツ?)
  - 大規模アプリでも管理しやすくするため
  - 再利用するため

## JSのモジュール機能

- プロジェクトをモジュール単位に分割する
- 原則1ファイル = 1モジュール
- 必要なときに読み込んで使う(=import)

## default import/export (名前無しexport)

### default export

- defaultという名前のモジュールとしてexportする
- 推奨されるexport手法
- 1ファイル = 1export
- 二通りのパターンがある
  - 1度宣言した関数を default export
  - 名前付き関数宣言と同時に default export

```jsx
// 宣言した関数をexport
const Title = (props) => {
  return
};
export default Title;

// 名前付き関数宣言と同時にexport
export default function Title(props) {
  return
}
```

### default import

- 1ファイル = 1import

```jsx
import モジュール名 from 'ファイルパス'
```

## 名前付きimport/export

### 名前付きexport

- 1ファイルから複数のモジュールをexportしたいときに使う
  - ヘルパーモジュールなど
- エントリーポイントでよく使う

```jsx
// helper.js
export const addTax = (price) => {
  return
}
export const getWild = () => {
  return
}

// index.js
export {default as Article} from './Article'
export {default as Content} from './Content'
```

### 名前付きimport

- 1ファイルから複数モジュールを読み込む
- エントリーポイントから複数コンポーネントを読み込む

```jsx
import {Content, Title} from './index';
```

## エントリーポイント

エントリーポイントを使うと、importするコンポーネントが増えてきても記述量が少なくて済む。
慣例的に`index.js`という名前のファイルを使う。

1. `components/`配下に `index.js` を配置
2. `components/`配下の子コンポーネントを default export しておく
3. `index.js`から名前付きexportする
   1. モジュールから `default` モジュールを読み込む
   2. `as` で別名を付けてexportする
4. 親コンポーネントで名前付きimportする

```js
// 子コンポーネントでdefault export
export default function Title(props) {
  return
}


// index.jsで名前付きexport
export {default as Article} from './Article'
export {default as Content} from './Content'


// 親コンポーネントで名前付きimport
import {Content, Title} from "./index"

const Article = (props) => {
  return(
    <div>
      <Title title={props.title} />
      <Content content={props.content} />
    </div>
  )
}
```
