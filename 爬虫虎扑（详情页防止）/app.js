//失败，因为详情页做了防爬虫处理，只能爬接口 用pathon


const superagent = require('superagent');  
//nodejs里一个非常方便的客户端请求代理模块
const cheerio = require('cheerio'); 
//Node.js 版的jQuery
const async = require('async'); 
 
const fs = require('fs');
//fs操作IO
const url = require('url');

const request =require('request');
const hupuUrl = 'https://bbs.hupu.com/selfie-1';


let ssr = []; //存信息
let allUrl = []; //存url的
let curCount = 0;

//缺一下图片的方法
const downloadImg = (url,filename)=>{
    request.head(url,(err,res,body)=>{
      //会有 //www.baidu.com/xx.jpg  和 http://www.baidu.com/xx.jpg 这种情况
      request(url).pipe(fs.createWriteStream(path.resolve(__dirname,`images/${filename}.${path.extname(url)}`)))
    })
}

for (let i = 1; i <= 4; i++) {
    hupuUrl2 = 'https://bbs.hupu.com/selfie-' + i;
    hupuUrl3 = 'https://bbs.hupu.com';
    // hupuUrl2="https://bbs.hupu.com/24195588.html"
//for循环把五页的页面循环出来
    superagent.get(hupuUrl2)
//通过superagent去请求每一页
        .end(function (err, res) {
            if (err) {
                return console.error(err);
            }
//cheerio  nodejs版的JQ 
            let $ = cheerio.load(res.text);
//获取首页所有的链接
            // console.log($('.titlelink>a:first-child'))
            $('.titlelink>a:first-child').each(function (idx, element) {
                let $element = $(element);
                // console.log(element)
                // console.log(999)
                let href = hupuUrl3+$element.attr('href');
                allUrl.push(href);
                curCount++;
//获取到此url，异步进行以下操作，此操作为进入到这个帖子中爬取数据
                superagent.get(href)
                    .end(function (err, res) {
                        if(err){
                            return console.error(err);
                        }
                        let $ = cheerio.load(res.text);
                        let add = href;
                        let title = $('.bbs-hd-h1>h1').attr('data-title');//帖子标题
                        let tximg = $('.headpic:first-child>img').attr('src');//用户头像
                        let txname = $('.j_u:first-child').attr('uname');//用户ID
                        let contentimg1 = $('.quote-content>p:nth-child(1)>img').attr('src');//爆照图1
                        let contentimg2 = $('.quote-content>p:nth-child(2)>img').attr('src');//爆照图2
                        let contentimg3 = $('.quote-content>p:nth-child(3)>img').attr('src');//爆照图3
                        ssr.push({
                            'tx': tximg,
                            'name': txname,
                            'pic': contentimg1,contentimg2,contentimg3
                        });
                        console.log($('.bbs-hd-h1>h1'))
                        console.log(11)
//把数据存储到一个对象里   
                        let stad = {
                            "address": add,
                            "title":title,
                            "ID" : txname,
                            "touxiang" : tximg,
                            "pic1" : contentimg1,
                            "pic2" : contentimg2,
                            "pic3" : contentimg3
                        };
                        let picArr = [contentimg1,contentimg2,contentimg3];
                        //console.log(stad);
//通过fs模块把数据写入本地json
                        fs.appendFile('data/result1.json', JSON.stringify(stad) ,'utf-8', function (err) {
                            if(err) throw new Error("appendFile failed...");
                            //console.log("数据写入success...");
                        });
//定义一个以title为文件夹名的路径，作为以后下载图片时使用
                        let lujin = 'data/' + title + '/';
//判断文件夹是否存在
                        fs.exists('data/pic',function (exists) {
                            if(!exists){
                                fs.mkdir("data/pic", function(err) {
                                    if (err) {
                                        throw err;
                                    }
                                    async.mapSeries(picArr,function(item, callback){
                                        setTimeout(function(){
//downloadPic方法下载图片
                                            downloadPic(item, 'data/'+ (new Date()).getTime() +'.jpg');
                                            callback(null, item);
                                        },400);
                                    }, function(err, results){});
                                });
                                console.log('ye')
                            }else {
                                // console.log('er')
                            }
                        })
                    })
            });
        });
}
