import { HamburgerIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { memo, VFC } from 'react';

type Props = {
  onClick: () => void;
};

const MenuIconButton: VFC<Props> = memo(({ onClick }) => (
  <IconButton
    icon={<HamburgerIcon />}
    aria-label="メニューボタン"
    size="sm"
    variant="unstyled"
    display={{ base: 'block', md: 'none' }}
    onClick={onClick}
  />
));

export default MenuIconButton;
