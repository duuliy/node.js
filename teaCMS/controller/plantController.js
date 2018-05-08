/**
 * Created by Administrator on 2017/11/14.
 */
    "use strict";
const plantDao = require("../dao/plantDao.js");
// const upload = require("../config/uploadConfig");
const fs = require("fs");
// var result = upload.single("img")
const getPlant ={
    getPlant(request,response){
        let currentPage=request.query.currentPage;
        console.log(currentPage+"kzc")
        plantDao.getPlant(currentPage).then(function(data){
            if(data.length>0){
                response.send(data)
            }else{
                response.send("数据为空")
            }
        })
    },
    updaTea(request,response){
        let teaname = request.body.tea_category;
        let tea_text = request.body.tea_text;
        let tea_status = request.body.tea_status;
        let tea_img = request.body.tea_img;
        let tea_condition = request.body.tea_condition;
        plantDao.updaTea(teaname,tea_text,tea_status,tea_img,tea_condition).then(function(data){
            if(data.length>0){
                response.send(data)
            }else{
                response.send("更新失败")
            }
        })
    },
    addinsert(request,response){
        let teaname = request.body.tea_category;
        let tea_text = request.body.tea_text;
        let tea_status = request.body.tea_status;
        let tea_img = request.body.tea_img;
        plantDao.addinsert(teaname,tea_text,tea_img).then(function(data){
            if(data.length>0){
                response.send(data)
            }else{
                response.send("添加失败")
            }
        })
    },
    deleTea(request,response){
        let tea_id = request.body.tea_id;
        plantDao.deleTea(tea_id).then(function(data){
            if(data.length>0){
                response.send(data)
            }else{
                response.send("删除失败")
            }
        })
    },
    serrchTea(request,response){
        let tea_status=request.body.tea_status||"";
        let tea_category=request.body.tea_category||"";
        let currentPage=request.body.currentPage;
        plantDao.serrchTea(tea_status,tea_category,currentPage).then(function(data){
            if(data.length>0){
                response.send(data)
            }else{
                response.send("搜索失败")
            }
        })
    },
    getpage(request,response){
        let tea_status=request.query.tea_status||"";
        let tea_category=request.query.tea_category||"";
        plantDao.getpage(tea_status,tea_category).then(function(data){
            if(data.length>0){
                let result;
                result = Math.ceil(data[0].totalcount / plantDao.pageCount);
                response.send(200,result)
            }else{
                response.send("获取总页数失败")
            }
        })
    },

    //上传
    sendImg(request,response){
        console.log("sendImg");
        let tempPath = request.files.img.path;
        console.log(tempPath);
        let targetPath = "./public/uploads/"+request.files.img.name;
        console.log(targetPath);
        fs.createReadStream(tempPath).pipe(fs.createWriteStream(targetPath));
        var imgPath = "uploads/"+request.files.img.name;
        response.send(imgPath);
    },
    //获取下拉框数据

    getTeaname(request,response){
        plantDao.getTeaname().then(function(data){
            if(data.length>0){
                response.send(data)
            }else{
                response.send("获取下拉框失败")
            }
        })
    }
};
module .exports = getPlant;