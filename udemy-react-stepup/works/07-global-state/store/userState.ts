import { atom } from 'recoil';

const userState = atom({
  key: 'userState',
  default: { isAdmin: false },
});

export default userState;
