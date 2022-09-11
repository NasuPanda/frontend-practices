# 優先度の低いレンダリングを遅延させる

フォームの入力値をリアルタイムで何らかの重い処理にリンクしていると、入力の反応が鈍くなっったり画面がガタつく事がある。

例 : インクリメンタルサーチ (1文字入力するごとに検索結果がリアルタイムに変わる)

React 18 ではあらかじめ任意の state 更新における緊急性をマークしておくことで、緊急性の低い更新を必要に応じて遅らせることが出来る機能が追加された。

## サンプルコード

`useDeferredValue` という Hooks API を使う。この API の戻り値をコンポーネントに適用すると、より緊急性の高いレンダリングがあるときに遅延されるようになる。

この時、遅延する値を適用するコンポーネントをメモ化して、依存配列にその値を入れる必要がある。

```tsx
const deferredUsername = useDeferredValue(username);

const deferredUsers = useMemo(
  () => <Users username={deferredUsername} count={count} />,
  [deferredUsername, count]
);
```
