import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SHeader = styled.header`
  background-color: #11999e;
  color: #fff;
  text-align: center;
  padding: 8px 0;
`;

const SLink = styled(Link)`
  margin: 0px 8px;
`;

const Header: React.VFC = () => (
  <SHeader>
    <SLink to="/">HOME</SLink>
    <SLink to="/users">Users</SLink>
  </SHeader>
);

export default Header;
