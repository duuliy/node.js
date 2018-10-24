//公用引入模块
const express = require("express");
const bodyParser = require("body-parser"); //post请求
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path"); //处理路径
const router = express.Router();
const app = express();
const {fork} = require('child_process'); 
const n = fork(__dirname + './master.js'); 
// const cpus = require('os').cpus(); 



//app.use(logger("dev"));//日志输出


//=======session and cookie==============================
app.use(cookieParser('Simon'));
app.use(session({
    name: "3project", //cookie名称，默认connect.sid
    secret: "123123", //结合其他加密的方式生成secret
    cookie: {
        maxAge: 3000000
    }, //cookie配置：有效时间
    resave: true, //保存(长度为时间)
    rolling: true, //刷新(刷新之后保存的时间)
    saveUninitialized: false //未初始化cookie要不要保存
}));


//post数据读取
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(router); //使用模块





//静态资源
app.use(express.static(__dirname + "/public"));



n.on('message', function (m) {   console.log('PARENT got message:', m); }); 
 
n.send({hello: 'world'});




app.listen(Math.round((1 + Math.random()) * 1000), () => {
    console.log(("服务器9998启动"))
});