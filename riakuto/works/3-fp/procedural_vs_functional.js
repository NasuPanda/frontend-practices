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
