import { memo, VFC } from 'react';

import { Flex, Heading, Link, Box, useDisclosure } from '@chakra-ui/react';
import MenuIconButton from '../../atoms/button/MenuIconButton';
import MenuDrawer from '../../molecules/MenuDrawer';

const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Flex align="center" as="a" mr={8} _hover={{ cursor: 'pointer' }}>
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
            <Link href="*">ユーザ一覧</Link>
          </Box>
          <Link href="*">設定</Link>
          {/* ハンバーガーメニュー */}
        </Flex>
        <MenuIconButton onClick={onOpen} />
      </Flex>

      {/* 展開可能なメニュー */}
      <MenuDrawer onClose={onClose} isOpen={isOpen} />
    </>
  );
});

export default Header;
