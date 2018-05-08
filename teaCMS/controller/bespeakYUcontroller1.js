"use strict";
const mysql = require("mysql");
const bespeakDAO1=require("../dao/bespeakDAO1.js");

const bespeakYUcontroller1={
//自加载
    load(req,resp){
        bespeakDAO1.showNewTe().then((data)=>{
            //console.log(data);
            resp.send(data)
        })
    },
//修改
    xiuNewTea(req,resp){
        let X=req.body.newtea_id;
        bespeakDAO1.xiuNewTe(X).then((data)=>{
                resp.send(data)
        })
    },
    quexiuNewTea(req,resp){
        let params = [];
        let teazhuang;
        let sql = "UPDATE newtea SET newtea_name=?,newtea_price=?,newtea_soldday=?,newtea_condition=? WHERE newtea_id=? order by newtea_id desc";
        params.push(req.body.teaname);
        params.push(req.body.teaPrice);
        params.push(req.body.teatime);
        if(req.body.teazhuang=="上架"){
            teazhuang = 1;
        }else{
            teazhuang = 0;
        }
        params.push(teazhuang);
        params.push(parseInt(req.body.teaid));
        bespeakDAO1.quexiuNewTea(sql,params).then((data)=>{
            resp.send(data);
        })
    },

//删除
    delect(req,resp){
        let D=req.body.newtea_id;
        bespeakDAO1.delect(D).then((data)=>{
            console.log(data);
            resp.send(data)
        })
    },
    add(req,resp){
       let params=[];
        params.push(req.body.teaname);
        params.push(req.body.teaPrice);
        params.push(req.body.teatime);
        let teazhuang;
        if(req.body.teazhuang=="上架"){
            teazhuang = 1;
        }else{
            teazhuang = 0;
        }
        params.push(teazhuang);
        bespeakDAO1.add(params).then((data)=>{
            resp.send(data);
        })
    },
//查询
    select(req,resp){
        let params=[];
        params.push(req.body.name);
        bespeakDAO1.select(params).then((data)=>{
            console.log(data);
            resp.send(data)
        });
    },



//分页
//    page(req,resp){
//        bespeakDAO1.page().then((data)=>{
//            //resp.send(data)
//
//            let result;
//            //console.log(data[0].totalcont);
//
//            result=Math.ceil(data[0].totalcont/bespeakDAO1.pagecont);
//            console.log(result);
//            resp.send(200,result);
//        })
//    }
    pageCount:5,  //每页显示5条
    /* showstaff(req,resp){
     let params = [];
     let currentPage = req.query.currentPage;
     params.push((currentPage-1)*staffController.pageCount);
     params.push(staffController.pageCount);
     staffDao.getstaff(params).then(function(data){
     if(data.length>0){
     resp.send(data);
     }
     }).catch(function(err){
     console.log(err);
     });*/
    showstaff(req,resp){
        let params = [];
        let sousuo = req.query.sousuo||"";
        console.log("打印suosuo");
        console.log(sousuo);
        let currentPage = req.query.currentPage;
        console.log(currentPage);
        let sql = "SELECT newtea_id,newtea_name,newtea_price,DATE_FORMAT(newtea_soldday,'%Y-%m-%d') AS soldday,newtea_condition" +
            " FROM newtea where 1=1 ";
        if(sousuo!=""){
            sql += " and newtea_name = ?";
            params.push(sousuo);
        }
        sql += " order by newtea_id desc limit ?,?";
        params.push((currentPage-1)*bespeakYUcontroller1.pageCount);
        params.push(bespeakYUcontroller1.pageCount);
        bespeakDAO1.getstaff(sql,params).then(function(data){
            if(data.length>0){
                resp.send(data);
                console.log("data",data)
            }
        }).catch(function(err){
            console.log(err);
        });
    },
    getstaffPageTotal(req,resp){

        let params = [];
        let sousuo2 = req.query.sousuo2||"";
        let sql = "SELECT COUNT(*) AS totalcount FROM newtea WHERE 1=1";
        if(sousuo2!=""){
            sql += " and newtea_name = ?";
            params.push(sousuo2);
    }
        var parampagecount = bespeakYUcontroller1.pageCount;
        bespeakDAO1.getstaffPage(sql,params,parampagecount).then(function(data) {
            if(data){
                resp.send(200,data);
            }
        }).catch(function(err){
            console.log(err.message);
        });
    }


};

//分页




module.exports =  bespeakYUcontroller1;