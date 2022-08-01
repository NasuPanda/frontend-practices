const rate: { [unit: string]: number } = {
  USD: 1,
  EUR: 0.9,
  JPY: 108,
  GBP: 0.8,
};

type Unit = keyof typeof rate;
// 型エイリアス Currency
type Currency = {
  unit: Unit;
  amount: number;
};

// オブジェクト Currency
const Currency = {
  exchange: (currency: Currency, unit: Unit): Currency => {
    const amount = currency.amount / rate[currency.unit] * rate[unit];

    return { unit, amount };
  },
};

export { Currency };
