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

# 6.コンポーネントの状態管理

## Hooksとは

- クラスコンポーネントでしか使えなかったが、Hooksにより関数コンポーネントでも使えるようになった機能
  - コンポーネント内で状態を管理する**state**
  - コンポーネントの時間の流れに基づく**ライフサイクル**
- Hooks = クラスコンポーネントの機能に接続するI/F

## なぜステートが必要なのか

インタラクティブなサイトを作るためには、ユーザの操作によりアプリケーションの状態を変更できる必要がある。
そのためにステートが必要。

ReactHooksでは、基本となるフックスである `useState` を使ってステートを管理する。

### Reactコンポーネント内の値を書き換えたい

例: YouTubeの再生ボタン

Reactでは、DOMを直接書き換えるのではなく仮想DOMにより新しい値を使った再描画を行う。

- ✗ : コンポーネント内の要素をDOMで直接書き換える
- ○ : 新しい値を使って再描画する

### Reactコンポーネントが再描画するきっかけは？

- stateの変更
- propsの変更

## `useState`

```jsx
// useStateによりstateの宣言

const [state, setState] = useState(initialState)
// state : 現在の状態
// setState : 更新関数(現在の値を更新するための関数)
// initialState : 初期値


// state更新
setState(newState)


// 例
const [message, setMessage] = useState('Hello world')
const [likes, setLikes] = useState(0)
const [isPublished, setIsPublished] = useState(False)
```

### 具体例

ボタンが押されると記事が公開( `published` が　`true` に )される。

```jsx
import { useState } from "react";

const Article = (props) => {
  const [isPublished, setIsPublished] = useState(false)

  return (
  <div>
    <h2>{props.title}</h2>
    <p>{props.content}</p>
    {/* onClickにcallbackを登録 */}
    <button onClick={() => setIsPublished(true)}>公開</button>
  </div>
  )
};

export default Article
```

## props vs state

両者とも再描画のきっかけになるが、以下のような違いがある。

- propsは必ず**親コンポーネントから渡される**
- stateは**コンポーネント内部で宣言、制御される値**

## stateをpropsに渡す

NOTE: 基本的にはこの手法を取ることが多い。

- 更新関数はそのままpropsとして渡さず、関数化する
  - 下の例では `props.onClick` に渡している
- 関数をpropsに渡すときは注意する

```jsx
// components/Article.jsx
const Article = (props) => {
  const [isPublished, setIsPublished] = useState(false)
  const PublishArticle = () => {
    setIsPublished(true)
  }

  return (
    <div>
      <Title title={props.title}/>
      <Content content={props.title}/>
      <PublishButton isPublished={isPublished} onClick={PublishArticle} />
    </div>
  );
};

// components/PublishButton.jsx
const PublishButton = (props) => {
  return(
    <button onClick={() => props.onClick()}>
      公開状態: {props.isPublished.toString()}
    </button>
  )
}
```

### propsへ関数を渡す際の注意点

あくまでもコールバックの登録なので、 `()` を付けて実行しないように注意する。

```jsx
// OK
<PublishButton isPublished={isPublished} onClick={PublishArticle} />
<PublishButton isPublished={isPublished} onClick={() => PublishArticle()} />

// NG
<PublishButton isPublished={isPublished} onClick={PublishArticle()} />
```

# 7. `useState` の頻出ユースケース

## 引数を使って更新する

入力フォームでよく使う。

```jsx
import React, {useState} from 'react';

const TextInput = () => {
  const [name, setName] = useState('')

  const handleName = (event) => {
    setName(event.target.value)
  }

  return (
    <input
      onChange={(event) => handleName(event)}
      type={'text'}
      value={name}
    />
  )
}
```

- `onChange`イベントに `handleName` 関数を渡している
- `handleName`関数の引数 `event` を更新関数に渡している

## `prevState`の活用

prevStateは `useState` の更新関数内で使える特殊な値。カウンターでよく使う。

- `prevState` は更新前のstate
- `prevState` に変更を加えて `return` する
- React公式の書き方はあまりよろしくないので注意

```jsx
import React, {useState} from 'react';

const Counter = () => {
  const [count, setCount] = useState(0)
  // prevStateによりカウンターを実現
  const countUp = () => {
    setCount(prevState => prevState + 1)
  }
  const countDown = () => {
    setCount(prevState => prevState - 1)
  }

  return (
    <div>
      <p>カウント数: {count}</p>
      <button onClick={countUp}>up</button>
      <button onClick={countDown}>down</button>
    </div>
  )
}

export default Counter
```

### 注意点

カウンターの実装の際、stateを直接操作しないように注意する。

```jsx
const Counter = () => {
  const [count, setCount] = useState(0)

  const countUp = () => {
    setCount(count + 1)
  }
  const countDown = () => {
    setCount(count - 1)
  }
  // ...
}
```

↑のように書くと、処理が非同期のため、重い処理を挟む場合や、短時間で複数回操作が行われたときなどに、値がうまく反映されないことがある。
prevStateを使えば以前の値を参照するため、そのような問題が発生しない。

## ON/OFF切り替え

`!` 演算子で真偽値を反転するだけ。
三項演算子を使うと記述量を少なくできる。

```jsx
import React, {useState} from 'react';

const ToggleButton = () => {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen(prevState => !prevState)
  }

  return (
    <button onClick={toggle}>
      {open ? 'open' : 'close'}
    </button>
  );
};

export default ToggleButton;
```

# 8.ライフサイクル useEffect

[React hooksを基礎から理解する (useEffect編) - Qiita](https://qiita.com/seira/items/e62890f11e91f6b9653f)

## ライフサイクルとは

useEffect()では、副作用関数がクリーンアップ関数を返すことで、マウント時に実行した処理をアンマウント時に解除する。
またその副作用関数は、毎回のレンダリング時に実行され、新しい副作用関数を実行する前に、ひとつ前の副作用処理をクリーンアップする。
このようにマウント処理とアンマウント処理の繰り返し処理のことを「ライフサイクル」と言う。

- **コンポーネントが生まれてから破棄されるまでの時間の流れ**。ライフサイクルメソッドを使うと、時点に応じた処理を実行できる。
- Hooksにおいては `useEffect` でライフサイクルを表現する。


クラスコンポーネントにおいては、以下の3メソッドが頻出だった。

- `componentDidMount()`
- `componentDidUpdate()`
- `componentWillUnmount()`

## 3種類のライフサイクル

### Mounting
コンポーネントが配置される(生まれる)期間

1. 初期化
2. レンダリング
3. マウント後の処理

### Updating
コンポーネントが変更される(成長する)期間

1. レンダリング
2. 更新後の処理

### Unmounting
コンポーネントが破棄される(死ぬ)期間

1. アンマウント前の処理

## 副作用(effect)フックを使う

- 関数コンポーネントでは `useEffect` という副作用フックを使う
- 副作用 = **レンダリングにより引き起こされる処理**

```jsx
const Counter = () => {
  const [count, setCount] = useState(0)
  const countUp = () => {
    setCount(prevState => prevState + 1)
  }
  const countDown = () => {
    setCount(prevState => prevState - 1)
  }

  // useEffect
  useEffect(() => {
    console.log("current count is": count)
  })

  return (
    <div>
      <p>カウント数: {count}</p>
      <button onClick={countUp}>up</button>
      <button onClick={countDown}>down</button>
    </div>
  )
}
```

## 第2引数の依存関係を理解する

- 第2引数を省略すると、コンポーネントがレンダリングされる度に副作用関数が実行されることから、省略するケースは殆どない。
- `useEffect` の第二引数には配列を渡すことができる
- 第2引数は deps(dependencies) と呼ばれ、副作用が実行されるかどうかの依存関係を指定できる

- `[]` を渡した場合
  - 初回レンダリング時のみ実行される
- `trigger` 変数(ステート)を渡した場合
  - 変数(ステート)が変更される度に実行
- `trigger1` `trigger2` 変数(ステート)を渡した場合
  - どちらかの変数が変更される度に実行

## クリーンアップを理解する

- 例: コンポーネント内で外部DBを購読したい場合
  - `useEffect` 内で購読処理を呼び出す
  - クリーンアップ関数で購読解除する
- 例: コンポーネントでイベント待ちする場合
  - `useEffect` 内でイベントリスナーを登録
  - クリーンアップ関数でイベントリスナーを解除
- 必要なくなったらクリーンアップ関数を使って掃除する
  - `useEffect` から返される関数
  - **2度目以降のレンダリング時**に呼び出され、前回の副作用を消すことができる

```jsx
const ToggleButton = () => {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen(prevState => !prevState)
  }

  useEffect(() => {
    console.log("current state is", open)

    if (open) {
      console.log("subscribe database!")
    }
    return () => {
      console.log("unsubscribe database!")
    }
  })
}

// ページレンダリング時
current state is false  // 初期化
unsubscribe database!   // レンダリング前に呼ばれる
current state is false  // レンダリング時

// open → close
unsubscribe database!   // レンダリング前に呼ばれる
current state is true   // レンダリング時
subscribe database!     // レンダリング時

// close → open
unsubscribe database!   // レンダリング前に呼ばれる
current state is false  // レンダリング時
```

# 9. `useEffect` の頻出ユースケース

## `useEffect` のユースケース

- APIやDBから非同期通信でデータを取得(fetch)する
- 特定の値が変わったらデータを再取得(refetch)する

## fetch API

- fetchAPIは非同期通信で外部APIにアクセスできる
- GETであればURLを指定するだけ
- `res.json()` で取得したデータをオブジェクト型に変換

```js
fetch("https://example.com/index/user1")
  .then(res => res.json())
  .thee(data => {console.log(data)})
  .catch(error => { console.log(error) })
```

## `useEffect` からAPIを叩いてみる

```jsx
function App() {
  const [id, setId] = useState('google')
  const [name, setName] = useState('')

  const ids = ['aws', 'google', 'facebook', 'deatiger', 'gaearon']
  const getRandomId = () => {
    const _id = ids[Math.floor(Math.random * ids.length)]
    setId(_id)
  }

  useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setName(data.name)
      })
      .catch(error => { console.log(error) })
  }, [id])

  return (
    <div>
      <p>{id}, {name}</p>
      <button onClick={getRandomId}>ID変更</button>
    </div>
  );
}
```
