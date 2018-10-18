//公用引入模块
const express = require("express");
const bodyParser = require("body-parser"); //post请求
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path"); //处理路径
const router = express.Router();
const app = express();
var signature = require('cookie-signature');



//app.use(logger("dev"));//日志输出


//=======session and cookie==============================
app.use(cookieParser('Simon'));
app.use(session({
    // name: "3project", //cookie名称，默认connect.sid
    // secret: "123123", //结合其他加密的方式生成secret
    // cookie: {
    //     maxAge: 3000000
    // }, //cookie配置：有效时间
    // resave: true, //保存(长度为时间)
    // rolling: true, //刷新(刷新之后保存的时间)
    // saveUninitialized: false //未初始化cookie要不要保存
}));


//post数据读取
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(router); //使用模块




//通用拦截   放在静态资源之前
app.use("/", (req, resp, next) => {
    //进行登录判断
    // 1.session.username 有名字
    //  2.当前是在login.html
    //3.如果资源请求是来源于login.html，也进next
    // console.log("通用拦截",  req.signedCookies.islogin)
    // console.log("req.path当前请求路径",req.path)
    // console.log("req.header---",req.headers.referer)

    req.headers.referer = req.headers.referer || "" //访问的网址  首次的时候没有referer 这个referer的支持是不统一的，referer这个参数是浏览器自动添加给header中的
    if ( req.signedCookies.islogin || req.path == "/login.html" || req.headers.referer.match(/login.html$/)) {
        // app.locals.username = req.signedCookies.islogin; //把用户名写到locals.username获取 任何的ejs渲染页面都有这个
        // console.log("username",app.locals.username)
        next()
    } else {
        // console.log(req.path) //路径（不带参数）
        // console.log(req.url) //完整地址
        // req.session.originalURL = req.url; //用户成功登录之后，返回到上一个页面
        resp.redirect("/login.html"); //http://localhost:8888/XXXX
    }
})

//静态资源
app.use(express.static(__dirname + "/public"));



router.post("/newLogin.do", (req, resp) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username === 'admin' && password === 'a123456') {
        req.session.username = username;
        let data = {
            success: 'ok'
        }
        resp.cookie('islogin', username, {
            maxAge: 60 * 1000,
            signed: true,
            httpOnly: true
        });
        resp.send(data)
    } else {
        resp.send("登录失败")
    }
});





app.listen(9998, () => {
    console.log(("服务器9998启动"))
});
