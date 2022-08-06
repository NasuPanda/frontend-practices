# 環境構築手順

## anyenv + nodenv による npm インストール

### anyenv インストール

```zsh
$ brew install anyenv
$ echo 'eval "$(anyenv init -)"' >> ~/.zshrc $ exec $SHELL -l
$ anyenv install nodenv
$ exec $SHELL -l
```

### nodenv インストール

インストールが終わったら nodenv で npm をインストールする。

```zsh
$ mkdir -p $(anyenv root)/plugins
$ git clone https://github.com/znz/anyenv-update.git $(anyenv root)/plugins/anyenv-update
$ mkdir -p "$(nodenv root)"/plugins
$ git clone https://github.com/nodenv/nodenv-default-packages.git "$(nodenv root)/plugins/nodenv-default-packages"
$ touch $(nodenv root)/default-packages
```

### `default_packages` の中身

```
yarn
typescript
ts-node
typesync
```

## `create-react-app` の実行

### デフォルトで使用されるパッケージマネージャ

Create React App 5.00 以降は `npm` `npx` から実行されれば npm を、 `yarn` から実行されれば yarn をパッケージマネージャとして使用するように変更されている。

yarn を強制的に使うには `yarn create react-app <project-name>` とする。
`yarn create-react-app` ではなく `yarn create react-app` なので注意。

### バージョン指定して実行

`npx create-react-app@4.0.3 hello-world --template typescript` のようにする。

### node のバージョン

`babel-jest@27.5.1: The engine "node" is incompatible with this module. Expected version "^10.13.0 || ^12.13.0 || ^14.15.0 || >=15.0.0". Got "14.4.0"` というエラーが出た。
文字通り、node のバージョンが対応していないものだったことが問題な模様。

対応しているバージョンに変更することで対処。

```zsh
$ node -v
v14.17.0
```

## ESLintの導入

CRA で作成したプロジェクトにはデフォルトで ESLint が入っている。
react-scripts との相性の問題があるので、ESLintのバージョンはデフォルトのものが推奨。

```zsh
$ yarn list eslint
yarn list v1.22.19
warning Filtering by arguments is deprecated. Please use the pattern option instead.
└─ eslint@8.21.0
```

### 各種パッケージの更新

```zsh
$ yarn upgrade-interactive --latest
$ yarn upgrade typescript@latest
```

### 必要となるパッケージ群

ESLint本体を除くと以下のインストールが必要。

- パーサ
- プラグイン
- 共有設定

## ESLintの環境を作る

ESLintについては CRA で作成したプロジェクトには最初からパッケージがインストールされている。
別途最新のESLintをインストールし直す事もできるが、react-scriptsのバージョンとの相性があるため、インストール済のものを使っておいたほうが無難。

```shell
yarn list eslint

# 各種パッケージのアップデート
yarn upgrade-interactive --latest
yarn upgrade typescript@latest

$ yarn eslint --init

✔ How would you like to use ESLint? · style
# JavaScript を選択
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript
```

終了すると `.eslintrc.js` が生成される。

```js
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
    }
}
```

- env ...... プログラムの実行環境を ESLint に教える。個別の環境ごとに globals の値がプリセットさ れている
- extends ...... 共有設定を適用する。共有設定は ESLint に標準で含まれているものか別途インストールし たもの、またはインストール済みプラグインのパッケージに含まれているものを指定する。なお ここに記述した共有設定間でルール設定が重複している場合、リストの後ろに記述されたほうが 優先される
- parser ...... ESLint が使用するパーサを指定する
- parserOptions ...... パーサの各種実行オプションを設定する
- plugins ...... 任意の(インストール済みの)プラグインを組み込む
- rules ...... 適用する個々のルールと、エラーレベルや例外などその設定値を記述する

「追加でパッケージをDLするか」に対してNoを選択した場合(パッケージマネージャを統一したい場合など)、以下のパッケージをインストールする。

```shell
$ yarn add -D eslint-plugin-react @typescript-eslint/eslint-plugin \
eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y \
eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser

$ typesync
$ yarn
```

## ESLintの適用ルールをカスタマイズ

### Airbnb

Airbnb JavaScript Style Guide に準拠するESLintの共有設定 eslint-config-airbnb が有名。

### `extends` による各プラグイン推奨ルールの共有設定

まず `extends` から。各プラグイン推奨ルールの共有設定を書く。
プラグインは読み込んだだけでは何のルールも適用されないので、プラグイン開発者がパッケージ内で推奨の共有設定を一緒に提供している。
それらをここで適用している。

```js
extends: [ 'plugin:react/recommended', 'airbnb',
+ 'airbnb/hooks',
+ 'plugin:import/errors',
+ 'plugin:import/warnings',
+ 'plugin:import/typescript',
+ 'plugin:@typescript-eslint/recommended',
+ 'plugin:@typescript-eslint/recommended-requiring-type-checking',
],
```

記述順序には意味がある。
共有設定感で設定ルール値が衝突したら、後に記述されたものが優先される。

他のルールセットと依存の順番がある場合はそれぞれドキュメントで言及されているはずなので、新しくプラグインや拡張ルールセットをインストールするときはnpmのページくらいにはざっと目を通しておくと良い。

### `parser`

ESLintのパーサに設定した @typescript-eslint/parser へ渡すオプションの定義。

```js
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
+   project: './tsconfig.eslint.json',
    sourceType: 'module',
+   tsconfigRootDir: __dirname,
  },
```

まず、TypeScriptコンパイル設定ファイルのパスの設定。
型情報が要求されるルールを使用したい場合に必要となる。

ここでは `tsconfig.json` ではなく `tsconfig.eslint.json` を読み込むように設定している。
なぜ別ファイルが必要なのかというと、こうしないとパーサがローカルにインストールされているnpmパッケージのファイルまでパースしてしまい、VSCodeと連携させたときのパフォーマンスが落ちたりするため。

```json:tsconfig.eslint.json
{
  "extends": "./tsconfig.json",
  "include": [
    "src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### `plugins`

読み込ませる追加ルールのプラグインを記述する。
`yarn add` しただけでは使えるようにならず、ここにリストアップすることで初めてそれらのルールが適用出来るようになる。

```js
  plugins: [
    '@typescript-eslint',
    + 'import',
    + 'jsx-a11y',
    'react',
    + 'react-hooks',
  ],
```

### `root`

親ディレクトリの設定ファイルまで読み込んでしまうというESLintデフォルトの挙動を抑止するためのもの。

```js
  + root:true,
```

### `rules` 及び 類似設定

```js
rules: {
    // occur error in `import React from 'react'` with react-scripts 4.0.1
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
    'error',
    ],
    'lines-between-class-members': [
    'error',
    'always',
    {
        exceptAfterSingleLine: true,
    },
    ],
    'no-void': [
    'error',
    {
        allowAsStatement: true,
    },
    ],
    'padding-line-between-statements': [
    'error',
    {
        blankLine: 'always',
        prev: '*',
        next: 'return',
    },
    ],
    '@typescript-eslint/no-unused-vars': [
    'error',
    {
        'vars': 'all',
        'args': 'after-used',
        'argsIgnorePattern': '_',
        'ignoreRestSiblings': false,
        'varsIgnorePattern': '_',
    },
    ],
    'import/extensions': [
    'error',
    'ignorePackages',
    {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
    },
    ],
    'react/jsx-filename-extension': [
    'error',
    {
        extensions: ['.jsx', '.tsx'],
    },
    ],
    'react/jsx-props-no-spreading': [
    'error',
    {
        html: 'enforce',
        custom: 'enforce',
        explicitSpread: 'ignore',
    },
    ],
    'react/react-in-jsx-scope': 'off',
},
overrides: [
    {
    'files': ['*.tsx'],
    'rules': {
        'react/prop-types': 'off',
    },
    },
],
settings: {
    'import/resolver': {
    node: {
        paths: ['src'],
    },
    },
},
```

- `no-use-before-define` , `@typescript-eslint/no-use-before-define`
  - 定義前の変数の使用を禁じる ESLint と TypeScript ESLint のルール。
- `lines-between-class-members`
  - クラスメンバーの定義の間に空行を入れるかどうかを定義するルール。
  - ここでは1行記述のメンバーのときは空行不要にしている
- `no-void`
  - `void` 演算子の式としての使用を禁じるルール
- `padding-line-between-statements`
  - 任意の構文の間に区切りの空行を入れるかどうかを定義するルール
  - ここでは `return` の前に空行を入れるよう設定している
- `@typescript-eslint/no-unused-vars`
  - 仕様していない変数の定義を許さないルール
  - ここでは変数名を `_` にしたときのみ許容するよう設定
- `import/extensions` *
  - インポート時にファイル拡張子を記述するかどうかを定義するルール
  - ここでは npm パッケージ以外のファイルについて、 `.js` `.jsx` `.ts` `.tsx` のファイルのみ拡張子を省略、他ファイルは拡張子を記述させるよう設定
- `react/jsx-filename-extension` *
  - JSXのファイル拡張子を制限するルール
  - `.jsx` のみに制限されているので `.tsx` を追加
- `react/jsx-props-no-spreading`
  - JSXでコンポーネントを呼ぶときの props の記述にスプレッド構文を許さないルール
  - 個々の props を明記する書き方のみ許容するように設定
- `react/react-in-jsx-scope`
  - JSXを使用する時、reactモジュールを `React` としてインポートすることを強制する
  - 新しいJSX変換形式ではインポート不要なので無効化
- `react/prop-types` *
  - コンポーネントの props に型チェックを行うための `propsTypes` プロパティの定義を強制するルール
  - TypeScriptの場合不要なのでファイル拡張子が `.tsx` の場合に無効化するよう設定を上書き

`overrides` は任意の glob パターンにマッチするファイルのみ、ルールの適用を上書きできるプロパティ。
ここでは react/prop-types ルールを通常の JSX ファイルでは適用したままにして、.tsx ファイルでは無効にするために使ってる。

`settings` は任意の実行ルールに適用される追加の共有設定。
`tsconfig.json` で `src/` 配下のファイルを絶対パスでインポート出来るようにしていたが、このままでは eslint-plugin-import が絶対パスを解決出来ずエラーを出してしまう。
そこで、 eslint-plugin-import が内部で使用している eslint-import-resolver-node というモジュール解決プラグインに対し、パスに `src` を追加してあげている。

ルールの適用については基本は共有設定で規定されている通りに従うべきだが、TypeScriptについて考慮されていないものを調整したり、チームに合わせて部分的にゆるめたり厳しくしたりするイメージ。
なお、上で `*` がついている設定がTypeScript必須設定、他は著者の好み。

### ルールの調べ方

[Rules - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/rules/)
[typescript-eslint/packages/eslint-plugin at main · typescript-eslint/typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin#supported-rules)

各種プラグインはプロジェクトページやnpmのページを見に行く感じ。

### `.eslintignore`

ESLintチェックの対象外となるファイルを定義。

```ignore
build/
public/
**/coverage/
**/node_modules/
**/*.min.js
*.config.js
.*lintrc.js
```

### VSCode の `setting.json`

`setting.json` に以下を追加しておく。

```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
"editor.formatOnSave": false,
"eslint.packageManager": "yarn",
"typescript.enablePromptUseWorkspaceTsdk": true
```

最後の行は、プロジェクトにTypeScriptがインストールされている場合、VSCode内蔵のTypeScriptとプロジェクトのTypeScriptどちらを使うか尋ねさせる設定。
VSCodeに内蔵されているTypeScriptは大抵バージョンが古いため。

なお、プロジェクトのTypeScriptを強制的に使わせたい場合は以下を記述。

```json
"typescript.tsdk": "./node_modules/typescript/lib",
```

## 最終的な形

### `.eslintrc.js`

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "airbnb/hooks",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    project: "./tsconfig.eslint.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jsx-a11y',
    'react',
    'react-hooks',
  ],
  root: true,
  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "lines-between-class-members": [
      "error",
      "always",
      {
        exceptAfterSingleLine: true,
      },
    ],
    "no-void": [
      "error",
      {
        allowAsStatement: true,
      },
    ],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        argsIgnorePattern: "_",
        ignoreRestSiblings: false,
        varsIgnorePattern: "_",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".jsx", ".tsx"],
      },
    ],
    "react/jsx-props-no-spreading": [
      "error",
      {
        html: "enforce",
        custom: "enforce",
        explicitSpread: "ignore",
      },
    ],
    "react/react-in-jsx-scope": "off",
    'react/function-component-definition': [
        'error',
        {
          namedComponents: [
            'arrow-function',
          ],
        },
    ],
  },
  overrides: [
    {
      files: ["*.tsx"],
      rules: {
        "react/prop-types": "off",
      },
    },
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },
};
```

### `.eslintignore`

```js
build/
public/
**/coverage/
**/node_modules/
**/*.min.js
*.config.js
.*lintrc.js
```

### `tsconfig.eslint.json`

```json
{
  "extends": "./tsconfig.json",
  "include": [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## まとめてlintチェックが走るようにする

```json:package.json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:fix": "eslint --fix 'src/**/*.{js,jsx,ts,tsx}'",
    "preinstall": "typesync || :"
  },
```

`yarn lint` で全JavaScript、TypeScriptファイルにESLintのチェックが入る。

また、パッケージをインストールするごとに `typesync` を手動実行するのは面倒なので、 `preinstall` で自動で走るようにしてある。
`A || B` (A が失敗したら B を実行)を使い、成功したら `:` (何もしないコマンド) を実行することで、異常終了することを防ぐ。

