const path=require("path");
const db=require("../config/dbconfig.js");
const orderPageDao={
    getAllOrder(sql,params){
        return new Promise((resolve,reject)=>{
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    updateOrder(sql,params){
        return new Promise((resolve,reject)=>{
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            });
        })
    },
    getAllOrderGoods(sql,params){
        return new Promise((resolve,reject)=>{
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    }

};

module.exports=orderPageDao;