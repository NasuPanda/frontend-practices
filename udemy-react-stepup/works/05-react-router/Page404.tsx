import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundText = styled.h1`
  color: red;
`;

const Page404: React.FC = () => (
  <div>
    <NotFoundText>404 Error</NotFoundText>
    <p>ページが見つかりませんでした</p>
    <Link to="/">トップに戻る</Link>
  </div>
);

export default Page404;
