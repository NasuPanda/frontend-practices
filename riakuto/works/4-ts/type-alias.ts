// interface vs type alias
{
  type Unit = 'USD' | 'EUR' | 'JRY' | 'GBP';

  type TCurrency = {
    unit: Unit;
    amount: number
  };

  interface ICurrency {
    unit: Unit;
    amount: number;
  }

  const priceA: TCurrency = { unit: 'JRY', amount: 1000 };
  const priceB: ICurrency = { unit: 'JRY', amount: 1000 };
}

// supplement: extension of interface
{
  interface User {
    name: string;
  }
  // Userにageが追加されてしまう
  interface User {
    age: number;
  }
}
