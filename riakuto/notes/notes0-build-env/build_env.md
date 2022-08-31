# React 環境構築手順
Environment Setup Procedures and Project Template
## 前提

- macOS Monterey 12.5.1
- 2022年8月現在の手順

`my-project-react-17` の `package.json` を使って　`yarn install` or `npm install` すれば、ひとまず React 17 (TypeScript) + 下に示すリンターやフォーマッタが入った環境ができる。

## 設定ファイル

随時更新。

### `package.json`

```json
{
  "name": "theme-context",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^12.1.0",
    "@testing-library/user-event": "^13.2.1",
    "@types/jest": "^27.0.1",
    "@types/node": "^16.9.1",
    "@types/react": "^17.0.21",
    "@types/react-dom": "^17.0.9",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "semantic-ui-css": "^2.4.1",
    "semantic-ui-react": "^2.0.3",
    "typescript": "^4.4.3",
    "web-vitals": "^2.1.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "fix": "npm run -s format && npm run -s lint:fix",
    "format": "prettier --write --loglevel=warn '{public,src}/**/*.{js,jsx,ts,tsx,html,gql,graphql,json}'",
    "lint": "npm run -s lint:style; npm run -s lint:es",
    "lint:fix": "npm run -s lint:style:fix && npm run -s lint:es:fix",
    "lint:es": "eslint 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:es:fix": "eslint --fix 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:conflict": "eslint-config-prettier 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:style": "stylelint 'src/**/*.{css,less,sass,scss}'",
    "lint:style:fix": "stylelint --fix 'src/**/*.{css,less,sass,scss}'",
    "preinstall": "typesync || :",
    "prepare": "simple-git-hooks > /dev/null"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@types/prettier": "^2.3.2",
    "@types/stylelint": "^13.13.2",
    "@types/testing-library__jest-dom": "^5.14.1",
    "@types/testing-library__user-event": "^4.2.0",
    "@typescript-eslint/eslint-plugin": "^4.31.1",
    "@typescript-eslint/parser": "^4.31.1",
    "eslint-config-airbnb": "18.2.1",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-import": "^2.24.2",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-prefer-arrow": "^1.2.3",
    "eslint-plugin-react": "^7.25.1",
    "eslint-plugin-react-hooks": "4.2.0",
    "lint-staged": "^11.1.2",
    "prettier": "^2.4.0",
    "simple-git-hooks": "^2.6.1",
    "stylelint": "^13.13.1",
    "stylelint-config-recess-order": "^2.5.0",
    "stylelint-config-standard": "^22.0.0",
    "stylelint-order": "^4.1.0",
    "typesync": "^0.8.0"
  },
  "simple-git-hooks": {
    "pre-commit": ". ./udemy-react-stepup/lint-staged-around"
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "prettier --write --loglevel=error",
      "eslint --fix --quiet"
    ],
    "src/**/*.{css,less,sass,scss}": [
      "stylelint --fix --quiet"
    ],
    "{public,src}/**/*.{html,gql,graphql,json}": [
      "prettier --write --loglevel=error"
    ]
  }
}
```

### `eslint.js`

```js:eslint.js
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
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: "./tsconfig.eslint.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "@typescript-eslint",
    "import",
    "jsx-a11y",
    "prefer-arrow",
    "react",
    "react-hooks",
  ],
  root: true,
  rules: {
    // occur error in `import React from 'react'` with react-scripts 4.0.1
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
    "prefer-arrow/prefer-arrow-functions": [
      "error",
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
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

### `.eslint.ignore`

```shell:.eslint.ignore
build/
public/
**/coverage/
**/node_modules/
**/*.min.js
*.config.js
```

### `.prettier.rc`

```json:.prettier.rc
{
  "bracketSpacing": true,
  "printWidth": 80,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "useTabs": false
}
```

### `.stylelintrc.js`

```js:.stylelintrc.js
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: ['stylelint-order'],
  ignoreFiles: ['**/node_modules/**'],
  rules: {
    'string-quotes': 'single',
  },
};
```

### `.tsconfig.json`

```json:.tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "src",
    "downlevelIteration": true
  },
  "include": [
    "src"
  ]
}
```

### `tsconfig.eslint.json`

```json:tsconfig.eslint.json
{
  "extends": "./tsconfig.json",
  "include": [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```


### Git-hooks

#### `lint-staged-around`

```shell
#!/bin/sh

# lint-staged-around
#   execute each lint-staged entry in sub-directories projects recursively
#
#   Riakuto! Project by Klemiwary Books

fileTypes="js|jsx|ts|tsx|html|css|less|sass|scss|gql|graphql|json"
target="src|public"

# detect git against tag
if git rev-parse --verify HEAD >/dev/null 2>&1
then
  against=HEAD
else
  # Initial commit: diff against an empty tree object
  against=$(git hash-object -t tree /dev/null)
fi

if [ "$(uname)" == "Darwin" ]; then
  sedOption='-E'
else
  sedOption='-r'
fi

# pick staged projects
stagedProjects=$( \
  git diff --cached --name-only --diff-filter=AM $against | \
  grep -E ".*($target)\/" | \
  grep -E "^.*\/.*\.($fileTypes)$" | \
  grep -vE "(package|tsconfig).*\.json" | \
  sed $sedOption "s/($target)\/.*$//g" | \
  uniq \
)

# execute each lint-staged
rootDir=$(pwd | sed $sedOption "s/\/\.git\/hooks//")

for project in ${stagedProjects[@]}; do
  echo "Executing $project lint-staged entry..."
  cd "$rootDir/$project"
  npx lint-staged 2>/dev/null
done
```

#### `test-around`

```shell
#!/bin/sh

# test-around
#   execute each test in sub-directories projects recursively
#
#   Riakuto! Project by Klemiwary Books

# put target project dirs
targetProjects=(
  "06-lint/04-advanced"
  "08-component/02-props"
  "08-component/03-state/01-class"
  "08-component/03-state/02-state"
  "08-component/04-lifecycle"
  "09-hooks/03-effect"
  "09-hooks/02-state"
  "09-hooks/03-effect"
  "09-hooks/04-memoize"
  "09-hooks/05-custom"
)

# execute each test
rootDir=$(pwd | sed -r "s/\/\.git\/hooks//")

for project in ${targetProjects[@]}; do
  cd "$rootDir/$project"
  CI=true npm test
done
```

## Create React App

```zsh
# npm
npx create-react-app <project-name> --template typescript

# yarn
yarn create react-app <project-name> --template typescript
```

### CRA で React 18 をインストール後 17 に変更

参考 : [Create React AppのプロジェクトをReact17にダウングレードする - Qiita](https://qiita.com/kabosu3d/items/674e287dd068322ca7cf)

```zsh
# 依存関係を React 17 系にする
npm install --save react@17.0.2 react-dom@17.0.2 @testing-library/react@12.1.5
```

`index.tsx` を以下に。

```tsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

### デフォルトで使用されるパッケージマネージャ

Create React App 5.00 以降は `npm` `npx` から実行されれば npm を、 `yarn` から実行されれば yarn をパッケージマネージャとして使用するように変更されている。

yarn を強制的に使うには `yarn create react-app <project-name>` とする。
`yarn create-react-app` ではなく `yarn create react-app` なので注意。

### バージョン指定して実行

`npx create-react-app@4.0.3 hello-world --template typescript` のようにする。

※ 2022年 8月 現在、過去のバージョンを指定して実行出来ない。

## ESLint

```zsh
# Create React App を実行した場合最初から入っているのでバージョン確認
$ yarn list eslint
yarn list v1.22.19
warning Filtering by arguments is deprecated. Please use the pattern option instead.
└─ eslint@8.23.0
✨  Done in 0.83s.

$ yarn eslint --init

# only~ ではなく、全てを包括するオプションを選ぶ
✔ How would you like to use ESLint? · style
# JavaScript を選ぶ
✔ What type of modules does your project use? · esm
# React
✔ Which framework does your project use? · react
# TypeScript を使う場合 yes
✔ Does your project use TypeScript? · No / Yes
# Browser でOK
✔ Where does your code run? · browser
# ガイド を選ぶ
✔ How would you like to define a style for your project? · guide
# Airbnb があればそれを、無ければ他を
✔ Which style guide do you want to follow? · standard-with-typescript
# 設定ファイルのフォーマット
✔ What format do you want your config file to be in? · JavaScript
# Yes でいい
✔ Would you like to install them now? · No / Yes
# 使いたいパッケージマネージャを選ぶ
✔ Which package manager do you want to use? · yarn
```

追加で色々インストール。

```zsh
# Airbnb (eslint init でインストールしなかった場合)
yarn add -D eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y \
 eslint-plugin-react eslint-plugin-react-hooks

# prefer-arrow プラグインインストール
yarn -D add eslint-plugin-prefer-arrow
```

### リファレンス

設定のリファレンス。

[Rules - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/rules/)
[typescript-eslint/packages/eslint-plugin at main · typescript-eslint/typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin#supported-rules)

各種プラグインはプロジェクトページやnpmのページを見に行く。

## Prettier

```zsh
yarn add -D prettier eslint-config-prettier
```

### ESLint と Prettier 間でルールの競合がないか確認

次のような出力なら問題なし。

```zsh
$ npx eslint-config-prettier 'src/**/*.{js,jsx,ts,tsx}'
No rules that are unnecessary or conflict with Prettier were found.
```

衝突がある場合次のような出力になる。

```zhs
The following rules are unnecessary or might conflict with Prettier:
- @typescript-eslint/indent
- @typescript-eslint/no-extra-semi
```

この場合は `@typescript-eslint/indent` の設定が不要だということなので、 `eslintrc.js` からそれを削除する。

### リファレンス

[Options · Prettier](https://prettier.io/docs/en/options.html)

## stylelint

```zsh
$ yarn add -D stylelint stylelint-config-standard stylelint-order stylelint-config-recess-order
```

## simple-git-hooks

```zsh
yarn add -D simple-git-hooks lint-staged

# package.json に pre-** を書いた後実行する
$ npx simple-git-hooks
[INFO] Successfully set the pre-commit with command: . ./lint-staged-around
[INFO] Successfully set the pre-push with command: . ./test-around
[INFO] Successfully set all git hooks
```

***

## `typesync` : インストール後に実行

`typesync` は `package.json` を見て足りない型定義パッケージがあれば自動で追加してくれるやつ。

```zsh
typesync
yarn
```

# anyenv + nodenv による npm インストール

## anyenv インストール

```zsh
$ brew install anyenv
$ echo 'eval "$(anyenv init -)"' >> ~/.zshrc $ exec $SHELL -l
$ anyenv install nodenv
$ exec $SHELL -l
```

## nodenv インストール

インストールが終わったら nodenv で npm をインストールする。

```zsh
$ mkdir -p $(anyenv root)/plugins
$ git clone https://github.com/znz/anyenv-update.git $(anyenv root)/plugins/anyenv-update
$ mkdir -p "$(nodenv root)"/plugins
$ git clone https://github.com/nodenv/nodenv-default-packages.git "$(nodenv root)/plugins/nodenv-default-packages"
$ touch $(nodenv root)/default-packages
```

## `default_packages` の中身

```
yarn
typescript
ts-node
typesync
```

# `create-react-app` の実行

## デフォルトで使用されるパッケージマネージャ

Create React App 5.00 以降は `npm` `npx` から実行されれば npm を、 `yarn` から実行されれば yarn をパッケージマネージャとして使用するように変更されている。

yarn を強制的に使うには `yarn create react-app <project-name>` とする。
`yarn create-react-app` ではなく `yarn create react-app` なので注意。

## バージョン指定して実行

`npx create-react-app@4.0.3 hello-world --template typescript` のようにする。

## node のバージョン

`babel-jest@27.5.1: The engine "node" is incompatible with this module. Expected version "^10.13.0 || ^12.13.0 || ^14.15.0 || >=15.0.0". Got "14.4.0"` というエラーが出た。
文字通り、node のバージョンが対応していないものだったことが問題な模様。

対応しているバージョンに変更することで対処。

```zsh
$ node -v
v14.17.0
```

# ESLint

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

```shell
# - - - - - - - - - - -
# CRA 実行済とする
# - - - - - - - - - - -

# 確認
yarn list eslint

# 各種パッケージのアップデート
yarn upgrade-interactive --latest
yarn upgrade typescript@latest

$ yarn eslint --init

✔ How would you like to use ESLint? · style
# JavaScript を選択
✔ What type of modules does your project use? · JavaScript modules
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

既存のプロジェクトに組み込みたい場合は以下のようにして依存するパッケージも含めてダウンロードする。

```zsh
yarn add -D eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y \
 eslint-plugin-react eslint-plugin-react-hooks
```

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
{
  "editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
"editor.formatOnSave": false,
"eslint.packageManager": "yarn",
"typescript.enablePromptUseWorkspaceTsdk": true
}
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

# Prettier

読み方はプリティア。
フロントエンド開発におけるデファクトスタンダードとなっているコードフォーマッタ。

## 必要なパッケージ


ESLintの環境に Prettier を加えるのに必要なパッケージは次の2つ。

- prettier
  - 本体
- eslint-config-prettier
  - Prettier と競合する可能性のあるESLintのルールを無効にする共有設定

## 必要なパッケージのインストール

```zsh
yarn add -D prettier eslint-config-prettier
```

## `.eslintrc.js` の編集

`extends` に `prettier` を加える。
他と競合するルール設定を上書きするものなので、eslint-config-prettier を書くのは一番最後にすること。

```js
  extends: [
    // ...
+   "prettier",
  ],
```

## `.prettierrc` の編集

`.prettierrc` というファイルを作り、 Prettier 用の設定を記述。
1行の文字数やインデントなどのスタイル設定値を個々に記述する。

指定したもの以外はデフォルト値が設定される。
詳細 : [Options · Prettier](https://prettier.io/docs/en/options.html)

```js
{
  "singleQuote": true,
  "trailingComma": "all",
  "endOfLine": "auto"
}
```

## ESLint と Prettier 間でルールの競合がないか確認

次のような出力なら問題なし。

```zsh
$ npx eslint-config-prettier 'src/**/*.{js,jsx,ts,tsx}'
No rules that are unnecessary or conflict with Prettier were found.
```

衝突がある場合次のような出力になる。

```zhs
The following rules are unnecessary or might conflict with Prettier:
- @typescript-eslint/indent
- @typescript-eslint/no-extra-semi
```

この場合は `@typescript-eslint/indent` の設定が不要だということなので、 `eslintrc.js` からそれを削除する。

## `package.json` の `scripts` 編集

- `fix` : Prettierによるフォーマット + ESLint による fix の実行
- `format` : Prettierによるフォーマットの実行
- `lint:conflict` : ESLint / Prettier 間で設定の衝突がないか確認

```json
  "scripts": {
    ︙
    "eject": "react-scripts eject",
    "fix": "npm run -s format && npm run -s lint:fix",
    "format": "prettier --write --loglevel=warn 'src/**/*.{js,jsx,ts,tsx,gql,graphql,json}'",
    "lint": "eslint 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:fix": "eslint --fix 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:conflict": "eslint-config-prettier 'src/**/*.{js,jsx,ts,tsx}'",
    "preinstall": "typesync || :"
  },
```

## VSCode : `settings.json` の編集

`settings.json` に `editor.formatOnSave` と `editor.defaultFormatter` を追加。

```json
    "[javascript]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
    },
    "[javascriptreact]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
    },
    "[typescript]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
    },
    "[typescriptreact]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
    },
    "[graphql]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
    },
    "[json]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
    },
```

# stylelint

CSS にもそこそこ複雑な構文と、様々な流派のコーディングスタイルが存在している。
CSS も linter を導入しておくと良い。

CSS のデファクトスタンダードとなっている linter が stylelint 。

## 必要なパッケージ

- stylelint
  - 本体
- stylelint-config-standard
  - stylelint公式による標準の共有設定
- stylelint-order
  - 並び順に関するルールセットのプラグイン
  - stylelint-config-recess-order が必要
- stylelint-config-recess-order
  - RECESS に基づく CSS の並び替えのための共有設定

## インストール

```zsh
$ yarn add -D stylelint stylelint-config-standard stylelint-order stylelint-config-recess-order
```

## `.stylelintrc.js` の編集

`.eslintrc.js` とほとんど同じ。
異なるのは `ignoreFiles` というプロパティがあることくらい。

```js
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: ['stylelint-order'],
  ignoreFiles: ['**/node_modules/**'],
  rules: {
    'string-quotes': 'single',
  },
};
```

## `package.json` の `scripts` に登録

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "fix": "npm run -s format && npm run -s lint:fix",
    "format": "prettier --write --loglevel=warn 'src/**/*.{js,jsx,ts,tsx,gql,graphql,json}'",
    "lint": "npm run -s lint:style; npm run -s lint:es",
    "lint:fix": "npm run -s lint:style:fix && npm run -s lint:es:fix",
    "lint:es": "eslint 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:es:fix": "eslint --fix 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:conflict": "eslint-config-prettier 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:style": "stylelint 'src/**/*.{css,less,sass,scss}'",
    "lint:style:fix": "stylelint --fix 'src/**/*.{css,less,sass,scss}'",
    "preinstall": "typesync || :"
  },
```

## VSCode: `settings.json` に追加

```json
    "editor.codeActionsOnSave": {
      // ...
      "source.fixAll.stylelint": true, // stylelint
    },
    "css.validate": false,
    "less.validate": false,
    "scss.validate": false,
```

# 更に進んだ設定

## ESLintのプラグイン

ESLint はサードパーティからプラグインとして多くのルールが提供されている。
AWESOME ESLint というリポジトリにはプラグインや共有設定が100個以上掲載されている。

## eslint-plugin-prefer-arrow の導入

関数宣言をアロー関数式限定にするプラグイン。

### インストール

```zsh
yarn -D add eslint-plugin-prefer-arrow
```

### `.eslintrc.js` の編集

```js
  plugins: [
    '@typescript-eslint',
    'import',
    'jsx-a11y',
+   'prefer-arrow',
    'react',
    'react-hooks',
  ],
  ...
  rules: {
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
  }
```

## コミット前にlintチェックを走らせる

Git Hooks という仕組みを使う。
Git Hooks は `.git/hooks/` ディレクトリにある、各アクション名に対応したスクリプトファイルを実行する。
例えばそこに `pre-commit` というファイルがあればコミット前に、 `pre-push` があればプッシュ前に実行してくれる。

## simple-Git-hooks の導入

### インストール

```zsh
yarn add -D simple-git-hooks lint-staged
```

### `package.json` の編集

`prepare` で `simple-git-hooks` を走らせることで、 Git Hooks への登録忘れを防ぐ。

```json
  "scripts": {
    // ...
    "prepare": "simple-git-hooks > /dev/null"
  }
  // ...
  "simple-git-hooks": {
    "pre-commit": ". ./lint-staged-around",
    "pre-push": ". ./test-around"
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "prettier --write --loglevel=error",
      "eslint --fix --quiet"
    ],
    "src/**/*.{css,less,sass,scss}": [
      "stylelint --fix --quiet"
    ],
    "{public,src}/**/*.{html,gql,graphql,json}": [
      "prettier --write --loglevel=error"
    ]
  }
```

### Githooks への登録

`simple-git-hooks` コマンドは、 `package.json` の `"simple-git-hooks"` エントリから `pre-commit` や `pre-push` に対応するものを抽出、該当ファイルに書き出してくれる。

```zsh
$ npx simple-git-hooks
[INFO] Successfully set the pre-commit with command: . ./lint-staged-around
[INFO] Successfully set the pre-push with command: . ./test-around
[INFO] Successfully set all git hooks
```

### 削除したい時

`package.json` の `"simple-git-hooks"` エントリ から該当の設定を削除した上で `npx simple-git-hooks` を実行すると、自動的に Git hooks のスクリプトファイルが削除される。

## Monorepo の場合の Git-Hooks

1つのリポジトリの中に複数のプロジェクトを置いているケース。

### どうするか

リポジトリ内で JSX など の任意の種類のファイルに変更があったプロジェクトを抽出、そのディレクトリでコマンドを実行するシェルスクリプトを自力で書く。

例えば、 `lint-staged-around` というファイルをプロジェクトルートに置いた場合、 `package.json` は以下のようになる。

```json
"simple-git-hooks": {
  "pre-commit": ". ./lint-staged-around",
  "pre-push": ". ./test-around"
},
```

`lint-staged-around` は以下。

```shell
#!/bin/sh

# lint-staged-around
#   execute each lint-staged entry in sub-directories projects recursively
#
#   Riakuto! Project by Klemiwary Books

fileTypes="js|jsx|ts|tsx|html|css|less|sass|scss|gql|graphql|json"
target="src|public"

# detect git against tag
if git rev-parse --verify HEAD >/dev/null 2>&1
then
  against=HEAD
else
  # Initial commit: diff against an empty tree object
  against=$(git hash-object -t tree /dev/null)
fi

if [ "$(uname)" == "Darwin" ]; then
  sedOption='-E'
else
  sedOption='-r'
fi

# pick staged projects
stagedProjects=$( \
  git diff --cached --name-only --diff-filter=AM $against | \
  grep -E ".*($target)\/" | \
  grep -E "^.*\/.*\.($fileTypes)$" | \
  grep -vE "(package|tsconfig).*\.json" | \
  sed $sedOption "s/($target)\/.*$//g" | \
  uniq \
)

# execute each lint-staged
rootDir=$(pwd | sed $sedOption "s/\/\.git\/hooks//")

for project in ${stagedProjects[@]}; do
  echo "Executing $project lint-staged entry..."
  cd "$rootDir/$project"
  npx lint-staged 2>/dev/null
done
```

`test-around` は以下。

```shell
#!/bin/sh

# test-around
#   execute each test in sub-directories projects recursively
#
#   Riakuto! Project by Klemiwary Books

targetProjects=(
  "06-lint/04-advanced"
  "08-component/02-props"
  "08-component/03-state/01-class"
  "08-component/03-state/02-state"
  "08-component/04-lifecycle"
  "09-hooks/03-effect"
  "09-hooks/02-state"
  "09-hooks/03-effect"
  "09-hooks/04-memoize"
  "09-hooks/05-custom"
)

# execute each test
rootDir=$(pwd | sed -r "s/\/\.git\/hooks//")

for project in ${targetProjects[@]}; do
  cd "$rootDir/$project"
  CI=true npm test
done
```
