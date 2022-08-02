# 3. Functional programming

## 何が嬉しい?

関数型プログラミングは、関数の参照透過性が保たれている。
そのため、処理に副作用を伴いにくく、安全なコードが書ける。

また、宣言型のプログラミングである。
そのため、変数がイミュータブル。処理がミュータブルな変数に依存する場合と比べて、コードが安全。

## 関数の参照透過性

関数型プログラミングの文脈における**関数**は、数学の関数と同じもの。

数学の関数は、与えた引数が同じなら返る値は常に一定。
そういった同じ入力に対して同じ作用・同じ出力が保証されていることを**参照透過性**と呼ぶ。

## 命令型 vs 宣言型

命令型は、最終的な出力を得るために状態を変化させる連続した文により記述されるスタイル。
ステップ順にその指示に従っていけば、目当ての処理ができるイメージ。

宣言型は、出力を得る方法ではなく、出力の性質・あるべき状態を文字通り宣言することでプログラムを構成する。
具体的には、SQLが当たる。SQLのクエリは**どのようにDBにアクセスしてデータを取得してくるか**という手続きではなく、**どんなデータが欲しいかを宣言する**ことで出力が得られる。

宣言型で複雑な処理を行わせるための解の一つが関数型プログラミング。
出力のあるべき状態を数学的に定義していくことでプログラムを書いていく。

### 不変性と可変性

```js
// Procedural
const octuples = [];

for (let n = 1; n < 101; n += 1) {
  if (n % 8 == 0) {
    octuples.push(n);
  }

  console.log(octuples);
}

// Functional
// NOTE
// new Array(n)は長さnの配列を生成する。
// keys()を配列に対して実行するとインデックスを返す?
range = (start, end) => [...new Array(end - start).keys()].map((n) => n + start);
console.log(range(1, 101).filter((n) => n % 8 === 0));

```

関数型は変数に対して一度も再代入や破壊的変更がなされていない。(不変性: Immutability)
それに対して、手続き型は破壊的変更及び再代入が行われている。(可変性: Mutability)

可変性の問題点は、ミュータブルな変数に依存する処理が多ければ多いほどにプログラムの予測可能性が低下し、バグが入り込みやすくなる点。

### 式と文

手続き型が文を多用する一方、関数型では式を組み合わせてプログラムを構成する。

手続き型では値を返さない処理が多くある。
関数型では全てが値を返す式の組み合わせで、それが左辺から右辺へ評価されていき、最終的な値に到達する。
そのため、コードがシンプルになる。

### 全体から構成 vs ボトムアップ

手続き型ではボトムアップ的に積み上げていき、最終成果物を完成させる。
一方関数型では、最初から完成形を見据えた上で大雑把なところから絞り込んでいく形になる。

## コレクションの反復処理

基本となるのはコレクションの反復処理。
`./works/3-fp/iterate.js`を参照。

### `reduce`

reduceの語源は re(再び、元に) + duce(導く)。
第1引数に前回の処理の返り値が入り、第2引数には配列の要素が入る。

### 破壊的メソッドを非破壊的に使う

JavaScriptではRubyのように破壊的メソッドであることの明示がない。

破壊的メソッドを非破壊的メソッドのように扱うには、 `slice` メソッドを挟むと良い。
`slice` は配列から任意の葉にをシャローコピーして返すメソッド。引数を省略すると配列全体のコピーを返す。

```js
arr = [1, 5, 3];
arr.slice().sort((n, m) => n < m ? -1 : 1);
```

## オブジェクトの反復処理

`Object.keys` など、 `Object` が持つメソッドを使う。
それぞれプロパティのキー、値、キー・値のペアの配列を返す。

```js
// オブジェクトの反復処理
const user = {
  id: 3,
  name: "Alice",
  username: "Alice",
  email: "alice@apple.com"
}

console.log(Object.keys(user))
console.log(Object.values(user))
console.log(Object.entries(user))
```

***

## 関数型プログラミング

JavaScriptは第一級関数をサポートしている。
そのため、支障がないレベルで関数型プログラミングを行う事ができる。

関数型プログラミングのパラダイムでは主に次のようなことを行う。

1. 名前を持たないその場限りの関数(無名関数)を定義できる
2. 変数に関数を代入できる
3. 関数の引数として関数を渡したり、戻り値として関数を返すことができる(高階関数)
4. 関数に特定の引数を固定した新しい関数を作ることができる(部分適用)
5. 複数の高階関数を合成してひとつの関数にできる(関数合成)

### 高階関数

引数に関数を取ったり、返り値に関数を返したりする関数。
`map` に渡す無名関数や、コールバックは引数として渡される関数。

関数を返す関数の場合、関数内部で宣言する関数に名前を付ける必要はない。
そのため、無名関数として定義することが多い。以下のように書ける。

```js
const greeter = (target) => () => console.log(`Hi, ${target}!)`);
```

## カリー化

Haskell Curryという数学者・論理学者の名前を元にしている。
Haskellは純粋関数型言語。
Haskell Curryさん = 関数型プログラミングと言っても過言。

カリー化とは、**複数の引数を取る関数を、より少ない引数を取る関数に分割して入れ子にすること**を指す。

```js
// Pre-curried
{
  const multiply = (n, m) => n * m;
  console.log(multiply(2, 4));
}

// Curried
{
  const withMultiple = (n) => {
    return (m) => n * m
  }
  console.log(withMultiple(2)(4));
}

// Curried with double arrow
{
  const withMultiple = (n) => (m) => n * m;
  console.log(withMultiple(2)(4));
}
```

### カリー化による部分適用

カリー化は**部分適用**に使う。
部分適用とは、特定の引数を固定した新しい関数を作ること。

```js
const withMultiple = (n) => (m) => n * m; console.log(withMultiple(3)(5)); //15
const triple = withMultiple(3);
console.log(triple(5)); // 15
```

引数により左右される何らかの共通処理 + 共通処理に対して引数を渡して出力を得たいような場合に使う。
例) コンポーネントを返す関数があったとして、部分適用により特定コンポーネントを返す関数を作る。その関数に対してコンポーネントのスタイルなどのオプションを渡す。

## クロージャ

Closure.

動作コンテキストごと関数内に閉じ込める。
正確には、関数と「その関数が作られた環境」という2つのものが一体となったオブジェクトのことを指す。
なお、閉じ込めている外側の関数は **エンクロージャ** とも呼ばれる。

必ずしも内側の関数を返す必要はなく、単に外のスコープの自由変数を参照する関数をさらに関数で包み込んだものをクロージャという。


```js
const counter = () => {
  let count = 0;

  const increment = () => {
    return count += 1;
  };

  return increment;
};
```

`count` のような `increment` の引数でもなく、 `increment` 自身のローカル変数でもない変数を **自由変数** と呼ぶ。

### メモリのライフサイクル

1. 必要なメモリを割り当てる
2. 割り当てられたメモリを使用
3. 必要がなくなれば、メモリを開放する

JavaScriptのような高水準言語は、ガベージコレクタにより不要になったメモリ領域の開放を自動で行う。
「不要」の判定にはいくつか条件があるが、その内の1つに「カレントスコープから参照されているか否か」がある。

JavaScriptでは関数のスコープは **レキシカルスコープ** といい、定義時に決定・固定される。
つまり、自由変数を参照する内側の関数がエンクロージャにより返され、外のスコープで生きている限り、その自由変数は参照され続けるため、GCにより開放されず、状態を保つことができる。

例: 自由変数 `count` は `increment` により参照される。 `increment` は `counter` によって返され、グローバルスコープで生きている。

***

## JavaScriptでの非同期処理

### Promise

`Promise` は非同期処理の最終的な処理結果の値を **約束** するもの。

```js
const isSucceeded = true;

const promise = new Promise((resolve, reject) => {
  if (isSucceeded) {
    resolve('Success');
  } else {
    reject(new Error("Failure!"));
  }
});

promise.then((value) => {
  console.log("1", value);

  return 'Success again';
})
.then((value) => {
  console.log("2", value);
})
.catch((e) => {
  console.error("3", e);
})
.finally(() => {
  console.log("4", "Completed");
});
```

関数型プログラミングの知識があると、上のサンプルをすんなり理解できる。

- `Promise` のコンストラクタに渡しているのは、関数を引数に取り、内部でその関数を実行する関数。
- メソッドチェーンで順に実行するための `then` に引数として渡されるのは関数。

1. コールバック関数 `resolve` に渡した引数が、 `then` の引数の関数で `value` として受け取れる。
2. `then` 内で `return` された値が次の `then` での `value` になる。
3. エラーの場合、 `reject` に渡したエラーが `catch` の引数の関数で `error` として受け取れる。
4. 結果が成功でも失敗でも最後には `finally` が実行される。

### Promiseのハンドリング

node-fetch ライブラリを使ってみる。

`fetch` 関数も `json()` メソッドも `Promise` を返すので、 `then` で受け止めてやる。

```js
import fetch from 'node-fetch'

const getUser = (userId) => fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  .then(
    (res) => {
      if (!res.ok) {
        throw new Error(`${res.status} Error`);
      } else {
        return res.json();
      }
    },
  );

console.log("--start--")

getUser(2)
  .then((user) => { console.log(user); })
  .catch((e) => { console.error(e); })
  .finally(() => { console.log("--Completed--") })
```

コールバックの階層を重ねるような書き方は可読性を損なう上、テストも書きにくい。
そこで、 `async/await` というシンタックスシュガーを使うといい。

## `async/await`

```js
import fetch from 'node-fetch';

const getUser = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );

  if (!response.ok) {
    throw new Error(`${response.status} error`);
  }

  return response.json();
}

console.log("-start-")

const main = async () => {
  try {
    const user = await getUser(2);
    console.log(user)
  } catch (error) {
    console.log(error);
  } finally {
    console.log("-completed-");
  }
};

main();
```

関数宣言の前に `async` キーワードを、 非同期関数呼び出しの前に `await` キーワードをつける。

`async` キーワードをつけると、その関数は非同期関数となり、返り値が暗黙の内に `Promise.resolve` によりラップされたものになる。
さらに、 非同期関数の中では他の非同期関数を `await` 演算子を付けて呼び出せる。
