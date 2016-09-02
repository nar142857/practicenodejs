/**
 * Created by Administrator on 2016/9/1 0001.
 */
var async = require("async");
var cheerio = require("cheerio");
var superagent = require("superagent");
var url = require('url');
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
            //if(index>10) return;
            var $ele = $(element);
            var href = url.resolve(cnodeurl, $ele.attr('href'));
            urls.push(href);
        });
        console.error('目标url: '+urls);
        var concurrencyCount = 0;
        var fetchUrl = function (url, callback) {
            var title = '';
            var startTime = new Date().getTime();
            concurrencyCount++;
            superagent.get(url)
                .end(function(err, res){
                    if(err){

                        console.error('------------');
                        //console.error(err);
                    }else {
                        var html = res.text;
                        var $ = cheerio.load(html);
                        title = $('.topic_full_title').text().trim();
                        var endTime = new Date().getTime();
                        var delay = endTime - startTime;
                        console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
                        callback(null, title +'    '+ url);
                        concurrencyCount--;
                    }

                });




        };

        async.mapLimit(urls, 5, function (url, callback) {
            fetchUrl(url,callback);

        },
            function (err, result) {
                console.log('final:');
                console.log(result);
            });
    });
