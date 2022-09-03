import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TopPage from '../components/pages/Top';
import UsersPage from '../components/pages/Users';
import DefaultLayout from '../components/templates/DefaultLayout';
import HeaderOnly from '../components/templates/HeaderOnly';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <DefaultLayout>
          <TopPage />
        </DefaultLayout>
      </Route>
      <Route path="/users">
        <HeaderOnly>
          <UsersPage />
        </HeaderOnly>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
