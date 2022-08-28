const key = "foo";
const baz = 111;

const obj1 = {
  foo: 123,
  // 変数の値をキーとして展開
  [key]: "←オブジェクトのキーが変数keyの値になる",
  baz: baz,
};
console.log(obj1);
// { foo: '←オブジェクトのキーが変数keyの値になる', baz: 111 }

// 変数名: 変数の値 としてキーと要素を展開
const obj2 = { baz };
console.log(obj2);
// { baz: 111 }
