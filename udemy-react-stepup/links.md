# 参考にしたリンク

- [Create React AppのプロジェクトをReact17にダウングレードする - Qiita](https://qiita.com/kabosu3d/items/674e287dd068322ca7cf)
- [React×Typescript Eventの型まとめ](https://zenn.dev/kenta0313/articles/a39fb1d8edc3a4)
  - event に型を付けたいときに
- [any型で諦めない React.EventCallback - Qiita](https://qiita.com/Takepepe/items/f1ba99a7ca7e66290f24)
  - props としてコールバック関数を渡したい時の型定義
  - 例 : `type Props = { onClick?: (event: React.MouseEvent<HTMLButtonElement>) } => void; }`
- [Hooks | React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks/#usestate)
  - `useState` などに型を付けたいときに

# UI コンポーネントライブラリ

Chakra UI は UI コンポーネントライブラリの一種。勢いがあるらしい。

![compare-ui-libs](../../images/compare-ui-libs.png)

最終的には使い勝手で選ぶべきだが、star数を見ると MaterialUI, AntDesign が強い。

Qiita の記事数で見てみると、MUI > tailwindcss > その他 と言った感じ。

日本でのシェア、Githubのスター数で考えるとMUIが頭1つ抜けている印象。

- [MUI](https://mui.com/)
- [React-Bootstrap](https://react-bootstrap.github.io/?ref=morioh.com&utm_source=morioh.com)
- [Ant Design](https://ant.design/?ref=morioh.com&utm_source=morioh.com)
- [Tailwind CSS](https://tailwindcss.com/)
- [Semantic UI](https://semantic-ui.com/)
- [Chakra UI](https://chakra-ui.com/)

## Material UI

- [Installation - Material UI](https://mui.com/material-ui/getting-started/installation/)
- [material-ui/docs/data/material/getting-started/templates at v5.10.3 · mui/material-ui](https://github.com/mui/material-ui/tree/v5.10.3/docs/data/material/getting-started/templates) : MUI公式が出している free のテンプレート

## Chakra UI

### リファレンス

- [Chakra UI](https://chakra-ui.com/)
- [Default Theme - Chakra UI](https://v1.chakra-ui.com/docs/styled-system/theming/theme) : カラーなどを探すときに

レイアウト系

- [Box - Chakra UI](https://chakra-ui.com/docs/components/box) : `div` タグ的な
- [Flex - Chakra UI](https://chakra-ui.com/docs/components/flex) : `display: flex` なコンテナとして
- [SimpleGrid - Chakra UI](https://chakra-ui.com/docs/components/simple-grid) : [Grid - Chakra UI](https://chakra-ui.com/docs/components/grid/usage) もあるが、よりユーザフレンドリーなインターフェイスを提供してくれている
- [Stack - Chakra UI](https://chakra-ui.com/docs/components/stack/usage) : 要素のグループ化、間隔開けに
- [Wrap - Chakra UI](https://chakra-ui.com/docs/components/wrap) : 要素を等間隔に並べる。レスポンシブ対応もしてくれる
- [Center - Chakra UI](https://chakra-ui.com/docs/components/center/usage) : 中央寄せ


### クイックスタート

```json
"dependencies": {
  "@chakra-ui/icons": "1.0.4",
  "@chakra-ui/react": "1.2.1",
  "@emotion/react": "11.1.4",
  "@emotion/styled": "11.0.0",
  "framer-motion": "3.3.0-beta.22",
}
```

```tsx
import './App.css';
import { FC } from 'react';
import { Button, ChakraProvider } from '@chakra-ui/react';

const App: FC = () => (
  <ChakraProvider>
    <Button colorScheme="teal">ボタン</Button>
  </ChakraProvider>
);

export default App;
```

### 基本的な使い方 : ヘッダー

例としてヘッダーを構築する。

`Flex` は flex-box 対応したコンテナ、 `Heading` は `h1` や `h2` 等を表す見出し。

- `as` でどのHTMLタグとしてレンダリングするか
- `color` `bg` でどの色にするか
- `align` `justify` などで flex-box の設定
- `IconButton` にアイコン (ここでは `HamburgerIcon` ) を渡すとそのアイコンのボタンができる
- `Drawer` を使って展開可能な UI を作る事ができる

設定を `{base: 3, md: 5}` のようなオブジェクトとして渡すことで、各ブレークポイントで要素の大きさを変更してくれる。

```tsx
import { memo, VFC } from 'react';

import {
  Button,
  Flex,
  Heading,
  Link,
  Box,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

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
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="メニューボタン"
          size="sm"
          variant="unstyled"
          display={{ base: 'block', md: 'none' }}
          onClick={onOpen}
        />
      </Flex>

      {/* 展開可能なメニュー */}
      <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerBody p={0} bg="gray.100">
              <Button w="100%">TOP</Button>
              <Button w="100%">ユーザ一覧</Button>
              <Button w="100%">設定</Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
});

export default Header;
```
