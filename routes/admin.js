const express = require('express');
const router = express.Router();

/* 管理パネルのページ */
router.get('/', (req, res) => {
    res.render('admin/index');
});
/* QR スキャンのページ */
router.get('/scan', (req, res) => {
    res.render("admin/scan");
});
/* QR スキャンで使用する認証用api */
router.post('/scan/auth_api', async (req, res) => {
    const db = require("../utils/databaseManager");
    const result = await db.authQRCode(req.body);
    res.send({"result": result})
});
/* 集計結果を出力するAPI */
router.get('/aggregate_api', async (req, res) => {
    const db = require("../utils/databaseManager");
    res.send(await db.aggregate())
});
module.exports = router;
