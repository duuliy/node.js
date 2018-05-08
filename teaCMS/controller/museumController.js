/**
 * Created by LSS on 2017/11/17.
 */
    "use strict";
const museumDao = require("../dao/museumDao.js");
const fs = require("fs");

const getMuseum ={
    getMuseum(request,response){
        let currentPage=request.query.currentPage;
        museumDao.getMuseum(currentPage).then(function(data){
            if(data.length>0){
                response.send(data)
            }else{
                response.send("数据为空")
            }
        })
    },
    updaMuseum(request,response){
        let doc_title = request.body.doc_title;
        let doc_publisher = request.body.doc_publisher;
        let doc_time = request.body.doc_time;
        let doc_id = request.body.doc_id;
        let doc_content = request.body.doc_content;
        let pro_id = request.body.pro_id;
        let doc_url = request.body.doc_url;
        let doc_condition = request.body.doc_condition;

        var params=[pro_id,doc_title,doc_publisher,doc_time,doc_content,doc_url,doc_condition,doc_id];
        museumDao.updaMuseum(params).then(function(data){
            if(data.length>0){
                response.send(data)
            }else{
                response.send("更新失败")
            }
        })
    },
    addMuseum(request,response){
        let pro_id = request.body.pro_id;
        console.log(pro_id,"商品ID")
        let doc_title = request.body.doc_title;
        let doc_publisher = request.body.doc_publisher;
        console.log(doc_publisher,"发布人");
        let doc_time = request.body.doc_time;
        let doc_content = request.body.doc_content;
        let doc_url = request.body.doc_url;
        museumDao.addMuseum(pro_id,doc_title,doc_publisher,doc_time,doc_content,doc_url).then(function(data){
            if(data.length>0){
                response.send(data)
            }else{
                response.send("添加失败")
            }
        })
    },
    deleMuseum(request,response){
        let doc_id = request.body.doc_id;
        museumDao.deleMuseum(doc_id).then(function(data){
            if(data.length>0){
                response.send(data)
            }else{
                response.send("删除失败")
            }
        })
    },
    serrchMuseum(request,response){
        let pro_id=request.body.pro_id||"";
        let doc_publisher=request.body.doc_publisher||"";
        let currentPage=request.body.currentPage;
        museumDao.serrchMuseum(pro_id,doc_publisher,currentPage).then(function(data){
            if(data.length>0){
                response.send(data)
            }else{
                response.send("搜索失败")
            }
        })
    },
    getMuseumPage(request,response){
        let pro_id=request.query.pro_id||"";
        let doc_publisher=request.query.doc_publisher||"";
        museumDao.getMuseumPage(pro_id,doc_publisher).then(function(data){
            if(data.length>0){
                let result;
                result = Math.ceil(data[0].totalcount / museumDao.pageCount);
                response.send(200,result)
            }else{
                response.send("获取总页数失败")
            }
        })
    },

    //上传
    sendImg(request,response){
        let tempPath = request.files.img.path;
        let targetPath = "./public/uploads/"+request.files.img.name;
        fs.createReadStream(tempPath).pipe(fs.createWriteStream(targetPath));
        var imgPath = "uploads/"+request.files.img.name;
        response.send(imgPath);
    },

    //获取商品下拉框
    getPlayname(request,response){
        museumDao.getPlayname().then(function(data){
            if(data.length>0){
                response.send(data)
            }else{
                response.send("获取商品失败")
            }
        })
    }
};
module .exports = getMuseum;