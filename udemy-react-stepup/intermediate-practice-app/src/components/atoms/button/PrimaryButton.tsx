import { memo, VFC } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};
const PrimaryButton: VFC<Props> = memo(
  ({ text, onClick, disabled = false, isLoading = false }) => (
    <Button
      bg="teal.400"
      color="white"
      _hover={{ opacity: 0.8 }}
      onClick={onClick}
      isLoading={isLoading}
      disabled={disabled}
    >
      {text}
    </Button>
  ),
);

export default PrimaryButton;
