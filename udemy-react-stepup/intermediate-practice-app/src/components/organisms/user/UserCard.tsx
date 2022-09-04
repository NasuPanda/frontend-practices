import { memo, VFC } from 'react';
import { Box, Stack, Image, Text } from '@chakra-ui/react';

type Props = {
  imageUrl: string;
  username: string;
  fullName: string;
};

const UserCard: VFC<Props> = memo(
  ({ imageUrl, username: userName, fullName }) => (
    <Box
      w="260px"
      height="260px"
      backgroundColor="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: 'pointer', opacity: 0.8 }}
    >
      <Stack textAlign="center">
        <Image
          src={imageUrl}
          boxSize="160px"
          borderRadius="full"
          alt={`profile of ${userName}`}
          margin="auto"
        />
        <Text fontSize="lg" fontWeight="bold">
          {userName}
        </Text>
        <Text fontSize="sm" color="gray">
          {fullName}
        </Text>
      </Stack>
    </Box>
  ),
);

export default UserCard;
