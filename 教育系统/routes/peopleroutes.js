/**
 * Created by a on 2017/10/23.
 */
//Express的路由
const express = require("express");

const constroller = require("../controller/peoplecontroller");

//获取路由对象
const router = express.Router();


// router.route("/login.do")
//     .get(constroller.getUser)
//     .post(constroller.postUser);

router.get("/roleMan.do",constroller.getRole);
router.get("/xgrole.do",constroller.getxgrole);
router.get("/deleterole.do",constroller.getscPeople);
router.get("/addrole.do",constroller.getaddPeople);
router.get("/seach.do",constroller.getseachrole);


module.exports=router;
