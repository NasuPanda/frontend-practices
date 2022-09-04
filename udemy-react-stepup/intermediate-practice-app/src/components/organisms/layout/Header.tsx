/* eslint-disable jsx-a11y/anchor-is-valid */
import { memo, useCallback, VFC } from 'react';

import { Flex, Heading, Link, Box, useDisclosure } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import MenuIconButton from '../../atoms/button/MenuIconButton';
import MenuDrawer from '../../molecules/MenuDrawer';

const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const onClickHome = useCallback(() => history.push('/home'), [history]);
  const onClickUserManagement = useCallback(
    () => history.push('/home/user_management'),
    [history],
  );
  const onClickSetting = useCallback(
    () => history.push('/home/setting'),
    [history],
  );

  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        {/* ヘッダータイトル */}
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: 'pointer' }}
          onClick={onClickHome}
        >
          <Heading as="h1" fontSize={{ base: 'md', md: 'lg' }}>
            ユーザ管理アプリ
          </Heading>
        </Flex>

        {/* ヘッダーメニュー */}
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{ base: 'none', md: 'flex' }}
        >
          {/* ヘッダーリンク */}
          <Box pr={4}>
            <Link onClick={onClickUserManagement}>ユーザ一覧</Link>
          </Box>
          <Link onClick={onClickSetting}>設定</Link>
          {/* ハンバーガーメニュー */}
        </Flex>
        <MenuIconButton onClick={onOpen} />
      </Flex>

      {/* 展開可能なメニュー */}
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        onClickHome={onClickHome}
        onClickUserManagement={onClickUserManagement}
        onClickSetting={onClickSetting}
      />
    </>
  );
});

export default Header;
