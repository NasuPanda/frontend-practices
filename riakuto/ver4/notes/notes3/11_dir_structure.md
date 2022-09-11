# 11-3. プロジェクトのディレクトリ構成

## Bulletproof React

[bulletproof-react/project-structure.md at master · alan2207/bulletproof-react](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)

```
src/ assets/
  components/
  config/
  features/
    awesome-feature/
      api/
      assets/
      components/
      hooks/
      routes/
      stores/
      types/
      utils/
  hooks/
  lib/
  providers/
  routes/
  stores/
  test/
  types/
utils/
```

`features/` 配下には機能ごとに必要なファイルを外と同じ構造で分けて格納している。

`src/`配下の `components` や `hooks` はこれらの feature に該当しない共通のコンポーネントや Custom Hook ということ。

ある機能が必要なくなったら、ディレクトリごと削除すれば良い点が利点。
また、 `features/awesome-future/` 直下に `index.ts` をおいてインポートを集約することで、インポート分がスッキリすることもポイント。

## ディレクトリ構成例

```
src/
  components/
    atoms/
    molecules/
    organisms/
    ecosystems/
    templates/
    environments/
  features/
    awesome-feature/
        components/
        hooks/
        utils/
        assets/
  routes/
  providers/
  stores/
  hooks/
  utils/
  assets/
  domains/
    api/
    types/
    awesome-domain/
      api/
      types/
      constants.ts
constants.ts
```

### 解説

#### `templates/`

純粋な Presentational component

#### `environments/`

ルーティングやクエリパラメータの取り回し、ページトップで外部からデータを取得したい場合など、つなぎ込み用の container component を置く。 container component のページ全体を対象としたもの。

#### `ecosystems/`

container component のパーツ的なもの。

#### `domains/`

ドメインに関係した API や型を置くためのもの。

`domains/` ルートはそのアプリケーションのドメインに対応。

外部の Web API を使う場合は、 `domains/github` のようにする。

あるコンポーネントが Molecules なのか Organisms なのかは、この `domains/` 配下のモジュールをインポートしているかどうかで決まる。

#### `routes/`

ルーティングに関連するファイル。

ルーティングをネストさせて各階層でファイルを分割、できるだけパス構造に近い形で置く。

ルーティングのファイルからは1ページに付き1つの Templates または Environments が呼ばれるようにする。

#### `stores/`

状態管理ライブラリや Context を使う場合、関連ファイルを置く。
