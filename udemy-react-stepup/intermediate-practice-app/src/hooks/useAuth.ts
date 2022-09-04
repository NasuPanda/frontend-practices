import axios from 'axios';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { USER_API_URL } from '../config/api';
import { User } from '../types/user';
import useMessage from './useMessage';

const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    (id: string) => {
      setIsLoading(true);

      axios
        .get<User>(`${USER_API_URL}/${id}`)
        .then((_) => {
          showMessage({ title: 'ログインしました', status: 'success' });
          history.push('/home');
        })
        // [axiosでのエラーハンドリング - こなさんち](https://cresta522.hateblo.jp/entry/20201231/1609378592)
        .catch((error: { response: { status: number } }) => {
          if (error.response.status === 404) {
            showMessage({
              title: `IDが ${id} のユーザは存在しません`,
              status: 'error',
            });
          } else {
            showMessage({ title: 'ログインに失敗しました', status: 'error' });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [history, showMessage],
  );

  return { login, isLoading };
};

export default useAuth;
