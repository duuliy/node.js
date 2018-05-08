"use strict";
const mysql = require("mysql");
const bespeakDAO2=require("../dao/bespeakDAO2.js");
const bespeakDingcontroller={
//自加载
    loadDing(req,resp){
        bespeakDAO2.showDing().then((data)=>{
            resp.send(data);
            console.log(" in orderNew Tea",data)
        })
    },
//修改============================
    xiuDING(req,resp){
        let X=parseInt(req.body.booking_id);
        console.log(X,"11");
        bespeakDAO2.xiuDING(X).then((data)=>{
            resp.send(data)
        })
    },


    quexiuDING(req,resp){
        let params = [];
        params.push(req.body.user);
        params.push(req.body.newteaid);
        params.push(req.body.bookingispay);
        params.push(req.body.bookingtel);
        params.push(req.body.bookingamount);
        params.push(req.body.bookingcondition);
        params.push(req.body.bookingid);
        bespeakDAO2.quexiuDING(params).then((data)=>{
            console.log(data);
            resp.send(data);
        })

    },



    addDING(req,resp){
        let params=[];
        params.push(req.body.userid);
        params.push(req.body.newteaid);
        params.push(req.body.bookingispay);
        params.push(req.body.bookingtel);
        params.push(req.body.bookingNo);
        params.push(req.body.bookingcondition);
        bespeakDAO2.addDING(params).then((data)=>{
            resp.send(data);
        })
    },



    //删除

    deleDING(req,resp){
        let D=req.body.booking_id;
        bespeakDAO2.delectDING(D).then((data)=>{
            console.log(data);
            resp.send(data)
        })
    },


//搜索==============================================
    select(req,resp){
        let params=[];
        params.push(req.body.name);
        console.log(params)
        bespeakDAO2.select(params).then((data)=>{
            console.log(data);
            resp.send(data)
        });
    },



    //====================================

    pageCount:5,  //每页显示5条
    showstaff(req,resp){
        let params = [];
        let sousuo = req.query.sousuo||"";
        let currentPage = req.query.currentPage;
        //let sql = "SELECT booking_id,user_id,newtea_id,booking_ispay,booking_tel,booking_amount,booking_condition" +
        //    " FROM bookinfo where 1=1";
        let sql = "SELECT * FROM bookinfo,newtea,USER WHERE bookinfo.user_id = user.user_id AND  newtea.newtea_id = bookinfo.newtea_id";
        //if(sousuo!=""){
        //    sql += " and booking_id = ?";
        //    params.push(sousuo);
        //}
        if(sousuo!=""){
            sql += " and user_name like '%"+sousuo+"%'";

        }
        sql += " limit ?,?";
        params.push((currentPage-1)*bespeakDingcontroller.pageCount);
        params.push(bespeakDingcontroller.pageCount);
        bespeakDAO2.getstaff(sql,params).then(function(data){
            console.log("in order",data);
            if(data.length>0){
                //console.log(data+"zhegegegegeggggg")
                resp.send(data);
            }
        }).catch(function(err){
            console.log(err);
        });
    },
    getstaffPageTotal(req,resp){
        let params = [];
        let sousuo2 = req.query.sousuo2||"";
        //let sql = "SELECT COUNT(*) AS totalcount FROM bookinfo WHERE 1=1";
        let sql = "SELECT count(*) as totalcount  FROM bookinfo,newtea,USER WHERE bookinfo.user_id = user.user_id AND  newtea.newtea_id = bookinfo.newtea_id";

        //if(sousuo2!=""){
        //    sql += " and booking_id = ?";
        //    params.push(sousuo2);
        //}
        if(sousuo2!=""){
            sql += " and user_name like '%"+sousuo2+"%'";
        }
        var parampagecount = bespeakDingcontroller.pageCount;

        bespeakDAO2.getstaffPage(sql,params,parampagecount).then(function(data) {
            if(data){
                resp.send(200,data);
            }
        }).catch(function(err){
            console.log(err.message);
        });
    }

    };

module.exports=bespeakDingcontroller;