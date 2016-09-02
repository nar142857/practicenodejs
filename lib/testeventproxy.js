/**
// * Created by Administrator on 2016/9/1 0001.
// */
var superagent = require("superagent");
var cheerio = require("cheerio");
var eventproxy = require("eventproxy");
var url = require("url");

var cnodeurl = 'https://cnodejs.org/';
//抓取网页

superagent.get(cnodeurl)
    .end(function(err, res) {
        if (err) {
            console.error(err);
        }
        var urls = [];
        var $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each(function (index, element) {
            if(index>3) return;
            var $ele = $(element);
            var href = url.resolve(cnodeurl, $ele.attr('href'));
            //var title = ele.attr('href');
            urls.push(href);


        });
        console.error(urls);


        urls.forEach(function (topicUrl) {
            superagent.get(topicUrl)
                .end(function (err, res) {
                    if (err){console.error('!!!!!!!!!'+err)}
                    console.log('fetch ' + topicUrl + ' successful');
                    ep.emit('reqhtml', [topicUrl, res.text]);
                });

        });
        var ep = new eventproxy();
        ep.after('reqhtml', urls.length, function (list) {
                var result =list.map(function(ele){   //map 和each差不多  只是要有返回值
                var topicUrl = ele[0];
                var html = ele[1];
                var $ = cheerio.load(html);
                var title = $('.topic_full_title').text().trim();
                var href =topicUrl;
                var comment1 = $('#reply1 .markdown-text').text().trim();

                return ({
                    title:title,
                    href: href,
                    comment1: comment1
                });
            });
          console.error(result);

        });
    });



var a= [
    {
        "title": "【公告】发招聘帖的同学留意一下这里",
        "href": "http://cnodejs.org/topic/541ed2d05e28155f24676a12",
        "comment1": "呵呵呵呵"
    },
    {
        "title": "发布一款 Sublime Text 下的 JavaScript 语法高亮插件",
        "href": "http://cnodejs.org/topic/54207e2efffeb6de3d61f68f",
        "comment1": "沙发！"
    }
];


//var eventproxy = require('eventproxy');
//var superagent = require('superagent');
//var cheerio = require('cheerio');
//var url = require('url');
//
//var cnodeUrl = 'https://cnodejs.org/';
//
//superagent.get(cnodeUrl)
//    .end(function (err, res) {
//        if (err) {
//            return console.error(err);
//        }
//        var topicUrls = [];
//        var $ = cheerio.load(res.text);
//        $('#topic_list .topic_title').each(function (idx, element) {
//
//            if(idx>3) return;
//            var $element = $(element);
//            var href = url.resolve(cnodeUrl, $element.attr('href'));
//            topicUrls.push(href);
//        });
//
//        var ep = new eventproxy();
//
//        ep.after('topic_html', topicUrls.length, function (topics) {
//            //topics = topics.map(function (topicPair) {
//            //    var topicUrl = topicPair[0];
//            //    var topicHtml = topicPair[1];
//            //    var $ = cheerio.load(topicHtml);
//            //    return ({
//            //        title: $('.topic_full_title').text().trim(),
//            //        href: topicUrl,
//            //        comment1: $('.reply_content').eq(0).text().trim(),
//            //    });
//            //});
//
//            //var topicUrl = topics[0];
//            //var topicHtml = topics[1];
//            //var $ = cheerio.load(topicHtml);
//            //var topics={
//            //    title: $('.topic_full_title').text().trim(),
//            //        href: topicUrl,
//            //    comment1: $('.reply_content').eq(0).text().trim(),
//            //};
//            //
//            //console.log('final:');
//            //console.log(topics[0]);
//        });
//
//        topicUrls.forEach(function (topicUrl) {
//            superagent.get(topicUrl)
//                .end(function (err, res) {
//                    console.log('fetch ' + topicUrl + ' successful');
//                    ep.emit('topic_html', [topicUrl, res.text]);
//                });
//        });
//    });
