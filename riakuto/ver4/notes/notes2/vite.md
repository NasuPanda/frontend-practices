# Vite

[Vite | 次世代フロントエンドツール](https://ja.vitejs.dev/)

Vue.js と同じ作者、 Evan You によるツール。
vue は view のフランス語。 vite もフランス語で「速い(quick, fast)」という意味の単語。

## クイックスタート

以下のコマンドを入力するだけ。
めちゃくちゃ速い。

```zsh
$ yarn create vite hello-world-vite --template=react-ts
...
✨  Done in 0.97s.

$ cd hello-world-vite
$ yarn     # インストール
$ yarn dev # 起動
```

デフォルトでは `http://localhost:5173` で起動する。

## 利点

他の競合プロダクトの利点を取り入れつつ、うまくバランスを取った使い勝手の良いツールに仕上がっている。

- ESM ネイティブ
- 爆速
- ノーバンドル
- (ほぼ)ゼロコンフィグ

## 詳細

### `vite.config.ts`

TypeScript テンプレートを適用した場合の Vite の設定ファイル。

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
```

最初の状態では React 甩の Vite プラグインを読み込む設定が書かれている。

### `package.json`

```json
{
  "name": "vite-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.17",
    "@types/react-dom": "^18.0.6",
    "@vitejs/plugin-react": "^2.1.0",
    "typescript": "^4.6.4",
    "vite": "^3.1.0"
  }
}
```

scripts は以下。

- `dev` : 開発サーバ起動
- `build` : 本番用ビルド。結果は `/dist` 配下。
- `preview` : ビルドされたファイルを元にしてアプリケーションサーバを起動

### TypeScript のモジュール解決設定

TypeScript には `baseUrl` というコンパイルオプションがある。これは非相対インポートの起点となるディレクトリを追加するためのオプションで、自作の型定義ファイルを npm パッケージに当てるときに使う。

Vite のデフォルト環境ではこの設定が働かないので、組み込んでおく。

```zsh
yarn add -D vite-tsconfig-paths
```

```ts
// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
+ import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  + tsconfigPaths()
  ],
});
```

```json
// tsconfig.json

{
  "compilerOptions": {
    ...
    "jsx": "react-jsx",
  + "baseUrl": "src",
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 環境変数

参考 : [Configuring Vite #environment-variables](https://vitejs.dev/config/#environment-variables)

Vite 環境には最初から dotenv パッケージが組み込まれていて、 `.env[.(development | production)[.local]]` 形式のファイルが読み込まれるようになっている。

- 開発環境のみんなで扱う環境変数 : `.env.development`
- リポジトリに上げない本番のパスワードなど : `.env.production.local`

ユーザ定義の環境変数は頭に `VITE_` を付ける。

アプリケーション上では `import.meta` オブジェクトの `env` プロパティから参照出来る。

まず下記2つのファイルを追加。
2つ目の型定義ファイルはプロジェクト内で定義した環境変数に型を適用するためのもの。

- `.env`
- `src/app-env.d.ts`

```env
VITE_APP_TITLE=My awesome vite app
```

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // ここに定義した変数を追加していく
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### パッケージのアップデート

`npm-check-updates` をインストールしていれば、 `ncu` コマンドが使える。

- `ncu -u` : 問答無用アップデート
- `ncu -i` : 対話型アップデート

```zsh
$ ncu

ncu
Using yarn
Checking /Users/westen/frontend-practices/riakuto/ver4/works/vite-app/package.json
[====================] 8/8 100%

 @types/react  ^18.0.17  →  ^18.0.18
 typescript      ^4.6.4  →    ^4.8.3

Run ncu -u to upgrade package.json
```

# 他プロダクトについて

## 他のモジュールバンドラやコンパイラ

フロントエンド開発には諸事情からコンパイラが必要。その中でも有名なのがwebpack。
webpack の機能が多くなるにつれ、設定ファイルが肥大化していった。それを解決すべく Percel (ゼロコンフィグのプロダクト)が登場。

次に、ESMネイティブなモジュールバンドラ、 Rollup が登場。
`require` を封じて ESM の `import` に強制出来るなどのメリットにより、コードの静的解析を効率化、バンドルサイズの低減に成功。
React , Vue.js などの有名パッケージのビルドに採用されている。

上記コンパイラやモジュールバンドラはJavaScriptで書かれていたため、共通の課題として、ビルドに時間がかかりすぎることがあった。

そこで、「爆速であること」を意識して Go や Rust といったバイナリにコンパイル出来る言語により実装することで高速化を図ったプロダクトが登場。
esbuild や SWC (Speedy Web Compiler) など。

## CRA の問題点

CRA については省略。

- 遅い。
- CRA の開発体制。Meta で CRA プロジェクトにフルタイムで関わっている開発者はいなく、一般の開発者がメインとなってメンテナンスしている。
