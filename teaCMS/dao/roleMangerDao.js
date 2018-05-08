/**
 * Created by Administrator on 2017/11/15 0015.
 */
const db = require("../config/sqlConfig.js");
const roleMangerDao = {
    currentPage:3,
    getRoleD(params){
        return new Promise(function(resolve,reject){
            db.connect("select * from role order by role_id desc limit ?,? ",params,(err,data)=>{
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
    searchRoleD(sql,params){
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
    getRoleNameD(params){
        return new Promise(function(resolve,reject){
            db.connect("select * from role ",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })

    },
    newRoleD(sql,params){
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
    getNowMessD(params){
        return new Promise(function(resolve,reject){
            db.connect("select * from role where role_id = ? ",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    updateRoleD(params){
        return new Promise(function(resolve,reject){
            db.connect("update role set role_name=?,role_porwer=?,role_condition=? where role_id = ? ",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    deleteRoleD(params){
        return new Promise(function(resolve,reject){
            db.connect("update role set role_condition=0 where role_id = ? ",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    }
};
module .exports = roleMangerDao;