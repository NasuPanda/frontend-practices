import axios from 'axios';
import { useCallback, useState } from 'react';

import { USER_API_URL } from '../config/api';
import { User } from '../types/user';
import useMessage from './useMessage';

type useAllUsersReturnsType = {
  users: User[];
  fetchUsers: () => void;
  isLoading: boolean;
};

const useAllUsers: () => useAllUsersReturnsType = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const { showMessage } = useMessage();

  const fetchUsers = useCallback(() => {
    setIsLoading(true);

    axios
      .get<User[]>(USER_API_URL)
      .then((res) => setUsers(res.data))
      .catch((_) => {
        showMessage({ title: 'ユーザ取得に失敗しました', status: 'error' });
      })
      .finally(() => setIsLoading(false));
  }, [showMessage]);

  return { users, fetchUsers, isLoading };
};

export default useAllUsers;
