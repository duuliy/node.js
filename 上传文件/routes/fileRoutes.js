
//Express的路由
const express = require("express");

const constroller = require("../controller/filecontroller.js");
const uploadController = require("../controller/uploadController")
const upload = require("../config/uploadconfig")
const path = require("path"); //处理路径
const app = express();
//获取路由对象
const router = express.Router();


//头像上传
//多个文件array方法
//upload.array("name值");
router.post("/uploadFile.do",upload.single("myfile"),uploadController.uploadFile);
router.get("/getImage.do",uploadController.getImage);




module.exports=router;


