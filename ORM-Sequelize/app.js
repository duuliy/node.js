/*所有第三方的模块引入*/
const express = require("express");
const logger = require("morgan"); //日志
const favicon = require("serve-favicon");//小图标
const bodyParser = require("body-parser");  //处理POST数据
const path = require("path"); //处理路径

const session = require("express-session");
const cookieParser = require("cookie-parser");

/*自己写的模块引入*/
const route = require("./routes/fileRoutes.js")

// --把express调用》》创建项目的实例,搭建了服务器
const app = express();

app.use(cookieParser());
app.use(session({
    name:"react-syudu",  //cookie名称，默认connect.sid
    secret:"123456", //结合其他加密的方式生成secret
    cookie:{maxAge:300000}, //cookie配置：有效时间
    resave:true,//保存(长度为时间)
    rolling:true,//刷新(刷新之后保存的时间)
    saveUninitialized:true    //未初始化cookie要不要保存
}));



//=========EXPRESS配置============
//__dirname全局变量，代表的是项目根目录。
// app.use(logger("dev")); //调用日志，配置为dev模式




//视图解析的引擎
app.all('*', (req, res, next)=> {
    res.header("Access-Control-Allow-Methods","POST,GET,PUT,DELETE,PATCH");
    next()
});

app.use(favicon(__dirname+"/public/images/icon.jpg"));//小图标

//POST数据读取
app.use(bodyParser.urlencoded({extended:false}));//读取POST数据
app.use(bodyParser.json());

//集成了路由
//告诉Router有请求来了，要去分任务，直接把任务转给Router
app.use(route);  //使用模块

app.use(express.static(__dirname+"/public"));//静态资源在哪里

// 找不到跳转404
// app.use("*",function (req,res) {
//     res.sendfile(path.join(__dirname,"public","404.html"))
// });





//监听端口
app.listen(8889,()=>{console.log("服务器8889启动")});
