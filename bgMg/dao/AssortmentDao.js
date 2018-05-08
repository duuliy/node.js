/**
 * Created by Administrator on 2017/11/15.
 */
const mysql=require("mysql");
const dbpool = require("../config/dbpoolConfig.js");
const AssortmentDao={
    getAllAssortment(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("select * from yd_assortment limit ?,?",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        });
    },
    AssortmentUpdate(assort_id){
        return new Promise((resolve,reject)=>{
            dbpool.connect("select * from yd_assortment where assort_id=?",[assort_id],(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        });
    },
    AssortmentUpdate2(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("UPDATE yd_assortment SET assort_name=? WHERE assort_id=?",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        });
    },
    AssortmentAdd1(){
        return new Promise((resolve, reject)=> {
            dbpool.connect("select * from yd_assortment ",[], (err, data)=> {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        });
    },
    AssortmentAdd(params){
        return new Promise((resolve, reject)=> {
            dbpool.connect("insert into yd_assortment values (null,?)", params, (err, data)=> {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        });
    },
    AssortmentDelete(params){
        return new Promise((resolve, reject)=> {
            dbpool.connect("delete from yd_assortment where assort_id=?", params, (err, data)=> {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        });
    },
    getTotalPage(){
        return new Promise(function(resolve,reject){
            dbpool.connect("select count(*) as totalcount from yd_assortment",[],(err,data)=>{
                resolve(data);
            });
        });
    }
};
module.exports=AssortmentDao;