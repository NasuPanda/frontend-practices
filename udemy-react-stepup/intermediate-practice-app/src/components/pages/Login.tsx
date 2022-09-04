import { ChangeEvent, memo, useState, VFC } from 'react';
import { Flex, Box, Heading, Divider, Input, Stack } from '@chakra-ui/react';

import PrimaryButton from '../atoms/button/PrimaryButton';
import useAuth from '../../hooks/useAuth';

const Login: VFC = memo(() => {
  const [userId, setUserId] = useState('');
  const { login, isLoading } = useAuth();

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);
  const onClickLogin = () => login(userId);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザ管理アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={4} py={4} px={10}>
          <Input
            placeholder="ユーザID"
            onChange={onChangeUserId}
            value={userId}
          />
          <PrimaryButton
            text="ログイン"
            onClick={onClickLogin}
            isLoading={isLoading}
            disabled={userId === '' || isLoading}
          />
        </Stack>
      </Box>
    </Flex>
  );
});

export default Login;
