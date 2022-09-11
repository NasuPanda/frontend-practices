# 11-2. コンポーネントの設計

## 命名規則

- 1ファイル1コンポーネント。
- ファイル名とコンポーネント名の一致。
- コンポーネント名は `UserCard` のようなpascalケース、それを参照するために格納した変数名には `userCard` のようなローワーキャメルケース。
- ディレクトリと同名で参照したいコンポーネントを作る際は、 `Footer/Footer.tsx` ではなく `Footer/index.tsx` とする。
- デフォルトエクスポートでも名前を付けておく。

## Solid

具象ではなく抽象に依存するべき。

1. 単一責任の原則
2. オープン/クローズドの原則
3. リスコフの置換原則
4. インターフェイス分離の原則
5. 依存関係逆転の原則

### 具体例

1. 分割可能な複数のUIを1つのコンポーネントに詰め込まない、Custom Hookで分離出来るロジックは分離する
2. メニューバーを表現するコンポーネントがあったとして、メニューの項目が変わる度にそのコンポーネントの props や state に変更が入るようにしない
3. 小クラスで親クラスのプロパティやメソッドを、意味や入出力を変更する形でオーバーライドするのはだめ
4. `User.name` しか使っていないコンポーネントの props に `User` を渡すのではなく、 `name` のみを渡す
5. 子コンポーネントの仕様が親コンポーネントの仕様に引きずられない

## Atomic Design

### ロジックの置き場所について

Presentational / Container のパターンを採用する場合、ロジックの置き場所に困る。

そんな時は、Templates / Pages をなくして、代わりに Ecosystems / Environments を追加するという考え方もある。 参考 : [A brief look at Atomic Components – Joey Di Nardo – Medium](https://web.archive.org/web/20181217154736/https://medium.com/joeydinardo/a-brief-look-at-atomic-components-39cbe71d38b5)

Ecosystems が下位のパーツにデータを流し込む役割もをつ、Container Components に該当する層。
Environments は Pages を SPA に適応させ、静的に別れたページよりもルーティングをベースに分割しようというもの。

### その他

- Atoms ではマージンやポジションを決め打ちしない
- Molecules / Organisms の境界はドメイン知識を持つかどうか
