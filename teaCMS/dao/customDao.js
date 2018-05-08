/**
 * Created by Administrator on 2017/11/14 0014.
 */
    "use strict";
const db = require("../config/sqlConfig.js");
const customDao = {
    currentPage:2,
    getCustomMessD(params){
        return new Promise(function(resolve,reject){
            let sql = "SELECT a.user_id,user_name,user_sex,user_tel,DATE_FORMAT(user_birth,'%Y-%m-%d') AS user_birth,COUNT(order_condition) AS mycount " +
                "FROM USER AS a LEFT JOIN orderform AS b ON a.user_id=b.user_id GROUP BY a.user_id";
            sql += " limit ?,?";
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    getTotalPageCustomD(sql,params){
        return new Promise(function(resolve,reject){
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    searchCustomD(sql,params){
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
    searchMessD(params){
        return new Promise(function(resolve,reject){
            db.connect("SELECT a.user_id,user_name,user_tel FROM USER AS a",params,(err,data)=>{
                if(!err){
                    console.log(data);
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    }
};
module .exports = customDao;