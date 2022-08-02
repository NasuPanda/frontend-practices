# 5. JSXでUIを表現する

# 5-1. なぜReactはJSXを使うのか

## JSXの本質を理解する

JSXとは、RailsにおけるERBのようなテンプレート言語・・・ではない。

JSXと言う名前は、「JavaScript」と「XML」の組み合わせで出来てる。JSXはXMLライクな記述ができるようにしたECMAScript2015に対する構文拡張。
Babel や tsc によりコンパイルされることを前提としたシンタックスシュガー。

例えば、以下のような形で変換される。

```jsx
// JSX
<button type="submit" autoFocus>
  Click Here
</button>
```

```js
// JS
React.createElement(
  'button',
  { type: 'submit', autoFocus: true },
  'Click Here'
);
```

JSXがやっているのは、 `React.createElement` というメソッドのコールへの変換を前提として、XMLタグとその組み合わせによるノードツリーをJavaScriptの中でシームレスに書けるようにすること。
`React.createElement` は、 TypeScriptでは `ReactElement` というインターフェースを下敷きにしたオブジェクトになる。
つまりJSXの構文は、本質的には `ReactElement` オブジェクトを表現するためのJavaScriptの拡張リテラル。

→ JSXはJavaScriptにおいては単なるオブジェクトを表現する式に還元されるものであって、特別な存在ではない。

### 構文拡張とは

言語標準には含まれない特殊用途のための便利な構文を、後づけで使えるようにしたもの。
