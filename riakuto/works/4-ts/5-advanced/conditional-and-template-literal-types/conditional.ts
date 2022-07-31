type User = { id: unknown };

type NewUser = User & { id: string };
type OldUser = User & { id: number };
type Book = { isbn: string };

// Userか、Userを拡張した型以外なら `never` になる
type UserIdOf<T> = T extends User ? T['id'] : never;

type NewUserId = UserIdOf<NewUser>; // string
type OldUserId = UserIdOf<OldUser>; // number
type BookId = UserIdOf<Book>; // string
