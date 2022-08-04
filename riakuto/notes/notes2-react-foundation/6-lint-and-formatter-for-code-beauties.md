# 6. Lintとフォーマッタでコード美人に

# 6-1. ESLint

## JavaScript、TypeScriptにおけるLinterの歴史

### Linterとは

コードを静的解析してコンパイルで弾かれない潜在的なバグを警告するもの

### コードフォーマッタ

インデントや改行などのスタイルを一律に自動整形してくれるもの

### Lint とは

lintはそもそもC言語のソースコードに対して、コンパイラよりも詳細かつ厳密なチェックを行うプログラムとして開発され、初期のUNIXにコマンドとして装備されていた。
その機能が、放っておくと故障の原因となる糸くずを片っ端から絡め取る乾燥機の糸くずフィルター「link tarp」に似ていたことからそう名付けようとしたが、当時のUNIXでは4文字以上の命令が使えなかったため「lint」と命名された。

そこから転じて、Cに限らずコードを解析して構文チェックを行うことを「lint」と動詞化して表現されるようになり、さらにそのプログラムは「linter」と呼ばれるようになった。

## 任意のnpmパッケージが依存しているものを調べる

`npm info パッケージ名 peerDependencies` でリストアップされる。
また、npm公式サイトの該当ページにもインストール方法が書いてあるのでそれを参考に。

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

「追加でパッケージをDLするか」に対してNoを選択した場合(パッケージマネージャを統一したい場合など)、以下のパッケージをインストールする。

```shell
$ yarn add -D eslint-plugin-react @typescript-eslint/eslint-plugin \
eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y \
eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser

$ typesync
$ yarn
```
