import { VFC, memo } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../components/pages/Login';
import Page404 from '../components/pages/Page404';
import HomeRoutes from './HomeRoutes';

const Router: VFC = memo(() => (
  <Switch>
    <Route exact path="/">
      <Login />
    </Route>
    <Route
      path="/home"
      render={({ match: { url } }) => (
        <Switch>
          {HomeRoutes.map((route) => (
            <Route
              key={route.path}
              path={`${url}${route.path}`}
              exact={route.exact}
            >
              {route.children}
            </Route>
          ))}
        </Switch>
      )}
    />
    <Route path="*">
      <Page404 />
    </Route>
  </Switch>
));

export default Router;
