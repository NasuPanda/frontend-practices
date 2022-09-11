# asdf

anyenv の代替として優秀。
速い。

# npm にデフォルトでインストールしたいパッケージ

## nodenv の場合

参考 : [nodenvでいつも使うパッケージを自動でインストールする - Qiita](https://qiita.com/tea-red/items/361c72df55b3fcd0e0bf)

プラグインをインストールしたら `default-packages` ファイルに書き込むだけ。

```zsh
vi $(nodenv root)/default-packages
```

## asdf の場合

以下のようなファイルを用意。
ts-node などを書いておく。

```zsh
$ cat ~/.default-npm-packages
yarn
typescript
ts-node
typesync
npm-check-updates
```
