
//Express的路由
const express = require("express");

const constroller = require("../controller/filecontroller.js");

const upload = require("../config/uploadconfig")
const smsController = require("../controller/smsController")
const path = require("path"); //处理路径
const app = express();
//获取路由对象
const router = express.Router();





// /*========= 短信=========*/
router.post("/sendCode.do",smsController.sendCode);
router.post("/verifyCode.do",smsController.verifyCode);

// //邮件
router.post("/sendMail.do",smsController.sendMail);

// router.route("/login.do")
//     .get(constroller.getUser)
//     .post(constroller.postUser);



module.exports=router;


