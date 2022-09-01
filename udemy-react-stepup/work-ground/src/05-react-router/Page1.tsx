import { Link } from 'react-router-dom';

const Page1: React.FC = () => (
  <div>
    <h2>Page1</h2>
    <Link to="/page1/detailA">DetailA</Link>
    <Link to="/page1/detailB">DetailB</Link>
  </div>
);

export default Page1;
