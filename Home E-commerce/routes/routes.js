//路由
const express = require("express");
const router = express.Router();
const path=require("path");
const pageTotalConfig = require('../config/pageTotalConfig');

//control层
const tagController=require(path.join(__dirname,"../controller/tagController.js"))
const shouController=require(path.join(__dirname,"../controller/ShouyeControoler.js"))
const shouOrderController=require(path.join(__dirname,"../controller/shouorderController.js"))

//—— 导入controll层
const goodsController = require("../controller/goodsController");
const propController = require("../controller/propController");
const goodsUpload = require("../config/goodsUpload");
const goodsImgUpload = require("../config/goodsImgUpload");

//login 
const loginController = require('../controller/loginController');
const adminAllController = require('../controller/adminAllController');
const adminController = require('../controller/adminController');
const upload = require('../config/uploadconfig');

//control层
const t_roleController =  require("../controller/t_roleController.js");

// —— 引入control层
const uploaddesigner=require("../config/uploaddesignerconfig");
const designerController=require("../controller/designerController.js");

// —— 引入control层
const orderController=require(path.join(__dirname,"../controller/orderController.js"));

//—— 引入control层
const appointmentcontroller= require("../controller/appointmentcontroller");
const threeDcontroller= require("../controller/threeDcontroller");
const t_t_goodscontroller= require("../controller/t_t_goodscontroller");

// —— 引入control层
const usercontroller=require("../controller/userController");
const casecontroller=require("../controller/caseController");
 const uploads=require("../config/uploadCaseconfig");

// //路由任务分配
// router.get("/index",(req,res)=>{
//    res.render("index.ejs")
// });

//标签
router.get("/tags",tagController.getTagPage);
router.post("/queryTag",tagController.getTagsbyall);
router.post("/addTag",tagController.addTag);
router.post("/validatecun",tagController.validateTagCun);
router.post("/updateTag",tagController.updateTag);
router.post("/startandendUse",tagController.startandEndUse);
router.get("/tags",tagController.getTagPage);
router.post("/queryTag",tagController.getTagsbyall);
router.post("/addTag",tagController.addTag);
router.post("/validatecun",tagController.validateTagCun);
router.post("/updateTag",tagController.updateTag);
router.post("/startandendUse",tagController.startandEndUse);
router.get("/index",(req,res)=>{
   res.render("shouye");
});

//首页
router.post("/userrejster",shouController.getMaxandMinMonth);
router.post("/orderzhexian",shouOrderController.getorderzhexian);
router.post("/getappoint",shouOrderController.getYuzhexian);

//商品管理路由分配

// =============商品管理===============
router.get("/goods",goodsController.goodsInfo); //商品管理页面
router.get("/searchGoods.do",goodsController.searchGoods); //查询商品
router.post("/addGoods.do",goodsController.addGoods); //新增商品
router.post("/updateGoods.do",goodsController.updateGoods); //修改商品
router.post("/addGoodsImg.do",goodsUpload.array("files",20),goodsController.addGoodsImg); //新增商品图片
router.get("/hotGoods.do",goodsController.hotGoods); //热门商品管理
router.get("/stateGoods.do",goodsController.stateGoods); //上架、下架管理
router.get("/skuInfo.do",goodsController.skuInfo); //sku商品管理
router.get("/getGoodsColor.do",goodsController.colorInfo); //商品属性获取
router.post("/updateSku.do",goodsController.updateSku); //更新sku信息
router.post("/addSku.do",goodsController.addSku); //新增sku信息
router.get("/goodsTagsInfo.do",goodsController.goodsTagsInfo); //商品标签管理
router.get("/getGoodsTags.do",goodsController.getTagsInfo); //商品标签管理
router.post("/addGoodsTags.do",goodsController.addGoodsTags); //新增商品标签
router.post("/updateGoodsTags.do",goodsController.updateGoodsTags); //更新商品标签
router.get("/delGoodsTags.do",goodsController.delGoodsTags); //删除商品标签

// =============商品属性管理===============
router.get("/prop",propController.propInfo); //获取属性信息
router.get("/searchProp.do",propController.searchProp); //搜索属性信息
router.post("/addProp.do",propController.addProp); //新增属性信息
router.post("/updateProp.do",propController.updateProp); //新增属性信息

//Editor图片上传
router.post("/kindEditorUpload",goodsImgUpload.array("imgFile",20),(req,resp)=>{
    let fname = req.files[0].filename;
    let info = {
        "error":0,
        "url":"/uploadimg/goods/"+fname
    };
    resp.send(info);
});


//=============================== login star ===================================
router.get("/login",loginController.login);
router.post('/login.do',loginController.getUser);
//=============================== login end  ===================================
//=============================== adminAll ===================================
router.get("/adminAll",adminAllController.getAlltdaim);
router.post("/getAdmin.do",adminAllController.getAdmin);
router.post("/setAdmin.do",adminAllController.getAdmin);
router.post("/addAdmin.do",adminAllController.addAdmin);
router.post("/setState.do",adminAllController.setState);
//=============================== admin ======================================
router.get("/admin",adminController.getAdmin);
router.post("/upfile.do",upload.single('file'));
router.post("/setInfo.do",adminController.setInfo);
router.post("/getPwd.do",adminController.getPwd);


//角色管理

router.get("/roleList",t_roleController.getAllrole);
router.get("/queryRole",t_roleController.getqueryRole);
router.post("/addRole",t_roleController.getaddRole);
router.post("/aliRolecun",t_roleController.validateRoleCun);
router.post("/InsertupRole",t_roleController.insertRole);
router.post("/opendownUse",t_roleController.opendownUse);


//设计师模块路由拦截

router.post("/addDesigner",designerController.addDesigner);
router.get("/getAllDesigner",designerController.getAllDesigner);
router.get("/getOneList",designerController.getOneList);
router.post("/modifyDesigner",designerController.modifyDesigner);
router.get("/searchDesigner",designerController.searchDesigner);
router.get("/deleteDesigner",designerController.deleteDesigner);
router.get("/AllDesignerList",designerController.AllDesignerList);
router.post("/createfile",designerController.createfile);
router.post("/upload",uploaddesigner.single("myfile"),designerController.updatePathname);
router.post("/modifyfile",uploaddesigner.single("myfile"),(req,resp)=>{
    resp.send("ok")
});
router.post("/updatePathname",designerController.updatePathname);
router.post("/querydesigner",designerController.queryDesigner);



//订单管理

router.get("/order",orderController.getAllOrder);
router.get("/orderGoods",orderController.getAllOrderGoods);
router.get("/updateOrder.do",orderController.updateOrder);
router.get("/selOrder.do",orderController.getAllOrder2);


//订单管理

//预约管理
router.get("/appointment",appointmentcontroller.showappoint);
router.get("/deletesone.do",appointmentcontroller.starappoint);
router.get("/deletestwo.do",appointmentcontroller.stopappoint);
router.post("/searchappoint.do",appointmentcontroller.searchappoint);
router.post("/reviseappoint.do",appointmentcontroller.reviseappoint);

//样板间管理
router.get("/threeD",threeDcontroller.showthreeD);
router.get("/threeDone.do",threeDcontroller.starthreeD);
router.get("/threeDtwo.do",threeDcontroller.stopthreeD);
router.post("/searchthreeD.do",threeDcontroller.searchthreeD);
router.post("/revisethreeD.do",threeDcontroller.revisethreeD);
router.post("/addthreeD.do",threeDcontroller.addthreeD);

//样板间标签管理
// router.get("/revisetags.do",threeDcontroller.revisetags);
router.post("/revisetags.do",threeDcontroller.revisetags);

router.post("/styleoption.do",threeDcontroller.styleoption);
router.post("/spaceoption.do",threeDcontroller.spaceoption);
router.post("/roomoption.do",threeDcontroller.roomoption);
router.post("/mapoption.do",threeDcontroller.mapoption);


//样板间商品管理
// router.get("/t_t_goodsone.do",threeDcontroller.start_t_goods);
router.post("/showgoods.do",threeDcontroller.showgoods);


//前台用户管理
router.get("/user",usercontroller.getUser);
router.get("/searchuser.do",usercontroller.getsearch);
//启用和禁用
router.get("/disable.do",usercontroller.getDisable);
router.get("/start_up.do",usercontroller.getStart);
//设计师案列管理
router.get("/d_case",casecontroller.getCase);
router.get("/disablecase.do",casecontroller.getDisable);
router.get("/start_upcase.do",casecontroller.getStart);
router.get("/updateimg.do",casecontroller.getupdateimg);
router.get('/casePage.do',casecontroller.pageTotol);
router.get('/caseData.do',casecontroller.getData);
//标签和设计师查询
router.get("/Designer.do",casecontroller.getdesigner);
router.get("/label.do",casecontroller.getlabel);
//查询匹配数据
router.get("/searchcase.do",casecontroller.getsearchcase);
//创建文件夹
router.get("/createfile.do",casecontroller.getfile);
//添加修改
router.post("/add.do",casecontroller.getadd);
router.post("/modify.do",casecontroller.getmodify);
router.post("/abc.do",uploads.single('myfile'));


//导出路由
module.exports = router;
