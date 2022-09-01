import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';
import Page1DetailA from './Page1DetailA';
import Page1DetailB from './Page1DetailB';

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
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      {/* ネストしたルート */}
      <Route
        path="/page1"
        render={({ match: { url } }) => (
          <Switch>
            <Route exact path="/page1">
              <Page1 />
            </Route>

            <Route exact path={`${url}/detailA`}>
              <Page1DetailA />
            </Route>

            <Route exact path={`${url}/detailB`}>
              <Page1DetailB />
            </Route>
          </Switch>
        )}
      />
      <Route path="/page2">
        <Page2 />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
