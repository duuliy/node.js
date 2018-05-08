/**
 * Created by Administrator on 2017/11/20.
 */
const multer=require("../config/uploadConfig.js");
const dbpool=require("../config/myConfig.js");
const fileDao=require("../dao/fileupload.js");
const upload =  require("../config/uploadConfig.js");
const fs=require("fs");


const fileController={
    goods_id:"",

    innerImgID(req,resp){
        console.log("创建文件夹名称为：",req.body.shopname);
        fs.mkdir("./public/uploads/"+req.body.shopname,function(err){
            if(err){
                console.log("创建文件夹错误",err.message);
            }else{
                upload.changedestorage(req.body.shopname);
                console.log(req.body.shopname);//文件夹
                resp.send("ok");
            }
        });
        fileController.goods_id=req.body.shopname;
    },
    innerImg(req,resp){
        var myArr = [];
        for (var i = 0; i < req.files.length; i++) {
            myArr.push(req.files[i].path);
        }
        let myArr1=myArr.toString();
        console.log("上传图片成功");
        dbpool.connect("update yd_goods set goods_img = ? where  goods_id = ?", [myArr1,fileController.goods_id], (err, data)=> {
            resp.send("OK");
        })
    }
};
module .exports=fileController;