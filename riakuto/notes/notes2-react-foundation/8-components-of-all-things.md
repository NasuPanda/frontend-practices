# 8. 何はなくともコンポーネント

# 8-1. コンポーネントのメンタルモデル

## おさらい

Reactは「コンポーネント」という**見た目と機能をカプセル化した再利用可能なパーツ**を組み合わせることでアプリケーションを作る、コンポーネントベースアーキテクチャを採用している。

Reactは仮想DOMをリアルなDOMにレンダリングすることで動作する。
その仮想DOMを構成するのが React Elements。 React Elements はコンポーネントを任意の props でコールするための実行リンクのようなもの。

Scratch のようなビジュアルプログラミングは、用意されたビジュアルブロックをドラッグしてきてロジックの実体に起き、そこに各種パラメータを設定する。
そのイメージで、ブロックの実体がコンポーネント、ロジックの画面にパラメータ付きで置かれたブロックの仮身が React Elements。

## コンポーネントのイメージ

コンポーネントは、JavaScriptの関数のようなものと考えるのが一番近い。
props を引数として受け取り、返り値として React Elements を返す関数。

ただし、コンポーネントが通常の関数と違うのは、個々に「状態」を持つことが出来る点。これを state と呼ぶ。
props か state が変更されれば、コンポーネントのレンダリングに差分が発生する。

仮想DOMの再レンダリングも同じ考え方で理解できる。
Reactの差分検出エンジンは、仮想DOM内の React Elements を全て監視していて、そのどれかの props または 保持している state の値に差分を検出すると、そのコンポーネントのレンダリング処理を再実行する。

たとえばブラウザ上で何らかのイベントが発生し、そこに対応している React Elements の state が 変化したとする。
すると差分検出処理エンジンがそれを検知、新しい state でそのコンポーネント関数を再実行する。
その結果、戻り値の React Elements も変更が生じ、子要素としてコールしていたコンポーネントやその props の値が変わる。
そしてそれらのコンポーネントが新しい props で実行され、、、

といった形でその再レンダリングの波が子孫の要素に連鎖していく。
イメージとしてはぷよぷよに近い。

# 8-2. コンポーネントと props

props と state の内、重要度は props > state 。
何故なら state は極力持つべきではないから。(副作用の原因となるため)

props とはコンポーネントにとっての引数のようなもの。properties を短くして props と呼んでいる。

### VFC vs FC

従来の `FC` で定義された関数コンポーネントだと、子要素の操作が必要ない場合でも暗黙の内に props の中に子要素のオブジェクトが渡されていた。
より安全にコーディングするには、子要素をいじっているコンポーネントなのかどうか型で明記されていた方が良い、ということで、現在子要素をいじらない関数コンポーネントの型定義には `VFC` を使うことがコミュニティで推奨されている。

これは TypeScript の話なので一般の開発者には理由がわかりにくい。
こういった話は [React TypeScript Cheatsheets | React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/) に載っている。
TypeScript で React を使うにはかなり参考になるドキュメントの上、頻繁にアップデートが掛けられていてトレンドもわかるので、とりあえず参照しておくと良い。

### `Props` の型定義

以下にサンプルコード。

```tsx
import { VFC } from "react";
import { Header, Icon, Item } from "semantic-ui-react";

export type Character = {
  id: number;
  name: string;
  grade: number;
  height?: number;
};

type Props = {
  school: string;
  characters: Character[];
};

const CharacterList: VFC<Props> = ({ school, characters }) => (
  <>
    <Header as="h2">{school}</Header>
    <Item.Group>
      {characters.map((character) => (
        <Item key={character.id}>
          <Icon name="user circle" size="huge" />
          <Item.Content>
            <Item.Header>{character.name}</Item.Header>
            <Item.Meta>{character.grade}年生</Item.Meta>
            <Item.Meta>
              {character.height ?? "???"}
              cm
            </Item.Meta>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  </>
);

export default CharacterList;
```

まず見るべきなのは、 `Props` という型エイリアスを定義しているところ。
この型はコンポーネントを定義する関数宣言の型適用で使われている。

その下のコンポーネント関数に型を適用しているところでは、 `VFC<Props>` というジェネリクスがある。
このように `VFC` ( `FC` ) に型引数を渡すことで、そのコンポーネントの props の型を指定できる。
props の型を設定することで、そのコンポーネントを JSX でマウントするときに必要な属性値とその型に縛りが発生する。

props から `school` と `characters` を抽出する分割代入の処理を引数に書いている。
この関数は値を1つ返すだけなので、 `return` 文を省略出来る。

なお、 props が無い場合はからオブジェクトを渡して `FC<{}>` とするのが正しい。が、定義の方で `{}` がデフォルト値として設定されているので省略出来る。
