/**
 * Created by Administrator on 2017/11/13.
 */
const mysql=require("mysql");
const dbpool = require("../config/dbpoolConfig.js");
const guigDao={
    getAllguig(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("select * from yd_size limit ?,?",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }

            })
        })
    },
    updateGuige(id){
        return new Promise(function(resolve,reject){
            dbpool.connect("select * from yd_size where size_id = ?",[id],(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }

            })
        })
    },
     updateGuige2(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("UPDATE yd_size SET notice=? WHERE size_id=?",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }

            })
        })
    },
    addGuige2(size){
        return new Promise(function(resolve,reject){
            dbpool.connect("insert into yd_size values (null,?)",[size],(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }

            });
        });
    },
    deleteGuige(id){
        return new Promise(function(resolve,reject){
            dbpool.connect("delete from yd_size where size_id = ?",[id],(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }

            });
        });
    },
    getTotalPage(){
        return new Promise(function(resolve,reject){
            dbpool.connect("select count(*) as totalcount from yd_size",[],(err,data)=>{
                resolve(data);
            });
        });
    }


};

module.exports= guigDao;