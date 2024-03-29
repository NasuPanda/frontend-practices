// Pre-curried
{
  const multiply = (n, m) => n * m;
  console.log(multiply(2, 4));
}

// Curried
{
  const withMultiple = (n) => {
    return (m) => n * m
  }
  console.log(withMultiple(2)(4));
}

// Curried with double arrow
{
  const withMultiple = (n) => (m) => n * m;
  console.log(withMultiple(2)(4));
}

// 部分適用
{
  const withMultiple = (n) => (m) => n * m;
  console.log(withMultiple(3)(5)); //15

  const triple = withMultiple(3);
  console.log(triple(5)); // 15
}
