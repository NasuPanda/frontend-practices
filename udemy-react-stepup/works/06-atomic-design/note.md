# Atomic Design

## 開発の進め方

- どの階層でも共通して、ドメインや役割ごとにディレクトリを分ける ( ユーザに関連するコンポーネントは `atoms/user` 配下、など )

1. 必要となる atoms から作る
2. いくつか atoms が出来たらそれを組み合わせて出来る molecules を作る
3. atoms, molecules を複数作ったらそれを組み合わせて organisms を作る
4. organisms を作る中で共通化できそうな箇所、使いまわせそうな箇所があれば atoms, molecules として切り出していく

## 概要

コンポーネントを適切な粒度で分割するための手法の一種。

### Atoms

Atom : 原子

最小構成要素。

例 : アイコン、ボタン

### Molecules

Molecule : 分子 (モラキュールズ)

Atoms の組み合わせからなる部品。

例 : アイコン + 入力ボックス、アイコンセット

### Organisms

Organisms : 生物

Atoms や Molecules の組み合わせからなる、単体で意味を持つ要素群。

例 : サイドメニュー、ツイートエリア(アイコンセット + 入力ボックス)

### Templates

レイアウト情報。
注意点として、実データは持たないこと。

### Pages

1つのページ。

## 最終的な成果物

![deliverables-this-section](../../images/a702c7021c50dca1461be5f265eb5aa5c33854f6170069b9faff8e6cd7c20efc.png)

## Atoms の例

```tsx
// PrimaryButton.tsx
import styled from 'styled-components';

const SButton = styled.button`
  background-color: #40514e;
  color: #fff;
  padding: 6px 24px;
  border: none;
  border-radius: 100px;
  outline: none;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

// NOTE : props は外から受け取るべき
const PrimaryButton: React.FC = ({ children }) => (
  <SButton type="button">{children}</SButton>
);

export default PrimaryButton;
```

### 共通部分を切り出す

実際のアプリケーションでは1つの部品が複数存在することが多い。
(`PrimaryButton` に加えて `SecondaryButton` も追加したい、など)

そうなった場合、共通部分は切り出しておくと良い。

```tsx
// BaseButton.tsx
import styled from 'styled-components';

// 共通部分を切り出したベースとなるボタン
const BaseButton = styled.button`
  color: #fff;
  padding: 6px 24px;
  border: none;
  border-radius: 100px;
  outline: none;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export default BaseButton;
```

```tsx
// PrimaryButton.tsx
import styled from 'styled-components';
import BaseButton from './BaseButton';

const SButton = styled(BaseButton)`
  background-color: #40514e;
`;

const PrimaryButton: React.FC = ({ children }) => (
  <SButton type="button">{children}</SButton>
);


// SecondaryButton.tsx
import styled from 'styled-components';
import BaseButton from './BaseButton';

const SButton = styled(BaseButton)`
  background-color: #11999e;
`;

const SecondaryButton: React.FC = ({ children }) => (
  <SButton type="button">{children}</SButton>
);
```

## Molecules の例

検索ボックス + 検索ボタンを作ってみる。

atoms で /button と /input を用意。

```tsx
import styled from 'styled-components';
import Input from '../atoms/input/Input';
import PrimaryButton from '../atoms/button/PrimaryButton';

const SContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SButtonWrapper = styled.div`
  padding-left: 8px;
`;

const SearchInput: React.FC = () => (
  <SContainer>
    <Input placeholder="検索条件を入力" />
    <SButtonWrapper>
      <PrimaryButton>検索</PrimaryButton>
    </SButtonWrapper>
  </SContainer>
);

export default SearchInput;
```

`SButtonWrapper` で `PrimaryButton` ⇔ `Input` 間に `padding` を挿入。

`SContainer` で要素を横並びにしている。

![molecules-search-input](../../images/66649447b88a4adce4a2b0ea71261e6703cd598b8504942a7b243773464e54b7.png)

## Organisms の例

atoms, molecules を組み合わせて作る。

![organisms-user-card](../../images/5892b64da6fee6668269fa81f28b01ed7913d817a094e07306eb22c8528bfd71.png)

## Templates の例

ヘッダー / ページ要素 / フッターという構成にしてみる。

![template-header-and-footer](../../images/117e057da8c382f5b039be3791e0774eb3d465f3d7d8afc3c7976e1e82792515.png)

`atoms/layout/` の配下に `Footer.tsx` と `Header.tsx` をそれぞれ作り、それを呼び出す形。

```tsx
// DefaultLayout.tsx
import Header from '../atoms/layout/Header';
import Footer from '../atoms/layout/Footer';

const DefaultLayout: React.FC = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default DefaultLayout;
```

```tsx
// Header.tsx
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
```

### フッター

- 全体のレイアウトで `min-height: 100vh;` を指定しておく
- `position` で固定位置に
- `bottom` で画面の下端に
- `width` で画面いっぱいに広がるように

```tsx
// Footer.tsx
import styled from 'styled-components';

const SFooter = styled.footer`
  background-color: #11999e;
  color: #fff;
  text-align: center;
  padding: 8px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const Footer: React.VFC = () => <SFooter>&copy; 2022 test Inc.</SFooter>;

export default Footer
```

## Pages の例

### 各ページの定義

`grid` 部分に注目。

```tsx
import styled from 'styled-components';
import SearchInput from '../molecules/SearchInput';
import UserCard from '../organisms/user/UserCard';
import users from '../../data/testData';

const SContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const SUserArea = styled.div`
  padding-top: 40px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
`;

const UsersPage: React.FC = () => (
  <SContainer>
    <h2>User一覧です</h2>
    <SearchInput />
    <SUserArea>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </SUserArea>
  </SContainer>
);

export default UsersPage;
```

### ルーティングの切り出し

`router/Router.tsx` にルーティングを切り出す。

```tsx
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
```