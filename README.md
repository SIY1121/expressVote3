# expressVote3
投票システムのテスト

１日で作ったため、画面にjson垂れ流したりと、UIは作っていないです。

## 実装済み
- 投票機能（Cookieによる多重投票防止機能を含む）
- 投票済みであることを証明するQRコードの発行と認証
- 集計画面（ただのテキスト）

## 未実装
- 画面の装飾

## 備考
多重投票防止機能はCookieで実装しているだけなので、ブラウザ変えたりシークレットモードで再投票可能になってしまう。
IPでの防止も可能だが、モバイル回線はグローバルIPを使いまわしてると小耳に挟んだ気がするので、有効かは不明。（情報があれば教えてください）

## 依存関係
- node （es6をサポートしてれば良いと思う、開発環境は10.8.0)
- MongoDB 4.0.2

## 実行方法
予めmongodb shellで以下を実行
```shell
use testDatabase
db.createCollection("vote")
```
シェルで以下を実行
```shell
$ npm install
$ npm start
```
http://localhost:3000 にアクセスする
