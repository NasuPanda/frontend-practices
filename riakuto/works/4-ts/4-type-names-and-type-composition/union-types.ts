// union-type
{
  let id: number | string = 20;
  id = 'abcdefg-1234567';

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
}
