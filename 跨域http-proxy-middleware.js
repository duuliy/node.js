var htmlUrl='/index.html' //默认打开的页面
//原生模块
var http  =  require('http'); //http模块
var https = require('https');// https模块  用于发起https请求（微信接口要求走https协议）
var c = require('child_process');//子进程 用于打开默认浏览器
var express = require('express'); //express框架
var router = express.Router(); //express框架的路由
var proxy = require('http-proxy-middleware'); //接口代理
var app = express();
//代理地址

var baseUrl2='http://www.yitu2.com';


var baseUrl3='http://192.168.0.127:8888';
//设置app可访问的路劲为static文件夹
app.use(express.static('static'));
//app.use(express.static('build'));
app.use('/controller', proxy({
     target:baseUrl2,
    changeOrigin: true
}));
// app.use('/api', proxy({
//     target:baseUrl,
//     changeOrigin: true
// }));
app.listen(9090,function(){
    console.log("success listen at 9090");
});
