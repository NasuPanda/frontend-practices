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
