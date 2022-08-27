# 第10章 Reactにおけるルーティング

# 10-1. SPAにおけるルーティングとは

## 通常のルーティング vs SPAにおけるルーティング

通常のMPAであれば、ルーティングとは「リクエストされたURLに対して、それに紐づく適切なコンテンツをアプリケーションサーバがクライアントに返す」こと。

それに対して、SPAのルーティングは、サーバへの初回のリクエストに対して、そのURLに関わらず、アプリケーション全体が記述されたJavaScriptのコードの塊・アセットファイルが返される。
それ以降のアプリケーション内部でのページ遷移は、アプリケーションが動的にDOMを書き換えることで移動しているように見えるだけ。
処理はブラウザ内で完結する。アドレスバーのURLが書き換わることがあっても、サーバへリクエストが飛ぶことは原則無い。

SPAにおけるルーティングを再定義しておくと、「DOMの動的な書き換えによってページ遷移を擬似的に実現するとともに、ブラウザのセッション履歴をそれに同期させること」

### 開発における注意点

サーバへリクエストが行かないということは、サーバ側からはクライアントがどのページを見ているか、ページをどう移動したかが分からないということ。

これは、Google Analytics などを使ったアクセス解析を行う上でネックになる。
このソリューションとしては、ルーティングが実行されたURLが書き換わる際に Effect Hook で Google Analytics にリクエストを発行する処理を差し込むといった方法がある。

サーバがHTTPステータスコードを返せない点にも注意が必要。

また、ルーティングの適用単位がコンポーネントだということも前提知識として知っておく必要がある。
Rails だと 一つのURLに対応するのは Controller でそれが view を経由してページ全体を描写するが、 React の場合はルートのコンポーネントから階層を下りていく。

# 10-2. ルーティングライブラリの選定

React向けのルーティングライブラリは、現状は [React Router](https://reactrouter.com/en/main) がデファクトスタンダード。
二番手は Reach Router 。

React Native の世界で最もメジャーなライブラリとして React Navigation もある。

## React Router のバージョンのお話

React Router, Reach Router はどちらも React Training 社のプロダクト。
競合ライブラリを同じ開発元が開発しているという謎な状況。

どちらを使えば良いのかという話だが、2019年5月、CEOの Ryan Florence が Reach Router を React Router に将来的には統合するという表明を出している。
シェアトップも React Router なので、基本的には React Router を使っておけば問題ない。

ただし、使用するバージョンには注意が必要。
React Router は、バージョン5 => 6 にかけてインターフェースを React Router に寄せるための破壊的変更を加えている。

現時点ではバージョン5系で開発されたプロダクトの方が多いので、ひとまず5系についても学んでおくべき。
ただし、今から新しくプロジェクトを始めるとしたら6系を選んでおけば間違いない。

# 10-3. React Router (5系) のAPI

## React Router のインストールと導入

```zsh
yarn add react-router react-router-dom
(typesync)
yarn
```

React Router を導入するには通常、ルーティング機能を提供するプロバイダコンポーネントをトップレベルで設定する。
`src/index.tsx` に次のように記述する。

```tsx
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root');
);
```

`BrowserRouter` というのがそれ。

## ルーティングプロバイダ・コンポーネント

react-router-dom が提供するルーティングプロバイダ・コンポーネントには次の4つがあり、これらは共通してより低レベルの `<Router>` コンポーネントを下敷きにしている。
通常は `<Router>` をそのまま使うのではなく、ユースケースに合わせてこれらを使い分ける。

- `<BrowserRouter>`
- `<HashRouter`>
- `<StaticRouter`>
- `<MemoryRouter`>

`BrowserRouter` は HTML5 の History API を使ってUIとURLを動的に同期してくれるルータコンポーネント。
一般的なSPAの開発ではほぼこれ一択といっていい。

`HashRouter` は URL に `#` がつくルーティング機能を提供するもの。
一時期流行った裏技的な手法で、今これを使う場面はまずない。

`StaticRouter` はサーバサイドレンダリングを導入する際にサーバ側で使う。
これも直近で使うことはまずない。

`MemoryRouter` はブラウザのアドレスバーのURLが一切替わらず、メモリの中だけで履歴が管理されるもの。
React Native と組み合わせてテストの際に用いられたりするらしいが、ほぼ使うことはない。

これらルーティングプロバイダコンポーネントが具体的に何をやってくれるかというと、下位層の子孫コンポーネントの中で後に説明するような `<Link>` や `<Redirect>` といった機能タグを使えるようにしてくれたり、 `match` や `location` `history` といったオブジェクトへアクセス出来るようにしてくれたりする。

## React Router のコンポーネントAPI

### `Route` コンポーネント

ルーティングルールを設定する `Route` コンポーネントについて。

```tsx
import { VFC } from 'react'
import { Route } from 'react-router';
import Home from 'components/pages/Home';
import About from 'components/pages/About';
import Contact from 'components/pages/Contact';

constApp:VFC=()=>(
  <>
    <p>弊社のホームページへようこそ!</p>
    <Route exact path="/" component={Home} />
    <Route path="/about">
      <About />
    </Route>
    <Route path="/contact">
      <Contact destAddress="contact@our-company.com" />
    </Route>
</> );

export default App;
```

URLが `path` の値とマッチするとコンポーネントがレンダリングされる。

`component` 属性として渡したり、子要素として渡したり出来る。
また、 `props` で `children{Home /}` のようにも書ける。

**公式ドキュメントのサンプルでは子コンポーネントにしていることが圧倒的に多い**。

それぞれの挙動の違い。

子要素にすると `<Home foo={bar} /> ` のように任意の props を設定できる。

`component` 属性で設定した場合、 props を任意の値に設定できない。代わりに `RouteComponentProps` 型のオブジェクトが渡される。

```tsx
export interface RouteComponentProps<
  Params extends { [K in keyof Params]?: string } = {},
  C extends StaticContext = StaticContext,
  S = H.LocationState
>
{
  history: H.History<S>;
  location: H.Location<S>;
  match: match<Params>; staticContext?: C;
}
```

こういった React Router が提供する `history` オブジェクトや `location` オブジェクトを props として受け取れる。
これらは通常Hooks APIでも取得出来るようになっているが、直接 props として受け取ればコードの省略になる。

### `path` 属性のマッチング

- 4系と5系ではつねに `/` から始まる絶対パスを使うこと。
- マッチングの条件はデフォルトでは前方一致だが、次のboolean型の props を同時に設定すると挙動が変わる。
  - `exact` : 完全一致
  - `strict` : 末尾のスラッシュ有無のマッチングを厳密に
  - `sensitive` : 大文字小文字まで正確にマッチングさせる

### `Switch` コンポーネント

`path` 属性のマッチングでは、例えば `/` への前方一致の場合、 `/`, `/about`, `/contact` のいずれにもマッチしてしまう。
それでは管理が面倒なので、switch-case文のように使える `<Switch>` コンポーネントが用意されている。

`<Switch>` でくくると、 `<Route>` は `path` が最初にマッチしたところでルーチンを抜けるので挙動を把握しやすくなる。

```tsx
import { VFC } from 'react'
import { Route } from 'react-router';
import Home from 'components/pages/Home';
import User from 'components/pages/User';
import NotFound from 'components/pages/NotFound';

constApp:VFC=()=>(
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/user/:userId">
      <User />
    </Route>
    <Route>
      <NotFound />
    </Route>
</Switch> );
export default App;
```

`<NotFound />` のところは `path` 属性を指定していない。switch-case文のdefault節のようなもの。

`:` から始まる文字列( 例の場合 `/user/:userId` )はURLパラメータといい、ここにマッチした文字列はレンダリングされるコンポーネントで `match` オブジェクトから `userId` の値を抽出できる。

例えば `/user/foo` というパスだったら、 `User` コンポーネントで `match.params.userId` に `foo` が格納されることになる。
パラメータのマッチングには正規表現を適用出来る。`"/user/:userId(foo|bar)"` と書けばこの二択になったり、N桁の数字/英語に限定したり出来る。

### `Redirect` コンポーネント

`<Switch>` 構文の中で `<Route>` と並んでよく使われるのが `<Redirect>` 。
文字通りリダイレクトを実行してくれるコンポーネント。

```tsx
import {Redirect, Route, Switch} from 'react-router';

const App: VFC = () => {
  <Switch>
    <Route exact path="/" component={Home} />
    <Redirect from="/user/profile/:userId" to="user/:userId" />
    <Route  path="user/:userId" component={User} />
    <Redirect push to="/" />
  </Switch>
}
```

`from` でマッチングして `to` のパスにリダイレクトさせる。
URLパラメータも引き継げる。

リダイレクトのデフォルトの挙動は HTML5 の HistoryAPI の `replaceState` が適用されるが、 boolean型の props である `push` を指定すれば `pushState` になる。

例えばどこにもマッチしないパス `/nowhere` にアクセスしたとき、最後の `<Redirect>` に `push` の指定があれば `/nowhere` → `/` とそこにアクセスした履歴が残って『戻る』ボタンを押せば また `/nowhere` に来ることになる。
`push` が指定されてなければ `/nowhere` にアクセスした過去が抹消されて、 `/` で『戻る』ボタンを押せば本来ならもうひとつ前にアクセスしていたページまで戻ることになる。

### `Link` コンポーネント

文字通りリンク機能を提供する `<Link>` コンポーネントについて。
react-router-dom のパッケージからインポートする。

```tsx
import { Link } from 'react-router-dom';

  <ul>
    <li>
      <Link to="/">トップページ</Link>
    </li>
    <li>
      <Link to="{{
        pathname: '/contact',
        search: '?from=here'
        hash: '#subject',
        state: { secretCode: '8yUfa9KECH' },
        }}"> お問い合わせ
      </Link>
    </li>
    <li>
      <Link to="/anywhere" replace>今ここではないどこか</Link>
    </li>
  </ul>
```

Q. `<a>` タグではだめ？
A. だめ。

SPAの場合 `<a>` タグを使ってリンクを書くと、そのリンクを踏んだ時点で React Router の管轄外となり、管理していた履歴が全て消えてしまう。Webサーバにリクエストが飛んでSPAのコード全体がリロードされるため。
そのため、アプリケーション内リンクは全て `Link` で記述すること。

`to` にはパスの文字列または `location` オブジェクトを渡す事ができる。
`location` オブジェクトならパスの他にクエリパラメータやハッシュも設定でき、ユーザに見せたくない情報を埋め込んでリクエスト先に受け渡すことも出来る。
アクセス解析などにも使える。

boolean型の属性である `replace` を指定すれば、クリックした時点でそこにいたページの履歴が消えることになる。

## React Router の Hooks API

React Router の Hooks API を使うと通常のコンポーネントから React Router が提供する `match`, `location`, `history` オブジェクトへアクセスできるようになる。

次の4つがある。

- `useHistory`
- `useLocation`
- `useParams`
- `useRouteMatch`

### `useHistory`

ブラウザ履歴系の機能を使いたい時に使う。

```tsx
import { VFC } from 'react'
import { useHistory } from 'react-router-dom'

const historyButtons: VFC = () => {
  const history = useHistory();

  return (
    <button type="button" onClick={() => history.goBack()}>
      戻る
    </button>
    <button type="button" onClick={() => history.goForward()}>
      進む
    </button>
    <button type="button" onClick={() => history.push("/")}>
      トップページへ
    </button>
  );
};
export default historyButtons;
```

`useHistory` が返すのは HTML5 の History API が提供する生の `History` オブジェクトではなく、 React Router が独自に定義している `history` オブジェクト。

主な要素は以下の通り。

- `length`...... スタックされている履歴の数
- `action`...... 直近に実行されたアクションの種類("PUSH","REPLACE","POP")
- `push(PATH)`...... 引数 PATH で指定したパスに移動するメソッド
- `replace(PATH)`...... 引数 PATH で指定したパスにリダイレクトするメソッド(現在いるページの 履歴は消える)
- `goBack()`...... ひとつ前の履歴のページに戻るメソッド
- `goForward()`...... ひとつ先の履歴のページに進むメソッド
- `go(N)`...... 引数 N で指定した番号の履歴に移動するメソッド

### `useLocation`

Google Analytics が使えない問題に対応する時など。

```tsx
import { VFC } from 'react';
import { Switch, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import Home from 'components/pages/Home';
import User from 'components/pages/User';
import NotFound from 'components/pages/NotFound';


constApp:VFC=()=>{
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location.key]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/user/:userId" component={User} />
      <Route component={NotFound} />
    </Switch>
  );
}
export default usePageViews;
```

`location` オブジェクトにはその時点でのURL情報が格納されている。
例えば `https://exampleapp.com/user/patty?from=user-list#friends` の時は以下のようになる。

```ts
{
  pathname: '/user/patty',
  search: '?from=user-list',
  hash: '#friends',
  state: {
    [secretKey]: '9qWV408Zyr',
  },
  key: '1j3qup',
}
```

`key` は `location` オブジェクトごとに生成されるユニークな文字列。
意味合い的にもふさわしいので、ここでは `useEffect` の依存配列に `key` を渡している。

### `useParams` / `useRouteMatch`

React Router が提供する `match` オブジェクトをハンドリングするためのAPI。

次のサンプルコードは、 `useParams`, `useRouteMatch` がそれぞれどのような値を返すのかを示している。

```tsx
import { VFC } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';

const User: VFC = () => {
  const { userId } = useParams();
  const match = useRouteMatch();

  // for debug
  console.log(userId);
  console.log(match);
}


// Output
// useParams
patty

// useRouteMatch
{
  path: "/user/:userId",
  url: "/user/patty",
  isExact: true,
  params: {
    userId: "patty",
  }
}
```

## 学習リソース

- React Router の公式ドキュメント: [React Router: Declarative Routing for React.js](https://v5.reactrouter.com/web/guides/quick-start)
  - ルーティング初心者には難易度が高い上、ボリュームも多い。ただし目は通しておくべき。
  - ユースケースごとのサンプル(ログイン有無でのルーティングの切り分けなど)が載っている。

# 10-4. React Router をアプリケーションで使う

## Atomic Design

`components/` が presentational components, `containers/` が container components 。

```
├── App.css
├── App.tsx
├── components
│   ├── molecules
│   │   ├── HomeButton.tsx
│   │   ├── Spinner.css
│   │   └── Spinner.tsx
│   ├── organisms
│   │   ├── CharactersList.tsx
│   │   └── SchoolList.tsx
│   ├── pages
│   │   ├── Characters.tsx
│   │   ├── Home.css
│   │   └── Home.tsx
│   └── templates
│       ├── AllCharacters.tsx
│       └── SchoolCharacters.tsx
├── containers
│   ├── molecules
│   │   └── HomeButton.tsx
│   ├── organisms
│   │   └── SchoolList.tsx
│   └── templates
│       ├── AllCharacters.tsx
│       └── SchoolCharacters.tsx
├── data
│   └── characters.ts
├── index.css
├── index.tsx
├── react-app-env.d.ts
├── serviceWorker.ts
└── setupTests.ts
```

**Atomic Design** というUIデザイン手法を採用している。
粒度の小さいものから atoms(原子)、 molecules(分子)、 organisms(有機体)、 templates(テンプレート)、 pages(ページ)という5つのカテゴリーにUIパーツを分けて設計しようというもの。

atoms は これ以上分割出来ないデザインとして最小単位のコンポーネント、具体的には `<Button>` や `<Icon>` 。
最も大きい単位の pages はルーティングの対象となるページ全体を表現するコンポーネントに相当する。

5つカテゴリーがあるので、どれがどれに相当するのか判断するのが難しい。
最小単位の atoms と最大単位の pages 以外は絶対的な基準と言えるものはない。

ただし、 molecules は atoms を組み合わせたもの、 organisms は atoms と molecules を組み合わせたもの、といった具合に自分のカテゴリよりも小さい単位を組み合わせて作られるもの、と考えていけばいい。

## React Helmet によるHTMLドキュメントヘッダの書き換え

SPA では意図して書き換えないと常に `public/index.html` に書かれた `<title>` の中身がどのページでもページタイトルになってしまう。
そこで、 React Helmet というライブラリを使ってどこからでも HTML ドキュメントヘッダを動的に上書きできるようにする。

```tsx
    <Helmet>
      <title>登場人物一覧 | {school}</title>
    </Helmet>
```

## SPAの注意点: スクロール位置

React Router ではルーティング遷移時にスクロール位置が変わらない。

例えばページネーションされたページで「次」「前」といったリンクがあったとする。
一番下までスクロールした状態でリンクを踏むと、ページが変わっているのに一番下へスクロールしたままになってしまう。

これに対処するには、例えば `useEffect` を使ってURLに変更があったときに強制的にトップにスクロールさせるといった手法が考えられる。

```tsx
︙
const App: FC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [hash, pathname]);
︙
```

# 10-5. React Router バージョン 5 から 6 への移行

history が dependencies から外されているので別途インストールが必要。 (りあクト! 第3版の情報なので、変更済の可能性あり)

```zsh
yarn add react-router@6 react-router-dom@6 history
```

## v5 => v6 の変更点

### 仕様以外

- TypeScript製になった
- パッケージ容量が 16.9KB => 7.2KB に
- React 16.8 以降必須

### 主な変更点

主な変更点を示す。

1. `Switch` の廃止と `Routes` の導入。`<Switch>` はマッチした `<Route>` があり次第、それ以降の評価をせず処理を抜ける。`<Routes>` では最後まで評価した上で、ベストマッチする `<Route>` にルーティングされる。
2. v4 で消えた nested routes が復活し、それにより一箇所にルーティングルールを集約して記述できるようになった (※ 従来通り子孫コンポーネントへ分散させて記述することも可能)
3. `<Routes>` 内のすべての `<Route>` および `<Link>` のパスは、相対パスで記述できる (※ 従来通り絶対パスでの記述も可能)

### switch-case的な挙動 => 全ての候補を評価

まず 1 については switch-case 的な挙動ではなく、全ての候補を評価した上でもっともマッチしたものが選択されるようになった。
`<Switch>` の仕様だと並び順によってマッチするものが変わるので、簡単にマッチングルールが壊れてしまう。
`<Routes>` なら意味合いによる可読性を優先して並べることが出来る、新規追加・書き換えをしても既存ルールが壊れにくいといったメリットがある。

### nested routes の復活

2 についてはなぜ復活したのか。
nested routes が作者陣お気に入りの機能だったのが、React way に合わせることを最優先とした結果 v4 で廃止された。
しかし、 Reach Router での知見 + 現状のReact と nested routes を融和させる目処が立ったため復活させた、と思われる。

```tsx
// ver5
constApp:FC=()=>(
  <Switch>
    <Route exact path="/"><Home /></Route>
    <Route path="/users" component="Users" />
  </Switch>
);
const Users: FC<RouteComponentProps> = ({ match }) => (
  <div>
    <nav>
      <Link to={`${match.url}/me`}>My Profile</Link>
    </nav>
    <Switch>
      <Route path={`${match.path}/me`}><SelfProfile /></Route>
      <Route path={`${match.path}/:id`}><UserProfile /></Route>
    </Switch>
  </div> );


// ver6
constApp:FC=()=>(
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="users/*" element={<Users />} />
  </Routes>
);
const Users: FC = () => (
  <div>
    <nav>
      <Link to="me">My Profile</Link>
    </nav>
    <Routes>
      <Route path=":id" element={<UserProfile />} />
      <Route path="me" element={<SelfProfile />} />
    </Routes>
  </div> );


// ver6 (改善版)
constApp:FC=()=>(
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="users" element={<Users />}>
      <Route path="me" element={<SelfProfile />} />
      <Route path=":id" element={<UserProfile />} />
    </Route>
  </Routes>
);
const Users: FC = () => (
  <div>
    <nav>
      <Link to="me">My Profile</Link>
    </nav>
    <Outlet />
  </div>
);
```

ルーティングをネストすることで、例えば `users/me` ならまず `Users` コンポーネントがマッチする。
さらにネストされた中で `SelfProfile` がマッチする。
それにより最初に `Users` コンポーネントがレンダリングされ、その `<Outlet />` の中で `SelfProfile` がレンダリングされる。

`<Outlet>` は子ルートのコンポーネントをレンダリングするためのプレースホルダー。

ルーティングルールが複数のコンポーネントに分散されていると可読性・メンテナンス性が落ちるので、 nested routes を使って積極的にルールをまとめていくと良い。

### `<Route>` の変更点

`<Route>` について。
レンダリング対象のコンポーネントの指定が、 `component` / `render` 属性 及び 子要素 で行っていたのが `element` 属性で統一された。
そして渡す値も `element={<MyComponent />}` のようにJSXタグを記述する形で React Elements を渡すようになった。

※ `<Route>` の子要素は nested routes で使うようになったため、そちらを優先させた結果。

### `path` のマッチ

`path` のマッチについて。

- 相対パスで記述出来るようになった
- ベースが前方一致ではなく完全一致になった。ただし `<Route>` がネストしている場合は、親ルートのマッチングは前方一致になる
- `exact` および `strict` 属性が廃止。末尾のスラッシュはマッチングで無視される
- 正規表現が使えなくなり、現状では末尾の `*` だけがワイルドカードとしてマッチング可能
- 大文字・小文字を区別したい場合は `caseSensitive` 属性を指定する

### `History` オブジェクトの廃止

履歴系の操作は Hooks API の `useNavigation` で返される `navigate` 関数に集約された。

```tsx
// ver5
import { useHistory, Redirect } from 'react-router-dom';
const Direction: FC<{ shouldGoHome: boolean }> = ({ shouldGoHome }) => {
  const history = useHistory();

  if (shouldGoHome) history.push('/');

  return (
    <>
      <button onClick={() => history.go(-2)}>2 つ戻る</button>
      <button onClick={history.goBack}>戻る</button>
      <button onClick={history.goForward}>進む</button>
      <button onClick={() => history.go(2)}>2 つ進む</button>
    </>
  );
};

// ver6
import { useNavigate, Navigate } from 'react-router-dom';
const Direction: FC<{ shouldGoHome: boolean }> = ({ shouldGoHome }) => {
  const navigate = useNavigate();

  if (shouldGoHome) navigate('/');

  return (
    <>
      <button onClick={() => navigate(-2)}>2 つ戻る</button>
      <button onClick={() => navigate(-1)}>戻る</button>
      <button onClick={() => navigate(1)}>進む</button>
      <button onClick={() => navigate(2)}>2 つ進む</button>
    </>
  );
};
```

`navigate` 関数は引数が数値の場合は 「戻る・進む」系の操作。
文字列 または `PartialPath` 型のオブジェクト (e.g. `{ pathname: '/foo', search: '?bar=baz', hash: '#qux' }`) の場合はリダイレクト系の操作になる。

また、後者では第2引数に `{ replace?: boolean; state?: object | null }` を渡す事ができる。
これによって `history.replace('/')` は `navigate({ path: '/' }, { replace: true })` のように書き換えられる。

### `<Redirect>`

`<Redirect>` が廃止され、代わりに `<Navigate>` を使うようになった。

```tsx
<Navigate to=`/Home` replace />
```

`Navigate` では `replace` を与えることで履歴を上書きするようになる。

### なぜ `History` や `<Redirect>` が置き換えられたか

React ではバージョン16.7 から Suspense という遅延読み込みの機能が導入されていて、それがデータ取得のシーンでも本格的に導入されようとしている。
ブラウザのHooks APIを直接使う従来の `History` や `<Redirect>` は Suspense と相性が悪いため、変更する必要があった。

## v6 でアプリケーションを書き直す

- ルーティングルール
- `History` オブジェクトを使っていた箇所
- `<Redirect>` を使っていた箇所
