# 1. Hello, React!!

## Vue

Vueは MVVM (Model - View - ViewModel) からなる。MVCアーキテクチャに慣れ親しんでいる場合、Vueの方がとっつきやすい。

## Node.js

### Node.jsとは

Node.js = JavaScriptをPCのターミナル上で動かす事ができるようにするためのソフトウェア。
中の言語処理エンジンはGoogle chrome用のV8を流用している。

※ V8: Google製のオープンソースJavaScriptエンジン。ChromiumベースのブラウザやNode.jsなどのJavaScriptランタイムに採用されている。

### 必要性

- パッケージのインストール、整合性の管理を担ってくれる**npm**を利用するために必要。
  - 以下のような理由からnpmが必要。
  - それなりの規模のアプリケーションになってくると、サードパーティ製のライブラリを複数使う。
  - それらは相互に特定のバージョンに依存しあっていたりする。
- パッケージマネージャとしてだけでなく、以下のような機能も持つ。
  - JSやCSSを少数のファイルにまとめるバンドル
  - ES6の構文をブラウザに対応した構文にコンパイル
  - 開発時にローカルでサーバを立ち上げ、テストする
  - テストツールや静的構文解析をローカルで実施する

### インストール 及び プラグイン紹介

anyenv + nodenv によるインストールが推奨されている。
導入済みのため割愛。

なお、 `anyenv-update` と `nodenv-default-package` というプラグインが推奨されていた。

```zsh
mkdir -p $(anyenv root)/plugins
git clone https://github.com/znz/anyenv-update.git $(anyenv root)/plugins/anyenv-update
mkdir -p "$(nodenv root)"/plugins
git clone https://github.com/nodenv/nodenv-default-packages.git "$(nodenv root)/plugins/nodenv-default-packages"

# デフォルトでインストールするパッケージの設定
touch $(nodenv root)/default-packages
vi $(nodenv root)/default-packages
cat $(nodenv root)/default-packages

# default-packagesの中身
yarn
typescript
ts-node
typesync
```

## `create-react-app`

### なんのために?

ReactはUI構築のための必要最小限のライブラリ。そのため、新規プロジェクトのスケルトンを生成してくれるようなコマンド(`rails new`のような)は昔は存在しなかった。
それなりの規模の開発でReactを採用しようとすると、コンパイラやバンドラが必須。それらを導入した上で連携して動作するような設定をする必要があった。

その問題が認識されるようになり、公開から4年経った2016年に Create React App がリリースされた。

### 何をする?

以下のパッケージがインストールされる。

- `react`
  - React本体
- `react-dom`
  - DOMを抽象化し、Reactから操作できるようにする
- `react-scripts`
  - Create React App の魔法(裏に隠れた多数のパッケージを隠蔽)

### Hello, React!

npxを使う。

```zsh
npx create-react-app <project-name> --template=typescript
# サーバのスタート
yarn start
```

`--template=typescript` はTypeScriptのためのテンプレート。

### バンドラとコンパイラ

CRAで作成したプロジェクトでは、ソースコードはBabelによりコンパイルされ、webpackによりバンドルされて適切な形にまとめられ、更にそれらが相互に関連付けられる。

***

## アプリを管理するためのコマンドやスクリプト

## Yarn

npmコマンドのFacebookによる改良版。

### 基本

![yarnrn-cs](images/yarn_cs.png)

`yarn upgrade-interactive [--latest]`

各パケージの更新情報をチェック、対話形式で一括アップデート。

### scripts

`package.json` の `scripts` セクションに定義したコマンドをあたかも Yarn のコマンドかのように扱える。
実行時には `node_modules/.bin/` にパスが通される。

自分で定義することもできるが、予約キーワードや他スクリプトをフックに実行される予約キーワードがあるため注意。
フックの方は大抵 「pre」 というキーワードが入る。

詳細 : https://docs.npmjs.com/cli/v7/using-npm/scripts#life-cycle-operation-order

## react-scripts

実体は `node_modules/react-scripts/scripts` 内にある。

### `start`

開発用サーバの起動

### `build`

本番環境にデプロイするためのファイルを生成

### `test`

テストファイルをソースディレクトリから抽出、テストを走らせる。
起動しっぱなしにしておくと差分を検知してそこだけ実行してくれる。

### `eject`

react-scriptsの庇護から抜け出すためのコマンド。
実行すると隠蔽されていたパッケージが `package.json` に現れる。
また、プロジェクトルートに `config/` が作られ、そこに設定ファイルが置かれる。

今は `eject` せずともwebpack や Babel の設定を変更できるので、庇護に留まることを推奨する。

