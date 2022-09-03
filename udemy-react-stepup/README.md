# Udemy による React の学習

[Reactに入門した人のためのもっとReactが楽しくなるステップアップコース完全版 | Udemy](https://www.udemy.com/course/react_stepup/learn/lecture/24823276)

## 目的

JS / TS の基本、React の高レベルな概要は学んだので、
低レベルの詳細、実装の流れを学んでいきたい。

## コース概要

- 再レンダリング
- CSSの当て方
- ルーティング
- コンポーネントの分割
- グローバルな状態管理
- TypeScript
- Custom Hook
- 実践アプリ開発

## バージョン 等

### work-ground

色々試す用のディレクトリ。

```json
// package.json
{
  // ...
  "dependencies": {
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^12.1.0",
    "@testing-library/user-event": "^13.2.1",
    "@types/jest": "^27.0.1",
    "@types/node": "^16.9.1",
    "@types/react": "^17.0.21",
    "@types/react-dom": "^17.0.9",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "semantic-ui-css": "^2.4.1",
    "semantic-ui-react": "^2.0.3",
    "typescript": "^4.4.3",
    "web-vitals": "^2.1.0"
  },
  // ...
}
```

## 参考リンク

- [Create React AppのプロジェクトをReact17にダウングレードする - Qiita](https://qiita.com/kabosu3d/items/674e287dd068322ca7cf)
  - NOTE: 環境構築用ノートに追加する
- [React×Typescript Eventの型まとめ](https://zenn.dev/kenta0313/articles/a39fb1d8edc3a4)
  - event に型を付けたいときに
- [any型で諦めない React.EventCallback - Qiita](https://qiita.com/Takepepe/items/f1ba99a7ca7e66290f24)
  - props としてコールバック関数を渡したい時の型定義

  ```tsx
  type Props = {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };
  ```

- [Hooks | React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks/#usestate)
  - `useState` などに型を付けたいときに
