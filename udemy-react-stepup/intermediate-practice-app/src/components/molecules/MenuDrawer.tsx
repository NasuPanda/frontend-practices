import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
} from '@chakra-ui/react';
import { memo, VFC } from 'react';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

const MenuDrawer: VFC<Props> = memo(({ onClose, isOpen }) => (
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
));

export default MenuDrawer;
