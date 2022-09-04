import axios from 'axios';
import { useCallback, useState } from 'react';

import { USER_API_URL } from '../config/api';
import { User } from '../types/user';
import { UserProfile } from '../types/userProfile';
import useMessage from './useMessage';

type useAllUsersReturnsType = {
  users: UserProfile[];
  fetchUsers: () => void;
  isLoading: boolean;
};

const useAllUsers: () => useAllUsersReturnsType = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const { showMessage } = useMessage();

  const fetchUsers = useCallback(() => {
    setIsLoading(true);

    axios
      .get<User[]>(USER_API_URL)
      .then((res) => {
        const formattedUserProfiles = res.data.map((user) => ({
          id: user.id,
          username: user.username,
          fullName: user.name,
        }));
        setUsers(formattedUserProfiles);
      })
      .catch((_) => {
        showMessage({ title: 'ユーザ取得に失敗しました', status: 'error' });
      })
      .finally(() => setIsLoading(false));
  }, [showMessage]);

  return { users, fetchUsers, isLoading };
};

export default useAllUsers;
