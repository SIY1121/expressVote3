const express = require('express');
const router = express.Router();

//投票トップ
router.get('/', async (req, res) => {
    const db = require("../utils/databaseManager");
    const userData = await db.getUserStatus(req.session.id);
    const QRCode = require('qrcode');

    const qrCodeData = await QRCode.toDataURL(JSON.stringify({"dbid": userData.databaseID, "usrid": req.session.id}));

    res.render('vote/index', {data: userData, sessionID: req.session.id, qrData: qrCodeData});
});

//投票するページ
router.get('/req/:id', async (req, res) => {
    const db = require("../utils/databaseManager");
    const userData = await db.getUserStatus(req.session.id);
    res.render("vote/req", {vote: req.params.id, data : userData})
});

//投票フォームをPOSTする場所
router.post('/req/submit', async (req, res) => {
    const db = require("../utils/databaseManager");
    const voteRes = await db.vote(req.body.vote, req.session.id);
    console.log(voteRes.result);
    res.redirect("/vote");
});

module.exports = router;
