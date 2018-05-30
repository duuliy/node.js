
//Express的路由
const express = require("express");

const constroller = require("../controller/filecontroller.js");
const upload = require("../config/uploadconfig")
const sequelizeController = require("../controller/sequelizeController")
const path = require("path"); //处理路径
const app = express();
//获取路由对象
const router = express.Router();




//ormtest
router.post('/sequelize.do',sequelizeController.getany)
router.post('/addsequelize.do',sequelizeController.addsome)
router.delete('/delesequelize.do',sequelizeController.deltesome)
router.patch('/quersequelize.do',sequelizeController.querysome)
router.put('/updsequelize.do',sequelizeController.upsome)

module.exports=router;


