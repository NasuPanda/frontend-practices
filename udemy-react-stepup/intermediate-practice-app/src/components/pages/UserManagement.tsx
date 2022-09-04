import { memo, useCallback, useEffect, VFC } from 'react';
import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import { IMAGE_API_URL } from '../../config/api';
import UserCard from '../organisms/user/UserCard';
import useAllUsers from '../../hooks/useAllUsers';
import UserDetailModal from '../organisms/user/UserDetailModal';
import useSelectUser from '../../hooks/useSelectUsers';
import useLoginUser from '../../hooks/useLoginUser';

const UserManagement: VFC = memo(() => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { fetchUsers, users, isLoading } = useAllUsers();
  const { findUserById, selectedUser } = useSelectUser();
  const { loginUser } = useLoginUser();
  console.log(loginUser);

  useEffect(() => fetchUsers(), [fetchUsers]);

  const onClickUser = useCallback(
    (userId: number) => {
      findUserById({ userId, users, onOpen });
    },
    [onOpen, findUserById, users],
  );

  return (
    <>
      {isLoading ? (
        <Center height="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                imageUrl={IMAGE_API_URL}
                username={user.username}
                fullName={user.name}
                userId={user.id}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal user={selectedUser} isOpen={isOpen} onClose={onClose} />
    </>
  );
});

export default UserManagement;
