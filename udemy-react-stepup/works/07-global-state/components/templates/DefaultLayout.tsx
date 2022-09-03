import Header from '../atoms/layout/Header';
import Footer from '../atoms/layout/Footer';

const DefaultLayout: React.FC = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default DefaultLayout;
