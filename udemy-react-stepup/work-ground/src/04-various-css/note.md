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
  color: 'red';
};
.button {
  color: 'fff';
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

### Error: `Property 'jsx' does not exist on type 'DetailedHTMLProps<StyleHTMLAttributes<HTMLStyleElement>`

[Typescript typings · Issue #90 · vercel/styled-jsx](https://github.com/vercel/styled-jsx/issues/90)
