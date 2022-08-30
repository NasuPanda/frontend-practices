# 1. 言語・環境編

## 読み物

[技術選定の審美眼 / Understanding the Spiral of Technologies - Speaker Deck](https://speakerdeck.com/twada/understanding-the-spiral-of-technologies)


[プログラマが知るべき97のこと](https://xn--97-273ae6a4irb6e2hsoiozc2g4b8082p.com/)

[関数型プログラミングを学ぶことの重要性 | プログラマが知るべき97のこと](https://xn--97-273ae6a4irb6e2hsoiozc2g4b8082p.com/%E3%82%A8%E3%83%83%E3%82%BB%E3%82%A4/%E9%96%A2%E6%95%B0%E5%9E%8B%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E3%82%92%E5%AD%A6%E3%81%B6%E3%81%93%E3%81%A8%E3%81%AE%E9%87%8D%E8%A6%81%E6%80%A7/)

[Github Language Stats](https://madnight.github.io/githut/#/pull_requests/2022/1)

## リファレンス

### スタイルガイド

[airbnb/javascript: JavaScript Style Guide](https://github.com/airbnb/javascript/) : JSスタイルガイド

### TypeScript

[TypeStrong/ts-node: TypeScript execution and REPL for node.js](https://github.com/TypeStrong/ts-node)

[TypeScript: The starting point for learning TypeScript](https://www.typescriptlang.org/docs/handbook/)

[TypeScript: TSConfig Reference - Docs on every TSConfig option](https://www.typescriptlang.org/tsconfig)

### その他

[Node.js](https://nodejs.org/ja/)

[Deno - A modern runtime for JavaScript and TypeScript](https://deno.land/)

Node.js のオリジナル作者 Ryan Dhal が、Node.js の初期設計の「ミス」を反省し、モダンな設計によって一 から作り直した JavaScript の実行環境。

[The Missing Package Manager for macOS (or Linux) — Homebrew](https://brew.sh/)

Max Howell が中心となって開発している macOS 用のパッケージ管理システム。
Debian 系 Linux に搭載され ている APT のようにバイナリを配布するのではなく、都度ビルドを行う。
ただしすべてのソースをビルドするのではなく、バイナリがあるものは Bottle というバイナリパッケージをインストールする。
home-brew とは英語で自家醸造酒(ビール)を意味し、「ユーザーが自らパッケージをビルドして使用する」ことのメタファーとなっている。

[Jest · 🃏 Delightful JavaScript Testing](https://jestjs.io/ja/) : テスティングフレームワーク

[motdotla/dotenv: Loads environment variables from .env for nodejs projects.](https://github.com/motdotla/dotenv): 環境ごとに異なる環境変数の設定

## ライブラリ/プラグイン

[TristonJ/eslint-plugin-prefer-arrow: ESLint plugin to prefer arrow functions](https://github.com/TristonJ/eslint-plugin-prefer-arrow) : ESLintのプラグイン、関数の宣言をアロー関数式に限定する

[Lodash](https://lodash.com/) : ユーティリティライブラリ

[davidmarkclements/rfdc: Really Fast Deep Clone](https://github.com/davidmarkclements/rfdc) : deep clone

# 2. React基礎編

## 読み物

[Prettier · Opinionated Code Formatter](https://prettier.io/) : Haskell の作者のひとりでもある Philip Wadler という著名な学者による論文。Prettierに適用されるスタイルの元となっている。

[Why Prettier? · Prettier](https://prettier.io/docs/en/why-prettier.html) : Prettier 公式ドキュメントの、Prettierを使う意義について。

[Our First 50,000 Stars – React Blog](https://ja.reactjs.org/blog/2016/09/28/our-first-50000-stars.html) : React誕生秘話。

[React の流儀 – React](https://ja.reactjs.org/docs/thinking-in-react.html) : Reactの流儀について。

[Presentational and Container Components | by Dan Abramov | Medium](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) Presentational / Container Components というデザインパターンについて。

[関数コンポーネントはクラスとどう違うのか? — Overreacted](https://overreacted.io/ja/how-are-function-components-different-from-classes/) : 関数コンポーネントとクラスコンポーネントの挙動の違い

[フックに関するよくある質問 – React](https://ja.reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) : 依存関係を適切にｓるうための考え方


## リファレンス

### ESLint

[TypeScript ESLint](https://typescript-eslint.io/) : ESLint本体。公式のTypeScript対応プロジェクトが提供しているパッケージ群

[javascript/packages/eslint-config-airbnb at master · airbnb/javascript](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) : airbnbの共有設定。とりあえず入れておけば間違いない。

[Rules - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/rules/) : ESLint組み込みのルール

[typescript-eslint/packages/eslint-plugin at main · typescript-eslint/typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin#supported-rules) : @typescript-eslint/eslint-plugin の設定可能なルール

[Configuring ESLint - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/user-guide/configuring) : `.eslintrc` のドキュメント

[dustinspecker/awesome-eslint: A list of awesome ESLint plugins, configs, etc.](https://github.com/dustinspecker/awesome-eslint) : ESLintのサードーパーティ製プラグインをまとめたリポジトリ

### Prettier

[Prettier · Opinionated Code Formatter](https://prettier.io/) : コードフォーマッタ Prettier のドキュメント

[Options · Prettier](https://prettier.io/docs/en/options.html) : 設定可能なオプション

[prettier/eslint-config-prettier: Turns off all rules that are unnecessary or might conflict with Prettier.](https://github.com/prettier/eslint-config-prettier) : Prettier と競合する可能性のある ESLint の各種ルールを無効にする共有設定

### Stylelint

[Home | Stylelint](https://stylelint.io/) : CSSフォーマッタ Stylelint のドキュメント。

[stylelint/stylelint-config-standard: The standard shareable config for Stylelint](https://github.com/stylelint/stylelint-config-standard) : stylelint公式による標準のESLint共有設定

[hudochenkov/stylelint-order: A plugin pack of order related linting rules for Stylelint.](https://github.com/hudochenkov/stylelint-order) : 並び順に関するプラグイン

[stormwarning/stylelint-config-recess-order: 🗂️ Recess-based property sort order for Stylelint.](https://github.com/stormwarning/stylelint-config-recess-order) : recessに基づく並び順にするための共有設定

[twitter-archive/recess: A simple and attractive code quality tool for CSS built on top of LESS](https://github.com/twitter-archive/recess) : RECESS (Twitter 製のCSSSリンター)

### Gitフック

[Git - Git フック](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA-Git-%E3%83%95%E3%83%83%E3%82%AF) : Gitフック。

[toplenboren/simple-git-hooks: A simple git hooks manager for small projects](https://github.com/toplenboren/simple-git-hooks)

[okonet/lint-staged: 🚫💩 — Run linters on git staged files](https://github.com/okonet/lint-staged) : ステージされたコードに対してlint✔を走らせるためのツール。

### React

[React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/) : Reactに関わるTypeScriptの話が載っている。頻繁にアップデートがあり、これを見ていればトレンドがわかるので参照すべし。

[React – A JavaScript library for building user interfaces](https://reactjs.org/) : React 公式

[合成イベント (SyntheticEvent) – React](https://ja.reactjs.org/docs/events.html#supported-events) : Reactがサポートするイベント

[state のリフトアップ – React](https://ja.reactjs.org/docs/lifting-state-up.html) : stateによるフォームの実装

[useEffect完全ガイド — Overreacted](https://overreacted.io/ja/a-complete-guide-to-useeffect/) : useEffectのガイド

[関数コンポーネントはクラスとどう違うのか? — Overreacted](https://overreacted.io/ja/how-are-function-components-different-from-classes/) : 関数コンポーネントとクラスコンポーネントの挙動の違い

[フックに関するよくある質問 – React](https://ja.reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) : 依存関係を適切にｓるうための考え方

[Introduction - Semantic UI React](https://react.semantic-ui.com/) : Semantic UI React (React 向けUIフレームワーク)

[DefinitelyTyped/types/react at master · DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react) : Reactの型定義

### その他

[Google Developers Japan: Web Vitals の概要: サイトの健全性を示す重要指標](https://developers-jp.googleblog.com/2020/05/web-vitals.html) : CRA4.0 から導入されている、 Web Vitals というパフォーマンス計測指標。

AOTコンパイル = Ahead-of-time Compilation : アプリケーション実行前にコードを事前にコンパイルすること。Facebook は Prepack という JavaScript のオプティマイザを開発中で、React 開発チームはそれをビルドプロセスに組み込んでパフォーマンスを大幅に向上させるべく検証を行っているとのこと。

# 3. React応用編

## 読み物

[Atomic Design | Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/) : アトミックデザインというデザインパターンについて。

[Dan Abramov - Live React: Hot Reloading with Time Travel at react-europe 2015 - YouTube](https://www.youtube.com/watch?v=xsSnOQynTHs) : 動画だが。Redux 発表セッション。

[React Fiberアーキテクチャについて | POSTD](https://postd.cc/react-fiber-architecture/) : React 16.0 から採用されたレンダリングのためのアーキテクチャ。

[sagas.pdf](https://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf) : Saga パターンについての論文。

[Micro Frontends](https://www.martinfowler.com/articles/micro-frontends.html) : マイクロフロントエンド(マイクロサービスアーキテクチャのフロントエンド版のようなもの)

[我々向けの Algebraic Effects 入門 — Overreacted](https://overreacted.io/ja/algebraic-effects-for-the-rest-of-us/) : Suspense の Promise Boundary はここから着想を得たらしい。

[パフォーマンスの監査](https://web.dev/lighthouse-performance/) : Web パフォーマンス計測の指標

## React Router

[React Router: Declarative Routing for React.js](https://v5.reactrouter.com/web/guides/quick-start) : 公式ドキュメント。ルーティング初心者には難易度が高い上、ボリュームも多い。ただし目は通しておくべき。ユースケースごとのサンプル(ログイン有無でのルーティングの切り分けなど)が載っている。

## Redux

[React Redux | React Redux](https://react-redux.js.org/) : ReduxをReactに組み込むためのバインディング。

[Three Principles | Redux](https://redux.js.org/understanding/thinking-in-redux/three-principles) : Redux の3つの思想

[Hooks | React Redux](https://react-redux.js.org/api/hooks) : Hooks API のドキュメント

[Style Guide | Redux](https://redux.js.org/style-guide/) : Redux のスタイルガイド

[Ecosystem | Redux](https://redux.js.org/introduction/ecosystem/) : Redux のエコシステム

### Redux 推奨ツール

[Introduction to Immer | Immer](https://immerjs.github.io/immer/) : イミュータブルな更新を簡単にする

[Redux Toolkit | Redux Toolkit](https://redux-toolkit.js.org/) : Redux における Create React App のような存在

[Redux DevTools extensions](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ja) : タイムトラベルデバッギング。

[Thunks in Redux: The Basics. What Thunks Are, What They Solve, &… | by Gabriel Lebec | Fullstack Academy | Medium](https://medium.com/fullstack-academy/thunks-in-redux-the-basics-85e538a3fe60) : 非同期処理ライブラリ (りあクト作者非推奨)

### Redux 関連ツール

[Redux-Saga - An intuitive Redux side effect manager. | Redux-Saga](https://redux-saga.js.org/) : 非同期処理ライブラリ

## React

[useEffect完全ガイド — Overreacted](https://overreacted.io/ja/a-complete-guide-to-useeffect/) : `useEffect` のガイド。

[Error Boundary – React](https://ja.reactjs.org/docs/error-boundaries.html) : 子孫コンポーネントで throw された例外を補足出来るようにしておき、例外発生時は通常のコンポーネントツリーの代わりに fallback のUIを表示してくれるコンポーネントのこと。

[プロファイラ API – React](https://ja.reactjs.org/docs/profiler.html) : パフォーマンスの計測に使える。

### テスト

[テストユーティリティ – React](https://ja.reactjs.org/docs/test-utils.html) : テスト用ユーティリティ

[テストのレシピ集 – React](https://ja.reactjs.org/docs/testing-recipes.html) : テストのレシピ

## React ライブラリ

[ホーム | React Hook Form - Simple React forms validation](https://react-hook-form.com/jp/) : フォーム管理ライブラリ

[Introduction to Apollo Client - Apollo GraphQL Docs](https://www.apollographql.com/docs/react/) : Micro Frontends の思想に合った GraphQL クライアント。

[Recoil](https://recoiljs.org/) : Facebook製の状態管理ライブラリ

[FormidableLabs/urql: The highly customizable and versatile GraphQL client with which you add on features like normalized caching as you grow.](https://github.com/FormidableLabs/urql) : Suspense に対応している GraphQL クライアント。おすすめ。

[Getting Started – SWR](https://swr.vercel.app/docs/getting-started) : Suspense による宣言的UIを実現するために欲しい機能(Promise を throw したりする辺りをラップしてくれる、キャッシュ機能を持つ)を持つライブラリ。Vercel社製。

[TanStack/query - github](https://github.com/TanStack/query) / [TanStack Query | React Query, Solid Query, Svelte Query, Vue Query](https://tanstack.com/query/v4) : Suspense による宣言的UIを実現するために欲しい機能を持つもう1つのライブラリ。より多機能な方。りあクト作者のおすすめはこちら。

  [useQuery | TanStack Query Docs](https://tanstack.com/query/v4/docs/reference/useQuery?from=reactQueryV3&original=https://react-query-v3.tanstack.com/reference/useQuery)

  [useMutation | TanStack Query Docs](https://tanstack.com/query/v4/docs/reference/useMutation?from=reactQueryV3&original=https://react-query-v3.tanstack.com/reference/useMutation)


[sindresorhus/ky: 🌳 Tiny & elegant JavaScript HTTP client based on the browser Fetch API](https://github.com/sindresorhus/ky) React 用ではないが。ブラウザ標準の `fetch` よりもモダンな実装をしている。Nuxt.js で公式モジュールとして採用されるなど、いい感じのライブラリ。

## GraphQL

[How to GraphQL - The Fullstack Tutorial for GraphQL](https://www.howtographql.com/) : GraphQL の有名なチュートリアルサイト
