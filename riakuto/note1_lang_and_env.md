# 1. Hello, React!!

## Vue

Vueは MVVM (Model - View - ViewModel) からなる。MVCアーキテクチャに慣れ親しんでいる場合、Vueの方がとっつきやすい。

## Node.js

### Node.jsとは

Node.js = JavaScriptをPCのターミナル上で動かす事ができるようにするためのソフトウェア。
中の言語処理エンジンはGoogle chrome用のV8を流用している。

※ V8: Google製のオープンソースJavaScriptエンジン。ChromiumベースのブラウザやNode.jsなどのJavaScriptランタイムに採用されている。

### 必要性

- それなりの規模のアプリケーションになってくると、サードパーティ製のライブラリを複数使う。また、それらは相互に特定のバージョンに依存しあっていたりする。
パッケージのインストール、整合性の管理を担ってくれる**npm**を利用するために必要。
- JSやCSSを少数のファイルにまとめるバンドル
- ES6の構文をブラウザに対応した構文にコンパイル
- 開発時にローカルでサーバを立ち上げ、テストする
- テストツールや静的構文解析をローカルで実施する

### インストール

anyenv + nodenv によるインストールが推奨されている。
導入済みのため割愛。

なお、 `anyenv-update` と `nodenv-default-package` というプラグインが推奨されていた。

```zsh
mkdir -p $(anyenv root)/plugins
git clone https://github.com/znz/anyenv-update.git $(anyenv root)/plugins/anyenv-update
mkdir -p "$(nodenv root)"/plugins
git clone https://github.com/nodenv/nodenv-default-packages.git "$(nodenv root)/plugins/nodenv-default-packages"
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
npx create-react-app hello-react --template=typescript
```

`--template=typescript` はTypeScriptのためのテンプレート。

```zsh
yarn start
```

### バンドラとコンパイラ

CRAで作成したプロジェクトでは、ソースコードはBabelによりコンパイルされ、webpackによりバンドルされて適切な形にまとめられ、更にそれらが相互に関連付けられる。

***

アプリを管理するためのコマンドやスクリプト

***

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


# 2. The world of JavaScript

## プリミティブ vs オブジェクト

プリミティブ型は、オブジェクトではない、インスタンスメソッドを持たないデータ。
BigIntとSymbolはあまり使われない。

- Boolean
- Number
- BigInt
- String
- Symbol
- Null
- Undefined

## リテラルとラッパーオブジェクト

プリミティブ型の値を定義するときには、**リテラル**を使う。リテラル = 文字通り という意味。

JavaScriptの標準組み込みオブジェクトとして備わっているラッパーオブジェクトというものがある。
プリミティブ型の値に対してアクセスすると、値がラッパーオブジェクトに変換される。ラッパーオブジェクトはメソッドを持つため、あたかもプリミティブ型でメソッドを呼び出せるように見える。

## 文と式

文(Statement)とは、何らかの手続を処理系に命令するもの。
式(Expression)とは、評価された後に値として存在するもの。

変数に代入できるのが式、出来ないのが文。

### 文末のセミコロン

JavaScriptでは文の末尾にはセミコロンが必要。
だが、 `{}` のブロックで終わる場合は付けないという例外規則がある。
関数宣言や `if` の最後に付けないのそのため。

### 関数式と関数宣言

JavaScriptでは式・文のどちらを使っても関数を宣言できる。

```js
// 関数宣言
function foo(message) {
  console.log(message)
}

// 関数式
const foo = function(message) {
  console.log(message)
};
```

`const`で意図しない再代入を防ぐことができるので、関数式の方が推奨。

## 第一級オブジェクト

他のオブジェクト型の値と同様、変数へ代入したり、配列の要素やオブジェクトのプロパティ値にしたり、他の関数に引数として渡したり、別の関数の戻り値に設定出来たりする。
関数を第1級オブジェクトとして扱える性質を第一級関数とも言う。

## 無名関数

関数に名前をつけず定義すると、無名関数になる。
これは、名前がないためメモリに残らず、変数に代入されなければ定義した端から消滅する。

一方で、変数に代入されれば残る。
つまり、関数式による関数の定義というのは、無名関数を生成して、それを変数に代入することを指す。

```js
const foo = () => { console.log("hello, world"); };
```

## プロトタイプ vs クラス

オブジェクト指向には、プロトタイプベースとクラスベースの2種類がある。
JavaScriptはプロトタイプベース。

クラスベースにおけるクラスは、オブジェクトの抽象であり、実体を持たない。

プロトタイプベースでは、オブジェクトの抽象としてのクラスが存在しない。
オブジェクトは、**直接他のオブジェクトを継承する**。このときの継承元となったオブジェクトのことをプロトタイプと呼ぶ。
プロトタイプは、クラスと異なり実体を持つ。

## 分割代入とスプレッド構文

### プロパティ名のショートハンド

```js
> const key="bar"
> const baz=111111
// 変数をキーにしたり、値として展開したりできる
> const obj1 = { foo:123, [key]: 40096, baz: baz }
> obj1
{ foo: 123, bar: 40096, baz: 111111 }

// プロパティ名のショートハンド
// 変数名をキーに、変数の値を値に割り当てる
> const obj2 = { baz }
> obj2
{ baz: 111111 }
```

### 分割代入

```js
const [n, m] = [1, 4];
console.log(n, m); // 1 4

const obj = { name: 'Kanae', age: 24 };
const { name, age } = obj;
console.log(name, age) // => Kanae 24
```

少し複雑な例。 `response` の `data` プロパティの値を `users` に代入。
さらに、 `data` プロパティに値が存在しなかった場合に備えて `[]` をデフォルト値として設定している。

```js
const response = { data: [
{
id: 1,
name: 'Patty Rabbit',
email: 'patty@maple.town', },
{
id: 2,
name: 'Rolley Cocker',
email: 'rolley@palm.town', },
{
id: 3,
name: 'Bobby Bear',
email: 'bobby@maple.town', },
], };
const { data: users = [] } = response;
```

###　コレクションの中身を展開する(スプレッド構文)

本質的にはレストパラメータと同じ。

```js
const arr1 = ['A', 'B', 'C'];
const arr2 = [...arr1, 'D', 'E'];
console.log(arr2); // [ 'A', 'B', 'C', 'D', 'E' ]

const obj1={a:1,b:2,c:3,d:4};
const obj2 = { ...obj1, d: 99, e: 5 };
console.log(obj2); //{a:1,b:2,c:3,d:99,e:5}
```

こんな事もできる。

```js
const user = { id: 1,
name: 'Patty Rabbit', email: 'patty@maple.town', age: 8,
};
const { id, ...userWithoutId } = user;
console.log(id, userWithoutId);
// 1 { name: 'Patty Rabbit', email: 'patty@maple.town', age: 8 }
```

### コレクションのコピー

シャローコピーであることに注意。
再帰的にコピーしたい場合、https://lodash.com/docs/#cloneDeepなどを使う。

```js
const original = { a: 1, b: 2, c: 3 };

const copy = { ...original };
const assigned = { ...original, ...{ c: 10, d: 50 }, d: 100 };
```

## ショートサーキット評価

またの名を短絡評価。
`&&` や `||` といった論理演算子が左→右に評価される性質を利用し、右辺の評価を左辺の評価に委ねる記法。

```js
const hello = undefined || null || 0 || NaN || '' || 'Hello!';
const chao = '' && 100 && [] && {} && 'Chao!';

true&&console.log('1.',hello); //1.Hello!
false&&console.log('2.',hello); //(nooutput)
true || console.log('3.', chao); // (no output)
false||console.log('4.',chao); //4.Chao!
```

## Nullish Coalescing と OPtional Chaining

`??` が **Nullish Coalescing** 、 `?.` でつないでいる部分が **Optional Chaining**という記法。

```js
const users = [
  {
    name: 'Patty Rabbit', address: {
    town: 'Maple Town', },
  },
  {
    name: 'Rolley Cocker',
    address: {},
  },
  null,
];

for (u of users) {
  const user = u ?? { name: '(Somebody)' };
  const town = user?.address?.town ?? '(Somewhere)'; console.log(`${user.name} lives in ${town}`);
}
```

### `?.`

通常のプロパティアクセス演算子(`.` `[]`)では、指定したキーのプロパティが存在しなかった場合、
1階層目なら `undefined` を返すだけだが、2階層以上に渡る場合はタイプエラーになってしまう。

`?.` を使うと、途中のプロパティが存在しなかったらその時点で `undefined` を返してくれる。

例えば `user?.address?.town` と書いた場合、 `address` に `town` が存在しない場合や、 `address` がそもそも存在しない場合でもエラーにならず処理を継続で着る。

### `??`

**coalesce**には癒着する、合体するという意味がある。日本語で nullish coalescing は Null合体演算子。

この演算子は、左辺が `null` または `undefined` の場合だけ右辺が評価される。
OR演算子と異なる点は、 falsy な値の場合は評価されない点。

## `this`

JavaScriptにおける `this` は、**その関数が実行されるコンテキストであるオブジェクトへの参照が格納されている「暗黙の引数」**のこと。

Pythonの `self` とそこまで大きくは変わらない。ただそれが省略可能・外から `call` `apply` `bind` などにより設定可能というだけ。

### アロー関数の場合

例えばメソッド内で定義された関数は、ただの関数。
そのオブジェクトの実行コンテキスト内に無いため、 `this` を参照できない。

アロー関数式で定義すると、実行コンテキスト内の `this` を参照できる。
他にも `bind` で束縛する、 `apply` `call` で明示的に呼び出す、など。

### `this` の挙動への対処

- `this` はクラス構文内でしか使わない
- クラス構文内では、メソッドを含むあらゆる関数の定義をアロー関数式で行う

これにより、 `this` は他のオブジェクト指向言語に慣れた人間が期待する動作になる。

## webpack

CRAで作成されたプロジェクトは、Babelやwebpackが隠蔽されている。
webpackというのは、モジュールバンドラの一種。

ES Modules、CommonJS、AMDを含めた様々なモジュール構文をサポートしていて、使われている構文を自動で検出・適切に解釈してくれるので、異なるモジュール構文が混在していても依存関係を解決してバンドルしてくれる。

### ローダ

WebpackがデフォルトでサポートしているのはJavaScriptのみだが、ローダというモジュールを組み込むことでJSONやCSS、画像ファイルなども扱えるようになる。

### バンドラのお仕事

バンドル = 束ねる、塊など。

- モジュールの依存関係を解決して1つのファイルにまとめる
- Minifyする(空白やコメントの削除、変数名の短縮など)
- Tree Shaking(どこからも参照されていないモジュールを検出してバンドル対象から外し、出力ファイルの容量を削減すること)
- 画像データのインライン埋め込み
- コード分割
- キャッシュ管理

## モジュールの集約

`import` するときは、1つのファイルに一旦全て `export` して、そこから `import` するようにすれば記述量が少なく、スッキリ書けるようになる。
