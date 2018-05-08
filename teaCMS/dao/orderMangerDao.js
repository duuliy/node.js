/**
 * Created by GY on 2017/11/13 0013.
 */
    "use strict";
    const db = require("../config/sqlConfig.js");
const orderMangerDao = {
    currentPage:3,
    getOrderMessD(params){
        return new Promise(function(resolve,reject){
            //let sql = " SELECT orderform.order_addr,orderform.order_bill,orderform.order_condition, orderform.order_id," +
            //    "orderform.order_message,orderform.order_pay,orderform.order_paymethod, orderform.order_postmethod," +
            //    "orderform.order_price,orderform.order_receivername, orderform.order_remark,DATE_FORMAT(order_send_time,'%Y-%m-%d') AS order_send_time," +
            //    "orderform.order_status,DATE_FORMAT(order_time,'%Y-%m-%d') AS order_time, user.user_name,packimg.pack_img_name,packimg.pack_img_url, " +
            //    "packmaterial.pack_mat_name FROM USER,orderform,packmaterial,packimg " +
            //    "WHERE USER.user_id=orderform.user_id AND packimg.pack_mat_id = packmaterial.pack_mat_id " +
            //    "AND packmaterial.pack_mat_id=orderform.pack_mat_id AND orderform.pack_img_id = packimg.pack_img_id";
            let sql = "SELECT * FROM orderform,USER WHERE user.user_id = orderform.user_id";
            sql += "   limit ?,?";
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })

    },
    getTotalPageD(sql,params){
        return new Promise(function(resolve,reject){
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    getUserNameD(params){
        return new Promise(function(resolve,reject){

            let sql = "select user_name from user  ";
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    orderNumD(params){
        return new Promise(function(resolve,reject){
            let sql = "select order_id from orderform  ";
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    packMuilD(params){
        return new Promise(function(resolve,reject){
            let sql = "select pack_mat_name from packmaterial  ";
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    packImgD(params){
        return new Promise(function(resolve,reject){
            let sql = "select pack_img_name from packimg  ";
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    searchOrderD(sql,params){
        return new Promise(function(resolve,reject){
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    console.log(data);
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    saveSendThingD(params){
        return new Promise(function(resolve,reject){
            db.connect("UPDATE	 orderform SET order_status = ? WHERE order_id = ?",params,(err,data)=>{
                if(!err){
                    //console.log(data);
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    getProImgD(params){
        return new Promise(function(resolve,reject){
            let sql = "SELECT * FROM orderdetail,productinfo WHERE orderdetail.pro_id = productinfo.pro_id and order_id =?";
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    console.log("in proImg");
                    console.log(data);
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    }
};
module .exports = orderMangerDao;