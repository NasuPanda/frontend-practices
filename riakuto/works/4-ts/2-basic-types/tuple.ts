{
  const charAttrs: [number, string, boolean] = [1, 'party', true];
  const spells: [number, ...string[]] = [7, 'heal', 'sizz', 'snooz'];

  // API関数の戻り値として複数の異なる値を設定したいとき
  const userAttrs: [number, string, boolean] = [1, 'party', true];
  const [id, username, isAdmin] = userAttrs;
  console.log(id, username, isAdmin)
}
