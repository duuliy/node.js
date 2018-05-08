const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookie = require("cookie-parser");
const path1 = require("path");
const morgan=require("morgan");

const favicon = require("serve-favicon");
const testRoute = require("./routes/testRoutes.js");
const checkUserRoute =  require("./routes/checkUserRoutes.js");
const bespeakYUrote= require("./routes/bespeakYUroute1.js");
const bespeakDingrote= require("./routes/bespeakDINGroute.js");
const plantRouter= require("./routes/plantRouter.js");
const staffRoute = require("./routes/staffRoutes.js");
const productRoute = require("./routes/productRoutes.js");
const productRoute2 = require("./routes/productRoutes2.js");
const activityRouter = require("./routes/activityRouter");
const packRouter = require("./routes/packRouter");
const museum=require("./routes/museumRouter");
const upload = require("./routes/uploadRoutes");


const app = express();
app.use(morgan("dev"));
app.use(cookie());
app.use(session({
    name:"cms",
    secret:"123",
    cookie:{maxAge:300000},
    resave:true,
    rolling:true,
    saveUninitialized:true
}));

app.use("/zzcode.do",(request,response,next)=>{
    request.session.code = request.query.code;
    next();
});

app.use("/zzinfo.do",(request,response,next)=>{
    request.session.userLogin = request.query.username;
    request.session.userId = request.query.password;
    next();
});

// app.use("/",(request,response,next)=>{
//     request.headers.referer = request.headers.referer||"";
//     if(request.session.myname||request.path=="/login.html"||request.headers.referer.match(/login.html$/)
//         ||request.path=="/findPassword.html"||request.headers.referer.match(/findPassword.html$/)){
//         app.locals.myname=request.session.myname;
//         next();
//     }else{
//         request.session.originalURL = request.url;
//         response.redirect("/login.html");
//     }
// });

app.use(bodyParser.urlencoded({extended:false}));
//将post数据储存为json数据
app.use(bodyParser.json());
//视图文件路径
app.set("views",path1.join(__dirname,"views"));
//视图文件的解析方式
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(express.static(path1.join(__dirname,"public/pages")));

app.use(testRoute);
app.use(checkUserRoute);
app.use(bespeakYUrote);
app.use(bespeakDingrote);
app.use(plantRouter);
app.use(staffRoute);
//app.use(productRoute);
app.use(productRoute2);
app.use(activityRouter);
app.use(museum);
app.use(packRouter);
app.use(upload);

app.listen(9999,()=>{
    console.log("tea cms success 9999")
});