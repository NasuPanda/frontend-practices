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
