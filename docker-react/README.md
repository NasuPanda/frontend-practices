# RailsAPI × TypeScriptReact Docker環境構築

参考 : [【Docker】Rails6 API + React（TypeScript）のSPA開発環境を構築する - Qiita](https://qiita.com/taki_21/items/613f6a00bc432d1c221d#3-1-%E5%90%84%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E7%B7%A8%E9%9B%86)

## 起動方法

```sh
docker-compose up -d
```

## 手順

`Gemfile` だけ Docker ⇔ ローカル で同期をとっているが、本来は `package.json` も同期をとる。はず。

1. ディレクトリ構成の確認、必要なファイルの用意
2. `docker-compose.yml` の編集
3. API側の環境構築
   1. 各ファイルの編集
   2. Railsアプリケーション作成
   3. ビルド (`Gemfile` の同期をとるため)
   4. `database.yml` の編集
   5. DB 作成
4. Front側の環境構築
   1. `docker-compose.yml` に Front側の処理追加
   2. `Dockerfile` 編集
   3. ビルド
   4. アプリケーション作成
5. コンテナ立ち上げ
