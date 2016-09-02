/**
 * Created by Administrator on 2016/8/29 0029.
 * 网页爬虫
 */
var express =  require ('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();
var url = 'https://cnodejs.org/';
//爬https://cnodejs.org/
//app.get('/', function (req, res, next) {
//    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
//    superagent
//        .get(url)
//        .end(function (serr, sres){
//            // 常规的错误处理
//            if(serr){
//                console.error(serr);
//            }else {
//                // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
//                // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
//                // 剩下就都是 jquery 的内容了
//                var $ = cheerio.load(sres.text);
//                var items = [];
//                $('#topic_list .topic_title').each(function (index, element) {
//                    console.log(element);
//                    console.log('----------------------------------------------------');
//                    items.push({
//                        title:$(element).attr('title'),
//                        href:$(element).attr('href')
//                    });
//                });
//
//                res.send(items);
//            }
//
//        });
//
//
//}).listen(3003,function(){
//    console.log('listenning port 3003');
//});

//爬慕课网

var url2 ='http://www.imooc.com/learn/637';

//在本机地址3004端口输出

//app.get('/',function(req, res){
    //获取目标网页内容
    superagent.get(url2).end(function(serr, sres){
        if(serr){
            console.error(serr);
        }else{
            //加载目标网页到cheerio
            var $ = cheerio.load(sres.text);
            var items = [];
            //筛选需要的信息
            $('.mod-chapters .chapter ').each(function(index, element){
                //console.log(element);
                //console.log(index);
                var chapter =  $(element);
                var chapterTitle = chapter.find('strong').text().split('\r\n')[2].split('                            ')[1];
                var videos = chapter.find('.video').children('li');
                var video = [];
                videos.each(function(index,ele){
                    video.push({
                        title:$(ele).find('icon-video').text(),
                        //id:$(ele).find('href').split('video/')[1],
                        href:$(ele).find('href')
                    });
                });
                items.push({
                    chapterTitle:chapterTitle,
                    video:video
                });
            });
            //res.send(items);
            console.log(items);
        }
    })
//}).listen(3004,function(){
//    console.log('listenning port 3004');
//});