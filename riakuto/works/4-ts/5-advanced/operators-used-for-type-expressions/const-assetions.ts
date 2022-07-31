{
  const permissions = {
    r: 0b100 as const,
    w: 0b010 as const,
    x: 0b001 as const,
  };
}

// まとめて書く事もできる
{
  const permissions = {
    r: 0b100,
    w: 0b010,
    x: 0b001,
  } as const;
}
