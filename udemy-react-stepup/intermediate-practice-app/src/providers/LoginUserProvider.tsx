import { createContext, Dispatch, FC, SetStateAction, useState } from 'react';

import { User } from '../types/user';

export type LoginUserContextType = {
  loginUser: User | null;
  setLoginUser: Dispatch<SetStateAction<User | null>>;
};

export const LoginUserContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType,
);

const LoginUserProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loginUser, setLoginUser] = useState<User | null>(null);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};

export default LoginUserProvider;
