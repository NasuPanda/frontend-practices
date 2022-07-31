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
