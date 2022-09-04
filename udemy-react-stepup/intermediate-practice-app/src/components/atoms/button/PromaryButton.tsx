import { memo, VFC } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  text: string;
};
const PrimaryButton: VFC<Props> = memo(({ text }) => (
  <Button bg="teal.400" color="white" _hover={{ opacity: 0.8 }}>
    {text}
  </Button>
));

export default PrimaryButton;
