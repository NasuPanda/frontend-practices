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
