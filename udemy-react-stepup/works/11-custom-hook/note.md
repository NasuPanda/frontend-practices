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
