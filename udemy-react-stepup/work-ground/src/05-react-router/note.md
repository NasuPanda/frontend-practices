# React Router

## 導入

ver 5 系 と 6 系 で提供されている API が異なるので注意。

```zsh
yarn add react-router-dom
```

## 実装

### クイックスタート

- 最初に `BrowserRouter` で全体をラップする。
- `Link` が `a` タグのような役割を果たす。
- `Route` にルーティングの設定を書く。
  - `path` がマッチした時に表示する要素は子コンポーネントとして渡したり、 `element` として渡したり出来る。
- `Switch` で囲った箇所は最初に `path` がマッチしたところでルーチンを抜ける。

```tsx
const App: React.FC = () => (
  <BrowserRouter>
    <div>
      <Link to="/">Home</Link>
      <Link to="/page1">Page1</Link>
      <Link to="/page2">Page2</Link>
    </div>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/page1">
        <Page1 />
      </Route>
      <Route path="/page2">
        <Page2 />
      </Route>
    </Switch>
  </BrowserRouter>
);
```

### ネストしたルート

`render` を使う。

```tsx
  <Route
    path="/page1"
    render={() => (
      <Switch>
        <Route exact path="/page1">
          <Page1 />
        </Route>

        <Route exact path="/page1/detailA">
          <Page1DetailA />
        </Route>

        <Route exact path="/page1/detailB">
          <Page1DetailB />
        </Route>
      </Switch>
    )}
/>
```

ただし、↑だと `/page1` に重複がある。

`render` にはデフォルトで `props` が渡されていて、 history や match を受け取る事ができる。
それを利用してみる。

```tsx
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
```

### ルーティングの切り出し

ルーティングの定義が多くなってきたので、切り出したい。

```tsx
const App: React.FC = () => (
  <BrowserRouter>
    <LinkContainer>
      <Link to="/">Home</Link>
      <Link to="/page1">Page1</Link>
      <Link to="/page2">Page2</Link>
    </LinkContainer>
    {/* ここから切り出す */}
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
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
```

`router` 等のディレクトリを作り、その中に `Switch` の中を切り出せばいい。

更に、 `page1` のルーティングが複雑で量が多い。
そこで、「ルーティングに必要なデータを持った配列」を切り出し、ルーティングをループで記述出来るようにすることで対処する。

```tsx
// router/Page1Routes.tsx
import Page1 from '../Page1';
import Page1DetailA from '../Page1DetailA';
import Page1DetailB from '../Page1DetailB';

type Route = {
  path: string;
  exact: boolean;
  children: JSX.Element;
};

const page1Routes: Route[] = [
  {
    path: '/',
    exact: true,
    children: <Page1 />,
  },
  {
    path: '/detailA',
    exact: false,
    children: <Page1DetailA />,
  },
  {
    path: '/detailB',
    exact: false,
    children: <Page1DetailB />,
  },
];

export default page1Routes;
```

```tsx
// router/Router.tsx

import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Page2 from '../Page2';
import page1Routes from './Page1Routes';

const Router: React.FC = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    { /* ここから */ }
    <Route
      path="/page1"
      render={({ match: { url } }) => (
        <Switch>
          {page1Routes.map((route) => (
            <Route
              key={route.path}
              exact={route.exact}
              path={`${url}${route.path}`}
            >
              {route.children}
            </Route>
          ))}
        </Switch>
      )}
    />
    <Route path="/page2">
      <Page2 />
    </Route>
  </Switch>
);
```

## エラー対処

### React Router のコンポーネントでオーバーロードエラー

謎にエラーが発生。
下の issue を参考に修正したら直った。

```json
  "devDependencies": {
    // ...
  - "@types/react-router-dom": "5.3.0",
  + "@types/react-router-dom": "5.3.3",
    // ...
  }
```

参考 : https://github.com/jhipster/jhipster-kotlin/issues/330#issuecomment-1066076698
