/**
 * Created by a on 2017/11/14.
 */
const viewModal=require("../dao/appointmentDAO.js");
const dbpool = require("../config/dbconfig");
const appointmentcontroller= {
    showappoint(req,res){
        "use strict";
        //查看mysql数据
        viewModal.show(function (err, data) {
            if (err) {
                res.send("数据出错");
            } else {
                res.render("appointment", {"data": data,admin:"admin"});
            }
        })
    },
    starappoint(req,res){
        var app_id=req.query.id;
        function myResponse(err,data){
            if (data != undefined) {
                res.send(data);
                if (err) {
                    res.end(err.message)
                }
            } else {
                res.end(err.message);
            }
        }
        viewModal.star([app_id]).
        then(myResponse) //resolved
            .catch(function(err){  //异常捕获 catch rejected
                console.log(err)
                myResponse(err)
            })
    },
    stopappoint(req,res){
        var app_id=req.query.id;
        function myResponse(err,data){
            res.send(data);
            if (data != undefined) {
                if (err) {
                    res.end(err.message)
                }
            } else {
                res.end(err.message);
            }
        }
        viewModal.stop([app_id]).
        then(myResponse) //resolved
            .catch(function(err){  //异常捕获 catch rejected
                console.log(err)
                myResponse(err)
            })
    },
    searchappoint(req,res){
        var d_id=req.body.d_id||"";
        var u_id=req.body.u_id||"";
        let sql="select * from t_appointment where 1=1";
        let params=[];
        if(d_id!=""){
            sql+=" and d_id like ?";
            d_id="%"+d_id+"%";
            params.push(d_id);
        }
        if(u_id!=""){
            sql+=" and u_id like ?";
            u_id="%"+u_id+"%";
            params.push(u_id);
        }
        dbpool.connect(sql,params,(err,data)=>{
            if(data!=undefined){
                if(data.length>0){
                    res.send(data);
                }else{
                    res.end("erro");
                }
            }else{
                res.end(err.message);
            }
        })
    },
    //修改
    reviseappoint(req,res){
        var app_id=req.body.addInputnum2;
        var d_id=req.body.addInputName2;
        var addr_id=req.body.addInputFile2;
        var app_time=req.body.addInputtime2;
        // dbpool.connect("update t_appointment set d_id=?,addr_id=?,app_time=? where app_id=?",
        //     [d_id,addr_id,app_time,app_id],
        //     (err,data)=>{
        //         if (data!= undefined) {
        //             if (err) {
        //                 res.end("erro");
        //             }
        //         } else {
        //             res.end(err.message);
        //         }
        //     })


        function myResponse(err,data){
            res.send(data);
            if (data != undefined) {
                if (err) {
                    res.end(err.message)
                }
            } else {
                res.end(err.message);
            }
        }
        viewModal.revise([d_id,addr_id,app_time,app_id]).
        then(myResponse) //resolved
            .catch(function(err){  //异常捕获 catch rejected
                console.log(err)
                myResponse(err)
            })


    }
}
module .exports=appointmentcontroller