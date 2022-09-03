# グローバルな状態管理

## Context による状態管理

1. `/providers` ディレクトリを作り、その中にプロバイダコンポーネントを作る
2. `App.tsx` などからアプリケーションの本体をプロバイダコンポーネントでラップする
3. `useContext` という Hooks API を使って参照出来る。

2 のイメージは以下。

```tsx
const App: React.FC = () => (
  <UserProvider>
    <Router />
  </UserProvider>
);
```

### `createContext` : プロバイダコンポーネント

1. `createContext` で Context を作成。
2. 作成した Context の `Provider` メソッドでプロバイダコンポーネントを定義。
3. `value` 属性にグローバルに共有したい状態を渡す

3 には `useState` の state 変数、更新関数を渡すことが多い。


```tsx
import { createContext } from 'react';

export const UserContext = createContext({});

export const UserProvider: React.FC = ({ children }) => {
  const contextName = 'ユーザ名';

  return (
    {/* value に渡した値をグローバルに扱える */}
    <UserContext.Provider value={{ contextName }}>
      {children}
    </UserContext.Provider>
  );
};
```

### `useContext` で参照

`useContext` に `createContext` で作成したオブジェクトを渡せばいい。

```tsx
import { useContext } from 'react';
import { UserContext } from '../../../providers/UserProvider';

// 省略...
  const context = useContext(UserContext);
  console.log(context); // => { "contextName": "ユーザ名" }
```
