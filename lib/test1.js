/**
 * Created by Administrator on 2016/8/29 0029.
 */
var express = require('express');
var utility = require("utility");

var app = express();

app.get('/', function (req, res) {
    var q = req.query.q;
    var md5q = utility.md5(q);
    res.send(md5q);
});
app.listen(3002, function () {
    console.log('listenning 3002');
});

var md5 = utility.md5('chentaiji');
console.log(md5);
var md52 = utility.md5(md5);
console.log(md52);

////
[
    {
        "chapter": "\r\n                            \r\n                            第1章  从Promise 讲起\r\n                            \r\n                                \r\n                                    \r\n                                        本章节先从Promise讲起，讲师最后会带领小伙伴做一个实战小例子。\r\n                                    \r\n                                \r\n                            \r\n                        \r\n                            \r\n                            第2章 横扫 Nodejs API\r\n                            \r\n                                \r\n                                    \r\n                                        本章节会带领大家横扫两个 Nodejs API：Buffer、 Stream 流动的数据，当然最后还有小的实战练习。\r\n                                    \r\n                                \r\n                            \r\n                        "
    }
]