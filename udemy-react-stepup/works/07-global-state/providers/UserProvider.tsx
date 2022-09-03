import React, { createContext, Dispatch, useState } from 'react';

type AdminFlag = {
  isAdmin: boolean;
};
type UserContextType = {
  userInfo: AdminFlag;
  setUserInfo: Dispatch<React.SetStateAction<AdminFlag>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState<AdminFlag>({} as AdminFlag);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
