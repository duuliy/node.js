/**
 * Created by a on 2017/11/14.
 */
const dbpool = require("../config/dbconfig");
const appointmentcontroller={
    show(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("select * from t_appointment",params,
                (err,data)=>{
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    star(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("update t_appointment set state=0 where app_id=?",
                params,(err,data)=>{
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    stop(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("update t_appointment set state=1 where app_id=?",
                params,(err,data)=>{
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    revise(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("update t_appointment set d_id=?,addr_id=?,app_time=? where app_id=?",
                params,(err,data)=>{
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    }
};

module.exports=appointmentcontroller;