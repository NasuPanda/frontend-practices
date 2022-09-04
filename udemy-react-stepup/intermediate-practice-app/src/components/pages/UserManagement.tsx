import { memo, useEffect, VFC } from 'react';
import { Center, Spinner, Wrap, WrapItem } from '@chakra-ui/react';

import { IMAGE_API_URL } from '../../config/api';
import UserCard from '../organisms/user/UserCard';
import useAllUsers from '../../hooks/useAllUsers';

const UserManagement: VFC = memo(() => {
  const { fetchUsers, users, isLoading } = useAllUsers();

  useEffect(() => fetchUsers(), [fetchUsers]);

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
                fullName={user.fullName}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
});

export default UserManagement;
