# Reduxでグローバルな状態を扱う

React ではコンポーネントそれぞれが状態を持つ。
そのため、ログインなどのグローバルに保持しておきたい状態の管理に問題を抱えていた。

その解決策となったのが Flux パターン、及びその実装である Redux というライブラリ。


# 11-1. Redux の歴史

## Fluxパターン

![flux-pattern](../../images/8639fd865b61ac1ce2f1741e040d5daef508367291f71c61e7e86bbd4b2f64f2.png)

- Store ...... アプリケーション全体で参照したい状態データの保管庫
- Action ...... イベントにおける『何をどうしたいか』という意図を表現したもの
- Dispatcher ......actionの種類を判断して、それにひもづけられたstoreの更新処理を行うもの

### 見るべき動画

https://www.youtube.com/watch?v=xsSnOQynTHs

#
