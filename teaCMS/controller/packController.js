/**
 * Created by dell on 2017/11/15.
 */
    "use strict";
const mysql = require("mysql");
const packModel = require("../dao/packDAO");
const fs = require("fs");

const packController = {
    pageCount:5,
    //显示数据
    showImg(req,resp){
        let sql = "select * from packimg,packmaterial where packimg.pack_mat_id = packmaterial.pack_mat_id";
        let params = [];
        let pack_mat_name = req.query.pack_mat_name ||"";
        params.push((parseInt(req.query.currentPage)-1)*packController.pageCount);
        params.push(packController.pageCount);
        if(pack_mat_name==""){
            sql+= " order by packimg.pack_img_id DESC limit ?,?";
            packModel.showMyImg(sql,params)
                .then(data=>{
                    resp.send(data)
                })
        }else if(pack_mat_name = req.query.pack_mat_name){
            sql+=" and pack_mat_name='"+pack_mat_name+"' order by packimg.pack_img_id DESC limit ?,?";
            packModel.showMyImg(sql,params)
                .then(data=>{
                    resp.send(data)
                })
        }
    },
    //新增
    newPack(req,resp){
        let pack_mat_id = req.query.pack_mat_id;
        let pack_img_name = req.query.pack_img_name;
        let pack_price = req.query.pack_price;
        let pack_img_url = req.query.pack_img_url;
        let pack_img_condition = req.query.pack_img_condition;
        packModel.newPack([null,pack_mat_id,pack_img_name,pack_price,pack_img_url,pack_img_condition])
        .then(data=>{
            resp.send(data)
        })
    },
    //删除
    deletePack(req,resp){
        let pack_img_id = req.query.pack_img_id;
        packModel.deletePack([pack_img_id])
        .then(data=>{
                resp.send(data)
            })
    },
    //修改
    changeInfo(req,resp){
        let pack_img_name = req.query.pack_img_name1;
        let pack_price = req.query.pack_price1;
        let pack_img_url = req.query.pack_img_url1;
        let pack_img_id = req.query.pack_img_id1;
        packModel.changeInfo([pack_img_name,pack_price,pack_img_url,pack_img_id])
        .then(data=>{
                resp.send(data)
            })
    },
    //搜索
    searchInfo(req,resp){
        let pack_mat_name = req.query.pack_mat_name;
        packModel.searchInfo([pack_mat_name])
        .then(data=>{
                resp.send(data)
            })
    },
    //添加页数
    getPage(req,resp){
        let sql = "select count(*) as totalCount from packimg,packmaterial where packimg.pack_mat_id = packmaterial.pack_mat_id";
        let pack_mat_name = req.query.pack_mat_name ||"";
        if(pack_mat_name==""){
            packModel.getPage(sql)
                .then(function (data) {
                    if(data.length>0){
                        let result = Math.ceil(data[0].totalCount/packController.pageCount);
                        resp.send(200,result)
                    }else{
                        resp.send("获取失败")
                    }
                })
        }else if(pack_mat_name==req.query.pack_mat_name){
            sql+=" and pack_mat_name='"+pack_mat_name+"'";
            packModel.getPage(sql)
                .then(function (data) {
                    if(data.length>0){
                        let result = Math.ceil(data[0].totalCount/packController.pageCount);
                        resp.send(200,result)
                    }else{
                        resp.send("获取失败")
                    }
                })
        }

    },
    //上传
    uploadImg(req,resp){
        let tempPath = req.files.file.path;
        let targetPath = "./public/uploads/"+req.files.file.name;
        fs.createReadStream(tempPath).pipe(fs.createWriteStream(targetPath));
        var imgPath = "uploads/"+req.files.file.name;
        resp.send(imgPath)
}
};
module.exports = packController;