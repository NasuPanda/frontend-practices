# いろいろなCSSの当て方

## インライン

- CSSをのスタイルを記述したオブジェクトをコンポーネントの `style` 属性に渡せばいい。
- CSS とは異なり、 camelCase で記述する。

```tsx
const InlineStyleComponent: React.VFC = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
  };
  const titleStyle = {
    width: '80%',
    color: 'red',
    borderRadius: '20px',
  };
  const buttonStyle = {
    color: 'fff',
    backgroundColor: '#6ce',
    padding: '8px',
    margin: '8px',
    borderRadius: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>inline style test</h1>
      <button type="button" style={buttonStyle}>This is a button</button>
    </div>
  );
};
```

## CSS Modules

"node-sass" のインストールが必要。

```zsh
yarn add node-sass
typesync
yarn
```

- ファイル名を `対応するコンポーネント.module.scss` とする。
- 使用する側では、 `importした変数名.クラス名` という形で使用する。

```scss
// CssModules.module.scss
.container {
  display: flex;
  justify-content: space-around;
}
.title {
  color: red;
};
.button {
  color: fff;
}

```

```tsx
// CssModules.tsx
import classes from './CssModules.module.scss';

const CssModulesComponent: React.VFC = () => (
  <div className={classes.container}>
    <h1 className={classes.title}>CSS Modules</h1>
    <button type="button" className={classes.button}>
      This is a button
    </button>
  </div>
);

export default CssModulesComponent;
```

## StyledJSX

Next.js で採用されている。

インストール。

```zsh
yarn add styled-jsxs
```

`style` タグに `jsx` 属性を記述、その中に css のスタイルを書く。

```tsx
const StyledJsxComponent: React.FC = () => (
  <>
    <div className="container">
      <h1 className="foo">Styled JSX</h1>
      <button type="button" className="submit-button">
        This is a button
      </button>
    </div>
    <style jsx>{`
      .container {
        display: flex;
        justify-content: space-around;
      }
      .foo {
        width: 80%;
        color: red;
        border-radius: 20px;
      }
      .submit-button {
        padding: 8px;
        margin: 8px;
        color: fff;
        background-color: #6ce;
        border-radius: 20px;
      }
    `}</style>
  </>
);

export default StyledJsxComponent;
```

### Error: `Property 'jsx' does not exist on type 'DetailedHTMLProps<StyleHTMLAttributes<HTMLStyleElement>`

[Typescript typings · Issue #90 · vercel/styled-jsx](https://github.com/vercel/styled-jsx/issues/90)

## StyledComponent

インストール。

```zsh
yarn add styled-components
typesync
yarn
```

`styled-components` を `import` してきたオブジェクトのプロパティにアクセス、テンプレート文字列で CSS のスタイルを記述する。

```tsx
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 8px;
  margin: 8px;
  background-color: #6ce;
  border-radius: 20px;
`;
const Title = styled.h1`
  color: red;
`;
const Button = styled.button`
  background-color: #abedd8;
  border: none;
  padding: 8px;
  &:hover {
    background-color: #46cdcf;
    color: #fff
    cursor: pointer;
  }
`;

const StyledComponentsComponent: React.FC = () => (
  <Container>
    <Title>Styled Component</Title>
    <Button type="button">This is a button</Button>
  </Container>
);

export default StyledComponentsComponent;

```

### 既存スタイルの拡張

`styled(OtherComponentStyle)` とすることで、既存スタイルを拡張することが出来る。

```tsx
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
import styled from 'styled-components';
import BaseButton from './BaseButton';

const SButton = styled(BaseButton)`
  background-color: #40514e;
`;

const PrimaryButton: React.FC = ({ children }) => (
  <SButton type="button">{children}</SButton>
);
```


## Emotion

多機能なライブラリ。

```zsh
yarn add @emotion/react @emotion/styled && typesync && yarn
```

コードの先頭に `/** @jsx jsx */` と記述。(環境によってはその上の `/** @jsxRuntime classic */` も必要)
StyledComponents ライクな記述、インラインライクな記述、CSS そのままなど。

```tsx
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled';

// StyledComponents ライクに
const StyledButton = styled.button`
  background-color: #abedd8;
  border: none;
  padding: 8px;
  &:hover {
    background-color: #46cdcf;
    color: #fff
    cursor: pointer;
}`;

const EmotionComponent: React.FC = () => {
  // CSS をそのまま記述
  const containerStyle = css`
    display: flex;
    justify-content: space-around;
    padding: 8px;
    margin: 8px;
    background-color: #6ce;
    border-radius: 20px;
  `;

  // インラインライクに
  const titleStyle = css({
    width: '80%',
    color: 'red',
    borderRadius: '20px',
  });

  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>Emotion</h1>
      <StyledButton type="button">This is a button</StyledButton>
    </div>
  );
};

export default EmotionComponent;
```

