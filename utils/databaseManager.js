const MongoClient = require("mongodb");
const assert = require("assert");

/* データベースへの接続後モジュールをエクスポートするため
 * 起動後の数秒はモジュールを使用できない
*/
MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true}, (err, client) => {
    assert.equal(null, err);

    const db = client.db("testDatabase");
    const collection = db.collection("vote");

    console.log("データベースへの接続完了");
    console.log("準備完了\n OPEN localhost:3000");

    /**
     * 投票を行う
     * @param vote {String} 投票するvoteID
     * @param sessionID {String} 投票するユーザーのID
     * @returns {Promise<result>}
     */
    exports.vote = async (vote, sessionID) => {
        const res = await collection.find({"sessionID": sessionID}).toArray();
        //投票済みの場合
        if (res.length === 1) {
            return await collection.updateOne({"sessionID": sessionID}, {$set: {vote: vote}})
        } else {
            return await collection.insertOne({"vote": vote, "sessionID": sessionID})
        }
    };

    /**
     * ユーザーの現在の状態を取得
     * @param sessionID {String}
     * @returns {Promise<{vote: *, databaseID: *}>}
     */
    exports.getUserStatus = async (sessionID) => {
        let vote = null;
        let databaseID = null;
        const res = await collection.find({"sessionID": sessionID}).toArray();

        //コレクションに１件見つかった場合（正常に投票済み）
        if (res.length === 1) {
            vote = res[0].vote;
            databaseID = res[0]._id;
        }

        return {"vote": vote, "databaseID": databaseID}
    };
    /**
     * QRコードの情報を認証する
     * @param data
     * @returns {Promise<boolean>}
     */
    exports.authQRCode = async (data) => {
        const res = await collection.find({"sessionID": data.usrid}).toArray();
        return res.length === 1 && res[0]._id == data.dbid;//typeof res[0]._id = object なため ==
    }

    exports.aggregate = async () => {
        return await collection.aggregate([
            {$group: {"_id": "$vote", "count": {"$sum": 1}}},
            {$sort: {count: -1}}
        ]).toArray()
    }

});


