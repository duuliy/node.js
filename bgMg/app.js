//公用引入模块
const express = require("express");
const logger=require("morgan");//日志
const bodyParser=require("body-parser");//post请求
const session=require("express-session");
const cookieParser=require("cookie-parser");
const path=require("path");

//定制写入模块
const address=require("./routes/allrouter");

const  app=express();


//app.use(logger("dev"));//日志输出
//视图引擎配置
app.set("views",path.join(__dirname,"views"));//视图文件路径
app.set("view engine","ejs");



//=======session and cookie==============================
app.use(cookieParser());
app.use(session({
    name:"3project",
    secret:"123123",
    cookie:{maxAge:3000000},
    resave:true,
    rolling:true,
    saveUninitialized:true
}));

//post数据读取
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//登录拦截
app.use("/",(req,resp,next)=>{
 //进行登录判断
 // 1.session.username 有名字
 //  2.当前是在login.html
 //3.如果资源请求是来源于login.html，也进next
 // console.log("通用拦截",req.session.username)
 // console.log("req.path当前请求路径",req.path)
 // console.log("req.header---",req.headers.referer)
 req.headers.referer=req.headers.referer||"" //首次的时候没有referer
 if(req.session.username||req.path=="/login.html"||req.headers.referer.match(/login.html$/)){
 app.locals.username=req.session.username; //把用户名写到locals.username获取 任何的ejs渲染页面都有这个
 app.locals.role=req.session.role;//角色判断
     // console.log("username",app.locals.username)
 next()
 }else{
 // console.log(req.path) //路径（不带参数）
 // console.log(req.url) //完整地址
 req.session.originalURL = req.url;  //用户成功登录之后，返回到上一个页面
 resp.redirect("/login.html"); //http://localhost:8888/XXXX
 }
 })



//拦截处理
app.use(address);

//静态资源
app.use(express.static(__dirname+"/public"));

app.listen(7777,()=>{
    console.log(("服务器8888启动"))
});



