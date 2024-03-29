{
  const permissions = {
    r: 0b100 as const,
    w: 0b010 as const,
    x: 0b001 as const,
  };

  type PermsChar = keyof typeof permissions      // 'r' | 'w' | 'x'
  type PermsNum = typeof permissions[PermsChar]; // 1 | 2 | 4
}
