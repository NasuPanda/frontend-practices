# カスタムフック

## 使わずにデータ取得を書く

1. axios でAPIからデータ取得
2. `isLoading` , `hasLoadingError` という state を用意、 `onClickFetchUser` 実行時に結果に応じて更新する
3. `isLoading` `hadLoadingError` の状態を元にコンポーネントを出し分ける

```tsx
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import UserCard from './components/UserCard';
import { User } from './types/api/user';
import { UserProfile } from './types/userProfile';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const App: React.FC = () => {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const onClickFetchUser = () => {
    setIsLoading(true);
    setHasLoadingError(false);

    axios
      .get<User[]>(API_URL)
      .then((res) => {
        const formattedUserProfiles = res.data.map((user) => ({
          id: user.id,
          name: `${user.username} (${user.name})`,
          email: user.email,
          address: `${user.address.city} ${user.address.suite} ${user.address.street}`,
        }));
        setUserProfiles(formattedUserProfiles);
      })
      .catch(() => setHasLoadingError(true))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <button onClick={onClickFetchUser} type="button">
        ユーザデータ取得
      </button>
      {hasLoadingError && (
        <p style={{ color: 'red' }}>データ取得に失敗しました</p>
      )}
      {!hasLoadingError &&
        (isLoading ? (
          <p>Now Loading...</p>
        ) : (
          <>
            {userProfiles.map((user) => (
              <UserCard user={user} key={user.id} />
            ))}
          </>
        ))}
    </div>
  );
};

export default App;
```

## カスタムフックを使う

```ts
/** 全ユーザ一覧を取得するカスタムフック */
import axios from 'axios';
import { useState } from 'react';
import { UserProfile } from '../types/userProfile';
import { User } from '../types/api/user';

type UseAllUsersReturnsType = {
  fetchUsers: (url: string) => void;
  userProfiles: UserProfile[];
  isLoading: boolean;
  hasLoadingError: boolean;
};

const useAllUsers = (): UseAllUsersReturnsType => {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const formatUserProfile = (user: User): UserProfile => ({
    id: user.id,
    name: `${user.username} (${user.name})`,
    email: user.email,
    address: `${user.address.city} ${user.address.suite} ${user.address.street}`,
  });

  const fetchUsers = (url: string) => {
    setIsLoading(true);
    setHasLoadingError(false);

    axios
      .get<User[]>(url)
      .then((res) => {
        const formattedUserProfiles = res.data.map((user) =>
          formatUserProfile(user),
        );
        setUserProfiles(formattedUserProfiles);
      })
      .catch(() => setHasLoadingError(true))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    fetchUsers,
    userProfiles,
    isLoading,
    hasLoadingError,
  };
};

export default useAllUsers;
```

呼び出し側。

```tsx
import './App.css';
import UserCard from './components/UserCard';
import useAllUsers from './hooks/useAllUsers';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const App: React.FC = () => {
  const { fetchUsers, userProfiles, isLoading, hasLoadingError } =
    useAllUsers();
  const onClickFetchUser = () => fetchUsers(API_URL);

  return (
    <div>
      <button onClick={onClickFetchUser} type="button">
        ユーザデータ取得
      </button>
      {hasLoadingError && (
        <p style={{ color: 'red' }}>データ取得に失敗しました</p>
      )}
      {!hasLoadingError &&
        (isLoading ? (
          <p>Now Loading...</p>
        ) : (
          <>
            {userProfiles.map((user) => (
              <UserCard user={user} key={user.id} />
            ))}
          </>
        ))}
    </div>
  );
};

export default App;
```

