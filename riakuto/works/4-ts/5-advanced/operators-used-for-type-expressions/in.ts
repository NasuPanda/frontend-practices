// 通常の式
const obj = { a: 1, b: 2, c: 3 };
console.log('a' in obj); // => true

// マップ型
type Fig = 'one' | 'two' | 'three';
type FigMap = { [k in Fig]?: number };

const figMap: FigMap = {
  one: 1,
  two: 2,
}
// figMap.four = 4; // Error
