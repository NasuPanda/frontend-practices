import Header from '../atoms/layout/Header';

const HeaderOnly: React.FC = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default HeaderOnly;
