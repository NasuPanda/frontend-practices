import axios from 'axios';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { User } from '../types/user';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const useAuth = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    (id: string) => {
      setIsLoading(true);

      axios
        .get<User>(`${API_URL}/${id}`)
        .then((_) => {
          history.push('/home');
        })
        // [axiosでのエラーハンドリング - こなさんち](https://cresta522.hateblo.jp/entry/20201231/1609378592)
        .catch((error: { response: { status: number } }) => {
          if (error.response.status === 404) {
            alert(`IDが ${id} のユーザは存在しません`);
          } else {
            alert('ログインに失敗しました');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [history],
  );

  return { login, isLoading };
};

export default useAuth;
