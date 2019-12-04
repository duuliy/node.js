var htmlUrl='/index.html' //默认打开的页面
//原生模块
var http2  =  require('http2'); //http模块
var https = require('https');// https模块  用于发起https请求（微信接口要求走https协议）
var c = require('child_process');//子进程 用于打开默认浏览器
var express = require('express'); //express框架
var router = express.Router(); //express框架的路由
var proxy = require('http-proxy-middleware'); //接口代理
const upload = require('multer')({ dest: 'uploads/' });
const path = require('path');
const fs = require('fs');
var app = express();

const http = require('http');


app.use(express.static('static'));



const options = {
  key: fs.readFileSync(path.join(__dirname,"/privkey.key")),
  cert: fs.readFileSync(__dirname +'/CERTIFICATE.crt')
}
http.createServer(app).listen(80);
https.createServer(options, app).listen(443);
