/**
 * Created by Administrator on 2017/11/14.
 */

const mysql=require("mysql");
const dbpool = require("../config/dbpoolConfig.js");

const loginDao={
    login(parmse){
        return new Promise(function (resolve,reject) {
            dbpool.connect("SELECT * FROM yd_manager WHERE account=? AND PASSWORD=?",
                parmse,
                (err,data)=>{
                    if(!err){
                        resolve(data);
                    }else{
                        reject(err);
                    }
                }
            )
        })
    }
}

module.exports=loginDao;