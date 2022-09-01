import { Link } from 'react-router-dom';

const Page1: React.FC = () => {
  const value = '渡したい値';

  return (
    <div>
      <h2>Page1</h2>
      <Link to={{ pathname: '/page1/detailA', state: value }}>DetailA</Link>
      <Link to="/page1/detailB">DetailB</Link>
    </div>
  );
};

export default Page1;
