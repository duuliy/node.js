/**
 * Created by a on 2017/10/20.
 */
//Express的路由
const express = require("express");

const constroller = require("../controller/filecontroller.js");
const constroller2 = require("../controller/peoplecontroller");
const constroller3 = require("../controller/depcontroller");
const constroller4 = require("../controller/coursecontroller");
const constroller5 = require("../controller/classcontroller");
const smsController= require("../controller/smController");
const uploadController = require("../controller/uploadController");
const upload = require("../config/uploadconfig")
const path = require("path"); //处理路径
const app = express();
const stucontroller = require("../controller/stucontroller");
//获取路由对象
const router = express.Router();


//头像上传

router.post("/uploadFile.do",upload.single("myfile"),uploadController.uploadFile);
router.get("/getImage.do",uploadController.getImage);

//下载
router.post("/downimg.do",uploadController.downimg);
//登录
router.post("/newlogin.do",constroller4.newLogin);
router.get("/getUsername.do",constroller4.getUsername);
router.get("/",(req,resp,next)=>{
    // console.log("拦截了");
    // resp.send("被拦截下来了");
    //判断一下登录了没有
    // console.log(req.session.username);
    // console.log(req.path);
    // console.log(req.headers.referer);
    req.headers.referer=req.headers.referer||"";
    if(req.session.username!=undefined||req.path=="/Login.html"||req.headers.referer.match(/Longin.html$/)){
        //username有值,代表登录
        // resp.sendFile(path.join(__dirname,"../public/vip.html"))
        //继续去执行，执行static读取vip.html返回
        app.locals.username=req.session.username;
        next();
        // resp.redirect("vip.html"); //导致重定向过多，死循环
    }else{
        req.session.originalURL=req.url;
        resp.redirect("/Login.html")//以localhost为标本后面加载
    }
})


/*=========day10 短信=========*/
router.post("/sendCode.do",smsController.sendCode);
router.post("/verifyCode.do",smsController.verifyCode);

//邮件
router.post("/sendMail.do",smsController.sendMail);

// router.route("/login.do")
//     .get(constroller.getUser)
//     .post(constroller.postUser);
//角色管理
router.get("/roleMan.do",constroller.getRole);
router.get("/xgrole.do",constroller.getxgrole);
router.get("/deleterole.do",constroller.getscrole);
router.get("/addrole.do",constroller.getaddrole);
router.get("/seach.do",constroller.getseachrole);
router.get("/getStudent.do",constroller.sendrole);

//人员管理

router.get("/PeopleMan.do",constroller2.getPeople);
router.get("/xgpeople.do",constroller2.getxgPeople);
router.get("/deletePeople.do",constroller2.getscPeople);
router.get("/addPeople.do",constroller2.getaddPeople);
router.get("/seachPeople.do",constroller2.getseachPeople);
//分页
router.get("/getPageTotal.do",constroller2.getPageTotal);


//部门管理

router.get("/depMan.do",constroller3.getdep);
router.get("/xgdep.do",constroller3.getxgdep);
router.get("/deletedep.do",constroller3.getscdep);
router.get("/adddep.do",constroller3.getadddep);
router.get("/seachdep.do",constroller3.getseachdep);

//课程管理

// router.get("/courseMan.do",constroller4.getcourse);
router.post("/xgcourse.do",constroller4.getxgcourse);
// router.get("/deletecourse.do",constroller4.getsccourse);
router.get("/deletecourse.do",constroller4.addUser4);
router.post("/addcourse.do",constroller4.getaddcourse);
router.get("/seachcourse.do",constroller4.getseachcourse);
router.get("/getCourse.do",constroller4.sendcourse);
// //分页
router.get("/getPageTotal2.do",constroller4.getPageTotal);


//学生管理
router.post("/seachclass.do",constroller5.getseachclass);
//分页
router.get("/getPageTotal3.do",constroller5.getPageTotal);
//查询
router.post("/getclass.do",constroller5.getclass);
router.get("/deletestu.do",constroller5.addUser4);
router.post("/addstu.do",constroller5.getaddstu);
router.get("/getstu.do",constroller5.sendcourse);

//班级管理

router.get("/classGl.ejs",stucontroller.listPeo);


module.exports=router;


