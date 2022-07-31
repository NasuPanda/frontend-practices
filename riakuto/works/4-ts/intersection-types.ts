{
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
}

// 型エイリアスによる拡張
{
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
}
