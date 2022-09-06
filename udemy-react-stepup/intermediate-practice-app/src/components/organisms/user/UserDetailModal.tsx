import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { ChangeEvent, memo, useEffect, useState, VFC } from 'react';
import { User } from '../../../types/user';
import PrimaryButton from '../../atoms/button/PrimaryButton';

type Props = {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
};

const UserDetailModal: VFC<Props> = memo(
  ({ user, isOpen, onClose, isAdmin = false }) => {
    const onClickUpdateUser = () => console.log(isAdmin);
    const isReadOnly = !isAdmin;
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
      setUsername(user?.username ?? '');
      setName(user?.name ?? '');
      setEmail(user?.email ?? '');
      setPhone(user?.phone ?? '');
    }, [user]);

    const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) =>
      setUsername(e.target.value);
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
      setName(e.target.value);
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
      setEmail(e.target.value);
    const onChangePhone = (e: ChangeEvent<HTMLInputElement>) =>
      setPhone(e.target.value);

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay>
          <ModalContent pb={2}>
            <ModalHeader>ユーザー詳細</ModalHeader>
            <ModalCloseButton />
            <ModalBody margin={4}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>名前</FormLabel>
                  <Input
                    value={username}
                    isReadOnly={isReadOnly}
                    onChange={onChangeUserName}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>フルネーム</FormLabel>
                  <Input
                    value={name}
                    isReadOnly={isReadOnly}
                    onChange={onChangeName}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Mail</FormLabel>
                  <Input
                    value={email}
                    isReadOnly={isReadOnly}
                    onChange={onChangeEmail}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    value={phone}
                    isReadOnly={isReadOnly}
                    onChange={onChangePhone}
                  />
                </FormControl>
              </Stack>
            </ModalBody>
            {isAdmin && (
              <ModalFooter>
                <PrimaryButton text="更新" onClick={onClickUpdateUser} />
              </ModalFooter>
            )}
          </ModalContent>
        </ModalOverlay>
      </Modal>
    );
  },
);

export default UserDetailModal;
