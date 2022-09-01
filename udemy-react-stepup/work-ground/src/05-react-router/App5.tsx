import { BrowserRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

import Router from './router/Router';

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  background-color: #fff;
`;

const App: React.FC = () => (
  <BrowserRouter>
    <LinkContainer>
      <Link to="/">Home</Link>
      <Link to="/page1">Page1</Link>
      <Link to="/page2">Page2</Link>
    </LinkContainer>
    <Router />
  </BrowserRouter>
);

export default App;
