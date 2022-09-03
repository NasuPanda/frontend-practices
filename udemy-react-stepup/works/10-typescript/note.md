# TypeScript

## 型定義の切り出し

`/src/types` などのディレクトリを作り、その中に型定義専用のファイルを作る。

```ts
export type TaskType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
```

`type` も普通に `import` して扱える。

```tsx
const App: React.FC = () => {
  const [todos, setTodos] = useState<TaskType[]>([]);

  const onClickFetchData = () => {
    axios
      .get<Array<TaskType>>(API_URL)
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  };
  // ...
}
```

### 特定の型だけ抜き出す

元々の定義から必要な型だけ抜き取るような場合。

`Pick` か `Omit` を使う。

```tsx
import { TaskType } from './types/task';

// Pick により userId, title, completed のみを抽出
export const Todo: React.VFC<Pick<TaskType, 'userId' | 'title' | 'completed'>> = ({
  title,
  userId,
  completed = false,
}) => {
  const completeMark = completed ? '[完]' : '[未]';
  return <p>{`${completeMark} ${title} (ユーザ: ${userId})`}</p>;
};
```

```tsx
import { TaskType } from './types/task';

// Omit により id を省略
export const Todo: React.VFC<Omit<TaskType, 'id'>> = ({
  title,
  userId,
  completed = false,
}) => {
  const completeMark = completed ? '[完]' : '[未]';

  return <p>{`${completeMark} ${title} (ユーザ: ${userId})`}</p>;
};
```
