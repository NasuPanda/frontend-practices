// Tが型の配列だった場合  : その配列の中身の型を U として取得
// Tが配列でない場合     : その型をそのまま出力
type Flatten<T> = T extends Array<infer U> ? U : T;

const num = 5
const numArr = [1, 2, 3];
type A = Flatten<typeof numArr>; // number
type N = Flatten<typeof num>; // number
