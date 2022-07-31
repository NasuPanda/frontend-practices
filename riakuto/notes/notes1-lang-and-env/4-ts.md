# 4. TypeScript

## TypeScriptがイケイケな理由

- 静的型付け
- 型推論
- Null安全性

といった、最近のプログラミング言語のトレンドを抑えている点が大きい。

一昔前は型定義が必要ないLL(軽量言語)がトレンドだった。
しかし、型推論、Null安全性、モダンなIDEによるDXの向上により、堅牢なコードを効率的に書ける静的型付け言語のアドバンテージが勝る場面が増えてきた。

## 概要

大規模なアプリケーション開発のために作られた、JavaScriptに静的型付けの型システムとクラスベースのオブジェクト指向を加えた完全上位互換の言語。

### 開発元

開発元はMicrosoft。
また、 C# や .NET Frameworkの設計者である Anders Hejlsberg が最初期から開発に携わっている。

### 実行環境

ローカルでは、ts-nodeが一般的。
Deno でも直接実行できる。

ブラウザで実行したいときは [TypeScript: プレイグラウンド - TypeScriptとJavascriptを探求するためのオンラインエディタ](https://www.typescriptlang.org/ja/play) や [RunKit + npm: typescript](https://npm.runkit.com/typescript) を使うと良い。

## 設定

`tsconfig.json` に記述する。

- `noImplicitAny` : `true` にすると引数の型定義が必須になる(デフォルトでは指定がない場合 `any` が割り当てられる)

## 基本的な型

### 型アノテーションと型推論

```ts
const n: number = 123;
const s: string = '456';

// コンパイラが文脈から型を推測できる場合、型アノテーションは省略可能
const n_2 = 123;
const s_2 = '456'

// エラーが出る
s * 3
// 実行できる
n * s // => '123456'
```

### プリミティブ型

TypeScriptの型システムはJavaScriptのプリミティブ型を抱合する形になっている。

- Boolean 型 ...... `true` および `false` の 2 つの真偽値を扱うデータ型。型名は `boolean`
- Number 型 ...... 数値を扱うためのデータ型。型名は `number`
- BigInt 型 ...... number 型では表現できない大きな数値(253 以上)を扱う型。型名は `bigint`
- String 型 ...... 文字列を扱うためのデータ型。型名は `string`
- Symbol 型 ......「シンボル値」という固有の識別子を表現する値の型。型名は `symbol`
- Null 型 ...... 何のデータも含まれない状態を明示的に表す値。型名は `null`
- Undefined 型 ......「未定義」であることを表す値。型名は `undefined`

### 配列

配列の場合。
型名の後ろに `[]` をつけると、その型の配列になる。(推奨)
`Array` で定義することもできる。

```ts
const numArr: number[] = [1, 2, 3];
const strArr: Array<string> = ["one", "two"];
```

### オブジェクト: インターフェース

オブジェクトの場合。
`object` という型名があるものの、 `Object` はプリミティブ型以外のすべてのオブジェクトのプロトタイプになっているので、型注釈として使うには広すぎる。

狭義のオブジェクトを定義する場合、プロパティのキー名と値の型を明記する。

```ts
const red: {rgb: string, opacity: number} = {rgb: 'ff0000', opacity: 1}
```

毎回インラインで書くのは面倒。
そこで、**インターフェース**によりオブジェクトの型に名前を付けれるようになっている。

```ts
// インターフェースの利用
interface Color{
  readonly rgb: string;
  opacity: number;
  name?: string;
}
const turquoise: Color = {rgb: '00afcc', opacity: 1};
turquoise.name = 'Turquoise Blue';
// turquoise.rgb = '03c1ff'; => error
```

### インターフェース: インデックスシグネチャ

任意のキーのプロパティ値を定義することもできる。
これは**インデックスシグネチャ**というもので、キーに使えるのは文字列と数値の2種類のみ。

```ts
interface Status {
  level: number;
  maxHP: number;
  maxMP: number;
  [attr: string]: number;
}

const myStatus: Status = {
  level: 99,
  maxHP: 999,
  maxMP: 999,
  attack: 999,
  defense: 999,
}
```

### 列挙型: Enum型とリテラル型

列挙型を表現するには、まず、`enum`型が用意されている。

```ts
enum Pet { Cat, Dog, Rabbit }
console.log(Pet.Cat, Pet.Dog, Pet.Rabbit)
// 0 1 2
```

実体は数値。
そのため、以下のようなことも出来てしまい、型安全が保証されない。

```ts
Tom = Pet.Dog;
Tom = 12;
console.log(Tom); // => 12
```

上のような問題は文字列enum (バージョン2.4~)を使えば解決する。

```ts
// 文字列enum
enum StrPet {
  Cat = 'Cat',
  Dog = 'Dog',
  Rabbit = 'Rabbit',
}
let Tom: Pet = Pet.Cat;
// Tom = 'Hamster'; // => Error
// Tom = 'Dog';     // => Error(文字列DogはPet.Dogと同一ではない)
```

***

もう一つはリテラル型。
単独のリテラル型(文字通りの意で使われている) + 演算子 `|` により、あたかも列挙型のように扱える。

```ts
// リテラル型
{
  let Tom: 'Cat' = 'Cat';
  // Tom = 'Dog' // => Error

  let Mary: 'Cat' | 'Dog' | 'Rabbit' = 'Cat';
  Mary = 'Rabbit';
  // Mary = 'Parrot'; // => Error
}
```

なお、文字列リテラルだけでなく数値リテラルも使える。

### タプル型

タプル型とは、個々の要素の型と、その順番や要素数に制約を設けられる特殊な配列の型。

用途は主に以下の2つ。

1. 型と順番と個数だけが決まっているもの = 関数の引数に使う
2. API関数の戻り値としてタプルを設定、分割代入で必要な値を抽出してもらう

```ts
{
  // ケース1
  const charAttrs: [number, string, boolean] = [1, 'party', true];
  // レストパラメータが使える
  const spells: [number, ...string[]] = [7, 'heal', 'sizz', 'snooz'];

  // ケース2
  const userAttrs: [number, string, boolean] = [1, 'party', true];
  const [id, username, isAdmin] = userAttrs;
  console.log(id, username, isAdmin)
}
```

### Any, Unknown, Never

`any` はありとあらゆる型の値を受け付ける。

JSONファイルをパースしてそのままオブジェクトとして使う場合など、どうしても一律の型を割り当てるのが難しい場合に使う。
問題点として、タイプエラーを起こしていてもコンパイルが通ってしまう事がある点が挙げられる。
基本的には後述の `unknown` を使うべき。

```ts
{
  const str = `{ "id": 1, "username": "patty" }`;
  const user = JSON.parse(str);
  // コンパイルが通ってしまうが、 user.address.zipCodeは存在しないのでタイプエラーを吐く。
  console.log(user.id, user.address.zipCode);
}
```

`unknown` は `any` の型安全版。

下のサンプルにおいて、`user.id` のように動作する箇所もコンパイルに通らない。
**型ガード**と呼ばれる手法に使う。

```ts
{
  const str = `{"id": 1, "username": "john_doe"}`;
  const user: unknown = JSON.parse(str);
  // console.log(user.id, user.address.zipcode); // => アクセスされるプロパティの型を特定しなければ動作しない
}
```

`never` は何も代入できない値。

使用例として、 `case` 文の漏れ検証など。
下のサンプルにおいて、 `case` 文を一つでも消すとエラーを吐く。
なぜなら、 `friend` の型に指定されているリテラルのいずれも `check` ( `never` )には代入できないから。

```ts
const greet = (friend: 'Serval' | 'Caracal' | 'Cheetah') => {
  switch (friend) {
    case 'Serval':
      return `Hello, ${friend}!`;
    case 'Caracal':
      return `Hi, ${friend}!`;
    case 'Cheetah':
      return `Hiya, ${friend}!`;
    default: {
      const check: never = friend;
      }
  }
};
console.log(greet('Serval')); // Hello, Serval!
```

## 関数とクラスの型

## 関数の型定義

何も返さない場合は `void` を指定する。それ以外は普通。

```ts
// function declaration statement
{
  function add(n: number, m: number): number {
    return n + m;
  }
}

// function keyword expression
{
  const add = function(n: number, m: number): number {
    return n + m;
  };
}

// arrow function expression
{
  const add = (n: number, m: number): number => n + m;
  // type void when return none
  const hello = (): void => {
    console.log('hello');
  };
}
```

### 関数の型定義: 呼び出し可能オブジェクト

呼び出し可能オブジェクト(Callable)として定義する方法もある。

```ts
// callable by interface
{
  interface NumOp {
    (n: number, m: number): number;
  }

  const add: NumOp = function(n, m) {
    return n + m;
  };
  const subtract: NumOp = (n, m) => n - m;
}

// callable by allow inline
{
  const add: (n: number, m: number) => number = function(n, m) {
    return n + m;
  };
  const subtract: (n: number, m: number) => number = (n, m) => m - m;
}
```

前者がインターフェース、後者がアロー型アノテーションによりインラインで定義する方法。
インラインは可読性が低いので、あまり使われない。

### 関数の型定義: ジェネリクスの利用

`T` は型引数(Type Parameter)。
関数に渡す引数と同じく、任意の型を `<>` によって引数として渡すことで、その関数の引数の型や戻り値の型に適用できるようになる。

次に示す例では型推論により① `number` ② `string` ③統一されていないためエラー となっている。

```ts
const toArray = <T>(arg1: T, arg2: T) => [arg1, arg2];

toArray(1, 2)         // [1, 2]
toArray('foo', 'bar') // ['foo', 'bar']
toArray(1, 'foo')     // Error
```

データの方に束縛されないように型を抽象化することでコードの再利用性を向上させつつ、静的型付け言語の持つ型安全性を維持する手法を **ジェネリックプログラミング** と呼ぶ。
そして、型引数を用いて表現するデータ構造のことを**ジェネリクス**と呼ぶ。

型引数の名前に大文字1文字を使うのは、他言語でも共通する慣例。
1つ目が type の頭文字 `T` で、2つ目がアルファベット順に `U` のときもあれば、意味をもたせてkeyの頭文字 `K` のように使うこともある。


可変長引数も利用可能。

```ts
const toArray = <T>(...args: T[]): T[] => [...args];

toArray(1, 2, 3)       // [1, 2, 3]
toArray(1, 2, 3, 4, 5) // [1, 2, 3, 4, 5]
// toArray(1, 'foo')   // Error
```

## クラスの型定義

```ts
class Rectangle {
  // プロパティ初期化子(Property Initializer)
  readonly name = 'rectangle';
  sideA: number;
  sideB: number;
  constructor(sideA: number, sideB: number) {
    this.sideA = sideA;
    this.sideB = sideB;
  }
  getArea = (): number => this.sideA * this.sideB;
}
```

- TypeScriptのクラスにおけるメンバー変数は、ES2015と異なりクラスの最初で宣言しておく必要がある
- プロパティ初期化子という機能(上の例では `name` )を使い、プロパティ値を初期化できる。
- アクセス修飾子をつけることでメンバーへのアクセシビリティを制御できる。

### クラス: アクセス修飾子

- `public` ...... 自クラス、子クラス、インスタンスすべてからアクセス可能。デフォルトでは全てのメンバーがこの `public` になる
- `protected` ...... 自クラスおよび子クラスからアクセス可能。インスタンスからはアクセス不可
- `private` ...... 自クラスからのみアクセス可能。子クラスおよびインスタンスからはアクセス不可

### クラス: 補足 継承より合成

最近トレンドの言語であるGoやRustは、そもそも実装を伴った継承が存在しない。
これは、現在では**継承そのものを避け、独立性を固めた部品を組み合わせる設計をすべき**という認識が広まりつつあるため。

継承の主な問題点を以下に示す。

- 暗黙の内に不必要な公開メンバー変数を継承してしまい、バグの芽になりかねない
- 子クラスが親クラスに強く依存するため、親の変更が子孫に影響する範囲を予測することが難しい。親の実装を不用意に変更できない
- 親と子で名前空間を共有しているせいで、責任の境界線が曖昧になりがち

合成では、それぞれのクラスを独立したただの部品、APIとして扱う。

- 開発者はクラス内部の実装を知る必要はなく、ただそのAPIとしての入出力の仕様を知っていればいい
- 依存がないゆえに、使用しているクラス内部の変更に影響されにくく、個々のモジュールの独立性が高い

### クラス: インターフェースの利用

クラスの型を抽象化して定義する方法が2つ。

まず `abstract` を使って抽象クラスを定義するもの。
抽象クラスとは、それ自身がインスタンスを生成できず、継承されることを前提としたクラス。
抽象クラスはその定義に実装を含むことが出来てしまう。実装を伴った継承ができてしまうため、あまり使うべきではない。

そこで、2つ目の選択肢であるインターフェースを使う。
`implements` キーワードにより、そのクラスがどのインターフェースの実装なのか示す。

```ts
interface Shape {
  readonly name: string;
  getArea: () => number;
}

interface Quadrangle {
  sideA: number;
  sideB?: number;
  sideC?: number;
  sideD?: number;
}

class Rectangle implements Shape, Quadrangle {
  readonly name = 'rectangle';
  sideA: number;
  sideB: number;

  constructor(sideA: number, sideB: number) {
    this.sideA = sideA;
    this.sideB = sideB;
  }

  getArea = (): number => this.sideA * this.sideB;
}
```

ここでは `getArea` の定義にアロー構文を使っているが、 `getArea(): number` という書き方もできる。
この2つには微妙な差分があり、アロー構文だと **オーバーロード** が出来ない。

### クラス: インターフェース型宣言 / コンストラクタ関数の宣言

TypeScriptでクラスを定義すると、実際には2つの宣言が同時にされる。

1. クラスインスタンスのインターフェース型宣言
2. コンストラクタ関数の宣言

そのため、
型のコンテキストではインターフェース型宣言として、
通常のコンテキストではコンストラクタ関数として扱われる。

```ts
class Point {
  x: number = 0;
  y: number = 0;
}

// インスタンスの生成(コンストラクタ関数)
const pointA = new Point();

// 変数の型として適用(インターフェース型宣言)
const pointB: Point = { x: 2, y: 4 };

// インターフェースの拡張元(インターフェース型宣言)
interface Point3d extends Point {
  z: number;
}

const pointC: Point3d = { x: 5, y: 5, z: 10 }
```

なお、通常のインターフェースの拡張は以下の様に書く。

```ts
interface Point {
  x: number;
  y: number;
}
interface Point3d extends Point {
  z: number
}
const point: Point3d = { x: 5, y: 5, z: 10 }
```

## 型の名前と型合成

### 型エイリアス vs インターフェース

オブジェクト・クラスの型定義ができるインターフェースとは別に、任意の方に別名を与えて再利用できる **型エイリアス** という機能がある。

```ts
type Unit = 'USD' | 'EUR' | 'JRY' | 'GBP';

type TCurrency = {
  unit: Unit;
  amount: number
};

interface ICurrency {
  unit: Unit;
  amount: number;
}

const priceA: TCurrency = { unit: 'JRY', amount: 1000 };
const priceB: ICurrency = { unit: 'JRY', amount: 1000 };
```

型エイリアスは `type` で定義する。

最初の行では文字列リテラル型を新規に定義しているように見えるが、これは新規定義というより関数式などと同じく、
無名の文字列リテラル型にそれを参照するための別名 `Unit` を与えているイメージ。

型エイリアスとインターフェースには以下のような違いがある。

- VSCodeの注釈の表示
  - インターフェースは名前のみ表示
  - 型エイリアスの場合内部構造まで表示
  - 型エイリアスの構文はあくまでも無名の型に参照用の別名を付けるものなので、この型には本来の名前がないため。
- 拡張に対して
  - インターフェースは拡張に対してオープン
  - 型エイリアスは拡張出来ない
- 機能面
  - 型エイリアスはマップ型や条件付き型といった高度な型構文を記述できるが、インターフェースでは出来ない。

昔はインターフェースの方ができることが多く推奨されていたが、今では型エイリアスの方が便利に使える場面が多い。
そのため、**型エイリアスで統一すると良い**。

```ts
// 補足 インターフェースの拡張
interface User {
  name: string;
}
// Userにageが追加されてしまう
interface User {
  age: number;
}
```

### 共用体型と交差型 (型の組み合わせ)

TypeScriptでは、既存の型を組み合わせてより複雑な型を表現できる。

まず、共用体型(Union Types)。

```ts
// union-type
{
  let id: number | string = 20;
  id = 'abcdefg-1234567';
}
```

演算子 `|` で型を並べることで、それらの内いずれかの型が適用される複合的な型になる。

本来リテラル型は `dog` や `3.14` などの値に決め打ちで限定する方だが、共用体型と組み合わせることで列挙型のように扱う事ができる。(= 文字列リテラル型、正式には文字列リテラル共用体型と呼ぶべき )

オブジェクト型も共用体型に適用できる。

```ts
type A = {
  foo: number;
  bar?: string;
}
type B = { foo: string };
type C = { bar: string };
type D = { bar: boolean };

type AorB = A | B; // { foo: number | string; bar?: string }
type AorC = A | C; // { foo: number, bar?: string or bar: string }
type AorD = A | D; // { foo: number, bar?: string or bar: boolean }
```

次に、交差型 (Intersection Types)。
共用体型が **AまたはBと適用範囲を増やしていく** のに対し、交差型は **AかつBと複数の型を一つに結合させるもの**。
用途としては、もっぱらオブジェクト型の合成に使われる。

※ プリミティブでは使わない。なぜなら、 `string` かつ `number` のような値は存在しないため。

```ts
type A = { foo: number };
type B = { bar: string };
type C = {
  foo?: number;
  baz: boolean;
}

type AnB = A & B; // {foo: number, bar: string}
type AnC = A & C; // {foo: number, baz: boolean}

// CnA or CnB になる
type CnAorB = C & (A | B); // { foo: number, baz: boolean } or { foo?: number, bar: string, baz: boolean }
```

内部のプロパティの方が一つずつマージされるイメージ。
`AnC` の `foo` プロパティのように、任意と必須が交差した場合は必須のほうが優先される。
もしも同じプロパティで共通点がないものが指定されれば、 `never` 型になる。

`&` を使うとインターフェースの拡張と同じ動作を実現できる。

```ts
type Unit = 'USD' | 'EUR' | 'JPY';
interface Currency {
  unit: Unit;
  amount: number;
}

// I/Fによる拡張
interface IPayment extends Currency {
  date: Date;
}
// 型エイリアスによる拡張
type TPayment = Currency & {
  date: Date;
}
```
