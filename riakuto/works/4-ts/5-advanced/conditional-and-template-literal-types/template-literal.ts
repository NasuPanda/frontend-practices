{
  type DateFormat = `${number}-${number}-${number}`;

const validDate: DateFormat = '2020-12-06';
// const invalidDate: DateFormat = 'Dec. 5, 2020'; // Error
}

{
  const tables = ['users', 'posts', 'comments'] as const;
  type Table = typeof tables[number];
  type AllSelect = `SELECT * FROM ${Table}`;
  type LimitSelect = `${AllSelect} LIMIT ${number}`;
  const createQuery = (table: Table, limit?: number): AllSelect | LimitSelect =>
    limit ? `SELECT * FROM ${table} LIMIT ${limit}` as const :
    `SELECT * FROM ${table}` as const;

  const query = createQuery('users', 20);
  console.log(query);

  // inferにより、クエリからテーブル名の型を取得
  const q1 = 'SELECT * FROM users';
  const q2 = 'SELECT id, body, createdAt FROM posts';
  const q3 = 'SELECT userId, postId FROM comments';
  type PickTable<T extends string> = T extends `SELECT ${string} FROM ${infer U}` ? U : never;
  type Tables=PickTable<typeof q1|typeof q2|typeof q3>; //'users'|'posts'|'comments'
}
