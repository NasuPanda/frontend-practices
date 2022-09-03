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
