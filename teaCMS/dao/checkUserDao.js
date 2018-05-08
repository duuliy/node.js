const db = require("../config/sqlConfig.js");
const checkUserDao = {
    checkUserEx(params){
        return new Promise(function(resolve,reject){
            db.connect("select * from admin where admin_login = ? and admin_psw = ?  and admin_condition = 1",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })

    },
    CheckNumD(params){
        return new Promise(function(resolve,reject){
            db.connect("update admin  set admin_psw =? where admin_login = ? ",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    finduserD(params){
        return new Promise(function(resolve,reject){
            db.connect("select * from admin  where admin_login = ? ",params,(err,data)=>{
                if(!err){
                    if(data.length>0){
                        resolve(data);
                    }else{
                        resolve("账号不存在")
                    }
                }else{
                    reject(err);
                }
            })
        })
    }

};
module .exports = checkUserDao;