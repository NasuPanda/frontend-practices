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

// generics
{
  const toArray = <T>(arg1: T, arg2: T) => [arg1, arg2];

  toArray(1, 2)            // [1, 2]
  toArray('foo', 'bar')    // ['foo', 'bar']
  // toArray(1, 'foo')     // Error
}

// generics ...
{
  const toArray = <T>(...args: T[]): T[] => [...args];

  toArray(1, 2, 3)       // [1, 2, 3]
  toArray(1, 2, 3, 4, 5) // [1, 2, 3, 4, 5]
  // toArray(1, 'foo')   // Error
}
