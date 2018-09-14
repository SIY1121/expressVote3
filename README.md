# expressVote3
投票システムのテスト

自分の技術で作成可能かを試したかったのと、技術的にあやふやなところを明確にする目的で作りました。

１日で作ったため、画面にjson垂れ流したりと、UIは作っていないです。
## 仕様
- Node.js
- Express(MVCフレームワーク)
- [MongoDB](https://www.mongodb.com/)(ドキュメント指向データベース)
- [node-qrcode](https://github.com/soldair/node-qrcode)(QRコード生成)
- [instascan](https://github.com/schmich/instascan)(Web上でのQRコードスキャン)

## 実装済み
- 投票機能（Cookieによる多重投票防止機能を含む）
- 投票済みであることを証明するQRコードの発行と認証
- 集計画面（ただのテキスト）

## 未実装
- QRコードを一度読んだら無効化する機能（実装可能）
- recaptcha等のボット対策
- 画面の装飾

## 備考
多重投票防止機能はCookieで実装しているだけなので、ブラウザを変えたりシークレットモードを利用すると、別ユーザーとして投票可能になってしまう。
IPでの防止も可能だが、モバイル回線はグローバルIPを使いまわしてると小耳に挟んだ気がするので、有効かは不明。（情報があれば教えてください）

## 依存関係
- node （es6をサポートしてれば良いと思う、開発環境は10.8.0)
- [MongoDB 4.0.2](https://www.mongodb.com/download-center?jmp=nav#community)(タブからCommunity Serverを選ぶ)

## 実行上の注意
localhostで実行するか、https上でホストしないとWebカメラが使えないのでQRコード読み取りはできません。

## 実行方法
予めmongodb shellで以下を実行
```shell
$ mongo
> use testDatabase
> db.createCollection("vote")
```
シェルで以下を実行
```shell
$ npm install
$ npm start
```
http://localhost:3000 にアクセスする
