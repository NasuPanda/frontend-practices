import { memo, FC } from 'react';
import Header from '../organisms/layout/Header';

type Props = {
  children: React.ReactNode;
};

const HeaderLayout: FC<Props> = memo(({ children }) => (
  <>
    <Header />
    {children}
  </>
));

export default HeaderLayout;
