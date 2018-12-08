var express = require('express');
var router = express.Router();
let mysql = require("mysql");

let config = {
    port: 5244,
    host: "localhost",
    database: "jude",
    user: "root",
    password: "KS18835194520"
};
/* GET home page. */


//创建连接池

let connection = mysql.createPool(config);
//渲染的数据接口
router.get('/', function(req, res, next) {
    connection.getConnection((err, connect) => {
        if (err) console.log(err, "连接数据库");
        let sql = `select * from zkjc`
        connect.query(sql, (err, datas) => {
            if (err) console.log(err, "执行数据库")
            console.log(datas);
            res.send({ code: 1, data: "链接成功" })
        })
    })
});
//添加数据的接口
router.post('/adds', function(req, res, next) {
    let { imgsrc, prices, discribe, collectCount } = req.body;
    connection.getConnection((err, connect) => {
        if (err) console.log(err, "连接数据库");
        let id = Math.floor(Math.random() * 9000) + 1000
        let sql = `insert into zkjc(id,imgsrc,prices,discribe,collectCount) values(${id},'${imgsrc}',${prices},'${discribe}','${collectCount}')`
        connect.query(sql, (err, datas) => {
            if (err) console.log(err, "执行数据库")
            console.log(datas);
            res.send({ code: 1, data: "链接成功" })
        })
    })
});
module.exports = router;