import { useCallback, useState } from 'react';
import { User } from '../types/user';

type Props = {
  userId: number;
  users: User[];
  onOpen: () => void;
};

type ReturnsType = {
  findUserById: (props: Props) => void;
  selectedUser: User | null;
};

/* 選択したユーザ情報を特定、モーダルを表示するカスタムフック */
const useSelectUser: () => ReturnsType = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const findUserById = useCallback(({ userId, users, onOpen }: Props) => {
    const foundUser = users.find((user) => user.id === userId);
    setSelectedUser(foundUser ?? null);
    onOpen();
  }, []);

  return { findUserById, selectedUser };
};

export default useSelectUser;
