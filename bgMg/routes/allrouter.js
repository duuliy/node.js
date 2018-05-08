const  express=require("express");
const guigConstroller = require("../controller/guigConstroller");//规格
const gongnengController=require("../controller/actionController.js");//功能
const  goodsC=require("../controller/goodsController");//商品
const loginController=require("../controller/loginController")//登录
const assortmentController=require("../controller/assortmentController")//品种
const colorController=require("../controller/colorController")//颜色
const rolecontroller=require("../controller/rolecontroller")//角色
const myScene=require("../controller/myScene");//场景
const usersController=require("../controller/usersController")//用户
const userController=require("../controller/userManageController.js");//会员
const orderController=require("../controller/orderController")//订单
const customController=require("../controller/customController")//定制
const serviceController=require("../controller/serviceController");//售后服务
const upload =require("../config/uploadconfig.js");


//多文件上传
const fs=require("fs");
// const  fileController=require("../controller/uploadController");
const uploads =  require("../config/uploadsconfig");




//加载上传文件模块
const uploade=require("../config/uploadconfig")

const  ruter=express.Router();

ruter.get("/standards",guigConstroller.getAllguige);

//=================规格管理===============================
ruter.get("/standardsUpdate.do",guigConstroller.updateGuige);
ruter.post("/standardsUpdate2",guigConstroller. updateGuige2);
ruter.get("/standardsAdd.do",guigConstroller.addguige);
ruter.post("/standardsadd",guigConstroller.addGuige2);
ruter.post("/standardsdelete.do",guigConstroller.deleteGuige);
ruter.get("/standards.do",(req,resp)=>{
    resp.redirect("/standards.do/1")
});
/*动态路由拦截 :page*/
ruter.get("/standards.do/:page",guigConstroller.getAllguige);
//=================end==========================



//==========================品类==================================
//ruter.get("/assortment",assortmentController.getAllAssortment);
ruter.get("/assortmentUpdate.do",assortmentController.AssortmentUpdate);
ruter.post("/assortmentUpdate2.do",assortmentController.AssortmentUpdate2);
ruter.get("/assortmentAdd1.do",assortmentController.AssortmentAdd1);
ruter.post("/assortmentAdd.do",assortmentController.AssortmentAdd);
ruter.get("/assortmentDelete.do",assortmentController.AssortmentDelete);
ruter.get("/assortment",(req,resp)=>{
    resp.redirect("/assortment/1")
});
/*动态路由拦截 :page*/
ruter.get("/assortment/:page",assortmentController.getAllAssortment);
//========================end=========================================


/*==================================颜色管理==============================================*/

ruter.get("/addColor",(req,resp)=>{
    resp.render("addColor",{})
});

ruter.get("/addMycolor.do",colorController.addcolor);
ruter.post("/deletecolor.do",colorController.deletecolor);
ruter.get("/colorUpdate",colorController.getcolor);
ruter.post("/colorupdatetwo.do",colorController.updateColor);

/*动态路由部分*/
ruter.get("/color",(req,resp)=>{
    resp.redirect("/color/1")
});
ruter.get("/color/:page",colorController.getAllColor);

//========================end==================================

//======================功能=============================
ruter.get("/actions.do",(request,response)=>{
response.redirect("/actions.do/1");
});
ruter.get("/actions.do/:page",gongnengController.getAllFunction);

//功能板块
ruter.get("/gotoadd.do",gongnengController.goToAdd);
ruter.get("/gotoEdit.do",gongnengController.goToEdit);
ruter.post("/addaction.do",uploade.single("ac_imgurl"),gongnengController.addFunction);
ruter.get("/deleteAction.do",gongnengController.deleteAction);
ruter.post("/updateAction.do",gongnengController.updateAction);
//========================end=============================

//=======================角色==================================
/* ******************************角色管理************************************* */
ruter.get("/changerole1.do",rolecontroller.changeRoleget);//角色修改页面数据获取
ruter.get("/allrole",(req,resp)=>{
    resp.redirect("/allrole/1")
});
/*动态路由拦截*/
ruter.get("/allrole/:page",rolecontroller.getRole);
ruter.get("/changeRole.do",rolecontroller.changeRole);//角色修改数据修改
ruter.get("/addrole.do",rolecontroller.getAddrole);//添加角色页面数据获取
ruter.get("/addRole1.do",rolecontroller.addRole);//添加角色数据导入数据库
ruter.get("/delRole.do",rolecontroller.delRole);//角色管理页面删除角色
ruter.get("/delRole1.do",rolecontroller.delRole1);//修改角色页面删除角色
/* ******************************角色管理************************************* */
//===========================end====================================


//=======================场景====================================
//自加载
ruter.get("/lampSceneLoad",(req,resp)=>{
    resp.redirect("/lampSceneLoad/1");
});
/*分页*/
ruter.get("/lampSceneLoad/:pg",myScene.getScene);

//跳转新增页面
ruter.get("/lampSceneAdd",myScene.getAdd);

//跳转修改页面
ruter.get("/lampSceneUpdate",myScene.getUp);

//新增
ruter.post("/addScene",upload.single("scene_img"),myScene.addScene);

//删除
ruter.get("/delScene",myScene.delScene);

//修改
ruter.post("/saveScene",upload.single("scene_img"),myScene.upAll);
//========================end=======================================



//========================商品=====================================

// ruter.get("/goods",goodsC.getAllgoodsList);
// ruter.post("/getAllgoods.do",goodsC.getAllgoodsList);
ruter.get("/add_goods",goodsC.getAddgoodsPage);
ruter.get("/goods.do",(req,resp)=>{
    resp.redirect("/goods.do/1")
})
ruter.get("/goods.do/:pg",goodsC.getAllgoodsList);

//筛选
ruter.post("/getAllgoods",goodsC.getAllgoodsList);


ruter.post("/addGoods.do",goodsC.savaGoods);

//批量上架
ruter.post("/shangjiaAll",goodsC.shangjiaAll);
//批量下架
ruter.post("/xiajiaAll",goodsC.xiajiaAll);



//=======热图==================================================
ruter.post("/uploadretu", uploade.single("retuimg"),goodsC.savaRetu)

//=======主图====
ruter.post("/uploadzhutu",uploads.array("zhutuimg"), goodsC.saveZhutu);

//==========================end=====================================


//========================用户===============================
//获取角色列表
ruter.get("/users",(req,resp)=>{
    resp.redirect("/users/page/1")
});
//分页
ruter.get("/users/page/:pg",usersController.getusersEjs);
//修改导入角色数据
ruter.get("/changeUser.do",usersController.getuserEjs);
//修改页面点击保存数据
ruter.post("/changeUser.do",uploade.single("head_imgurl"),usersController.changeUser);
//新增角色
ruter.get("/addUser",usersController.openaddUser);
//新增角色点击保存
ruter.post("/addUser.do",uploade.single("head_imgurl"),usersController.addUser);
//删除管理员
ruter.get("/deleUser.do",usersController.deleUser);
//========================================================


//======================会员管理===========================
//会员管理
ruter.get("/UserManage.do",(request,response)=>{
    response.redirect("/UserManage.do/1")
})
ruter.get("/UserManage.do/:page",userController.getAllmanageUser);
ruter.post("/editStatus.do",userController.editStatus);



//=========================登录=====================================
ruter.post("/login.do",loginController.login)



//====================获取订单列表===================================
ruter.get("/order",(req,resp)=>{
    resp.redirect("/order/page/1")
});
//分页
ruter.get("/order/page/:pg",orderController.getOrder);
//修改订单
ruter.get("/changeOrder.do",orderController.changeOrder);

//===========================退出登录=============================
ruter.get("/logOut",(req,resp)=>{
    req.session.username=undefined;
    resp.redirect("/login.html")
})


/*====================================全新定制==============================================*/
ruter.get("/customMade",(req,resp)=>{
    resp.redirect("/customMade/1")
});

/*更改状态*/
ruter.post("/updatezht.do",customController.updatezht);

//动态路由
ruter.get("/customMade/:page",customController.getAllCustom);
//===================================================


/*=========================售后Service===============================*/
//自加载
ruter.get("/ServiceLoad",(req,resp)=>{
    resp.redirect("/ServiceLoad/1");
});
/*分页*/
ruter.get("/ServiceLoad/:pg",serviceController.getService);

//修改状态
ruter.post("/updateService",serviceController.upService);

//=======================多文件上传====================================
// router.post("/createfile", fileController.innerImgID);
// router.post("/upload",upload.array("fileAttach"), fileController.innerImg);



//================富文本
ruter.post("/img.do",uploads.array("file"),(req,resp)=>{
    console.log(req.files);
    resp.send(req.files[0].path)
})


module.exports=ruter;