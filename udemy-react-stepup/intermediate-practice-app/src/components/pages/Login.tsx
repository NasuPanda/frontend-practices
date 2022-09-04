import { memo, VFC } from 'react';
import { Flex, Box, Heading, Divider, Input, Stack } from '@chakra-ui/react';
import PrimaryButton from '../atoms/button/PromaryButton';

const Login: VFC = memo(() => (
  <Flex align="center" justify="center" height="100vh">
    <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
      <Heading as="h1" size="lg" textAlign="center">
        ユーザ管理アプリ
      </Heading>
      <Divider my={4} />
      <Stack spacing={4} py={4} px={10}>
        <Input placeholder="ユーザID" />
        <PrimaryButton text="ログイン" />
      </Stack>
    </Box>
  </Flex>
));

export default Login;
