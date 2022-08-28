# 2. The world of JavaScript

# JavaScriptのデータ型

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

# 文と式

文(Statement)とは、何らかの手続を処理系に命令するもの。
式(Expression)とは、評価された後に値として存在するもの。

変数に代入できるのが式、出来ないのが文。

## 文末のセミコロン

JavaScriptでは文の末尾にはセミコロンが必要。
だが、 `{}` のブロックで終わる場合は付けないという例外規則がある。
関数宣言や `if` の最後に付けないのそのため。

# 関数

## 関数式と関数宣言

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

## さまざまな引数

デフォルト引数、レストパラメータ、名前付きレストパラメータ。

```js
// デフォルト引数
const raise = (n, m = 2) => n ** m;
console.log(raise(2, 3)); // 8
console.log(raise(3)); // 9

// Rest Parameters (レストパラメータ、残余引数)
const showNames = (a, b, ...rest) => {
  console.log(a);
  console.log(b);
  console.log(rest);
};

showNames("Alice", "Bob", "Chris", "Daisy", "Eric");
// Alice
// Bob
// 残り

// レストパラメータに名前を付ける
// NOTE: 溢れたものは捨てられる
const sum = (i, ...[j, k, l]) => i + j + k + l;

console.log(sum(1, 2, 3, 4)); // 10
console.log(sum(1, 1, 1, 1)); // 4
```

### 引数の順番

JavaScriptではデフォルト引数の設定は複数の引数のどれに対しても可能だが、デフォルト値の設定がある引数は後ろから置いていくべき。
なぜなら関数の設計として、重要な引数ほど前に持ってくるべきだから。



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

# クラス

## クラスの定義

```js
class Bird {
  constructor(name) {
    this.name = name;
  }

  chirp = () => {
    console.log(`${this.name}が鳴きました`);
  };

  static explain = (name) => {
    console.log(`${name}は翼があって卵を生みます`);
  };
}

class FlyableBird extends Bird {
  constructor(name) {
    super(name);
  }

  fly = (meter) => {
    console.log(`${this.name}が${meter}m 飛びました`);
  };
}

const penguin = new Bird("ペンギン");
penguin.chirp();

Bird.explain("カラス");

const hawk = new FlyableBird("タカ");
hawk.fly(10000);
```

## プロトタイプベース vs クラスベース

オブジェクト指向には、プロトタイプベースとクラスベースの2種類がある。
JavaScriptはプロトタイプベース。

クラスベースにおけるクラスは、オブジェクトの抽象であり、実体を持たない。

プロトタイプベースでは、オブジェクトの抽象としてのクラスが存在しない。
オブジェクトは、**直接他のオブジェクトを継承する**。このときの継承元となったオブジェクトのことをプロトタイプと呼ぶ。
プロトタイプは、クラスと異なり実体を持つ。

### プロトタイプチェーン

JavaScriptでは、プロトタイプチェーンにより継承を実現する。

例えば、メソッドが呼び出されたときの動作。

1. メソッドを呼び出したインスタンスの元となったオブジェクトにそのメソッドが存在するか判定し、存在すれば呼び出す
2. 存在しなかった場合、オブジェクトの `__proto__` を参照し( = 親オブジェクト )、メソッドが存在するか判定、存在すれば呼び出す
3. 存在しなかった場合、親オブジェクトの `__proto__` を参照し、 ...
4. プロトタイプチェーンは、最後には必ず `null` に到達する。`null` に到達するまでにメソッドが存在しない場合、 `undefined` を返す。

## コンストラクタ関数の正体

コンストラクタ関数というのは、それぞれに設定されているプロトタイプオブジェクトを継承し、新しくオブジェクトインスタンスを生成するための関数。
組み込みオブジェクトの `Array` や `String` , `class` で宣言したクラスなども、全てコンストラクタ関数。

```js
class Bird {
  constructor(name) {
    this.name = name;
  }
  // 省略...
}

console.log(new Array(1, 2, 3));
console.log(typeof Array); //function => コンストラクタ関数

console.log(new String("JavaScript"));
console.log(typeof String); //function => コンストラクタ関数

console.log(typeof Bird); //function => コンストラクタ関数
```

### クラス構文を関数で表現してみる

```js
// 関数としてBirdクラスを宣言
function Bird(name) {
  this.name = name;
  this.chirp = function () {
    console.log(`${this.name}が鳴きました`);
  };
  return this;
}

// 拡張してみる
Bird.explain = function (name) {
  console.log(`${name}は卵を生むかもしれません`);
};

// 継承してみる
function FlyableBird(name) {
  Bird.call(this, name);
  this.fly = function () {
    console.log(`${this.name}がとんだ`);
  };

  return this;
}

// 動作確認
const penguin = new Bird("ペンギン");
penguin.chirp();

Bird.explain("カラス");

const hawk = new FlyableBird("タカ");
hawk.fly();
```

# 配列やオブジェクトの便利な構文


## プロパティ名のショートハンド

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

## 分割代入

`obj1 = { foo: "123" }` の時、 `{ foo } = obj1` とすると、 変数 `foo` には `123` が入る。

つまり、 `{ 変数1, 変数2, ... } = オブジェクト` と書いた時、 変数名 == オブジェクトのキー名 なら、 `{}` 内の変数にそのキーの値が代入されるということ。

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
  ],
};

const { data: users = [] } = response;
```

### コレクションの中身を展開する(スプレッド構文)

本質的にはレストパラメータと同じ。

```js
const arr1 = ['A', 'B', 'C'];
const arr2 = [...arr1, 'D', 'E'];
console.log(arr2); // [ 'A', 'B', 'C', 'D', 'E' ]

const obj1={a:1, b:2, c:3, d:4};
const obj2 = { ...obj1, d: 99, e: 5 };
console.log(obj2); //{a:1,b:2,c:3,d:99,e:5}
```

こんな事もできる。

```js
const user = {
  id: 1,
  name: 'Patty Rabbit',
  email: 'patty@maple.town',
  age: 8,
};

const { id, ...userWithoutId } = user;
console.log(id, userWithoutId);
// 1 { name: 'Patty Rabbit', email: 'patty@maple.town', age: 8 }
```

### コレクションのコピー

シャローコピーであることに注意。
再帰的にコピーしたい場合、https://lodash.com/docs/#cloneDeep などを使う。

```js
const original = { a: 1, b: 2, c: 3 };

const copy = { ...original };
const assigned = { ...original, ...{ c: 10, d: 50 }, d: 100 };
```

# 式と演算子で短く書く

## ショートサーキット評価

またの名を短絡評価。
`&&` や `||` といった論理演算子が左→右に評価される性質を利用し、右辺の評価を左辺の評価に委ねる記法。

```js
const hello = undefined || null || 0 || NaN || '' || 'Hello!';
const chao = '' && 100 && [] && {} && 'Chao!';

true&&console.log('1.',hello); //1.Hello!
false&&console.log('2.',hello); //(no output)
true || console.log('3.', chao); // (no output)
false||console.log('4.',chao); //4.Chao!
```

## Nullish Coalescing と Optional Chaining

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

### `?.` : Optional Chaining

通常のプロパティアクセス演算子(`.` `[]`)では、指定したキーのプロパティが存在しなかった場合、
1階層目なら `undefined` を返すだけだが、2階層以上に渡る場合はタイプエラーになってしまう。

`?.` を使うと、途中のプロパティが存在しなかったらその時点で `undefined` を返してくれる。

例えば `user?.address?.town` と書いた場合、 `address` に `town` が存在しない場合や、 `address` がそもそも存在しない場合でもエラーにならず処理を継続で着る。

### `??` : Nullish Coalescing

*coalesce* には癒着する、合体するという意味がある。日本語で *nullish coalescing* は Null合体演算子。

この演算子は、左辺が `null` または `undefined` の場合だけ右辺が評価される。

OR演算子と異なる点は、 falsy な値というだけでは評価されない点。
明示的に `null` や `undefined` を対象にしたい場合に使う。

# `this` を理解する

## `this` とは

`this` は、呼び出し側から引き渡される引数だと考えると分かりやすい。
JavaScriptにおける `this` は、**その関数が実行されるコンテキストであるオブジェクトへの参照が格納されている「暗黙の引数」**のこと。

Pythonの `self` とそこまで大きくは変わらない。

Pythonと異なる点は、

- 省略可能
- メソッド以外の関数にも `this` が引き渡される
- 外から `call` `apply` `bind` などにより設定可能

## `this` の挙動

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    const doIt = function () {
      // ここからでは this.name を参照できない
      console.log(`Hi, ${this.name}`);
    };
    doIt();
  }
}
```

上のサンプルではエラーが発生する。
何故なら、メソッド内で定義された関数はそのオブジェクトの実行コンテキスト内になく、引き渡される `this` が存在しないため。
strictモードの場合は `undefined` になる。

### 対処方法

対処方法は5つ。

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet1() {
    const doIt = function () {
      console.log(`Hi, ${this.name}`);
    };
    const bindedDoIt = doIt.bind(this);
    bindedDoIt(); // bind で this を束縛
  }

  greet2() {
    const doIt = function () {
      console.log(`Hi, ${this.name}`);
    };
    doIt.call(this); // this を指定
  }

  greet3() {
    const _this = this; // 変数 _this に値を移す

    const doIt = function () {
      console.log(`Hi, ${_this.name}`);
    };
    doIt();
  }

  greet4() {
    const doIt = () => {
      console.log(`Hi, ${this.name}`);
    }; // アロー関数で定義
    doIt();
  }

  // メソッド自体アロー関数で定義
  greet5 = () => {
    const doIt = () => {
      console.log(`Hi, ${this.name}`);
    };
    doIt();
  };
}
```

### 推奨の対処方法: アロー関数

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
