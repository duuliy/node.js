// 引入模块
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const ejs=require("ejs");

//引入路由模块
const route = require("./routes/routes");

//初始化
const app = express();

//session and cookie
app.use(cookieParser());
app.use(session({
    name:"furniture",
    secret:"940125",
    cookie:{maxAge:300000},
    resave:true,
    rolling:true,
    saveUninitialized:true
}));



//视图引擎
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

//POST数据读取
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// 通用拦截
app.use('/', (req,res,next)=> {
    if(req.cookies.user && !req.session.username){
        req.session.username = req.cookies.user.user;
        req.session.userid = req.cookies.user.id;
        app.locals.username = req.session.username;
        app.locals.userimg = req.session.userimg;
        next();
    }else{
        req.headers.referer=req.headers.referer||"";
        if(req.session.username||req.path=="/login"||req.headers.referer.match(/login/)){
            app.locals.username=req.session.username;
            app.locals.userimg = req.session.userimg;
            next();
        }else{
            req.session.originalURL = req.url;
            res.redirect("/login");
        }
    }
});

app.get("/login",(req,res,next)=>{
    if(req.session.username){
        res.render("shouye");
    }else{
        next();
    }
});

//日志
 app.use(logger("dev"));

//路由
app.use(route);

//静态资源
app.use(express.static(__dirname+"/public"));

app.listen(3000,()=>{
    console.log("3000端口，开始监听");});