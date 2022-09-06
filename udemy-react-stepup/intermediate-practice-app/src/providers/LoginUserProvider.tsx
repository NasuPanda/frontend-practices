import { createContext, Dispatch, FC, SetStateAction, useState } from 'react';

import { User } from '../types/user';

type LoginUser = User & { isAdmin: boolean };

export type LoginUserContextType = {
  loginUser: LoginUser | null;
  setLoginUser: Dispatch<SetStateAction<LoginUser | null>>;
};

export const LoginUserContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType,
);

const LoginUserProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};

export default LoginUserProvider;
