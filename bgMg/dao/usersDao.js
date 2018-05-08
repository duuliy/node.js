const dbpool = require("../config/dbpoolconfig");

const usersModel = {
    getAllUser(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("SELECT * FROM yd_manager AS a,yd_role AS b WHERE a.role=b.role_id limit ?,?",params,(err,data)=>{
                resolve(data);
            })
        })
    },
    usersPage(){
        return new Promise((resolve,reject)=>{
            dbpool.connect("select count(*) as a from yd_manager",[],(err,data)=>{
                resolve(data)
            })
        })
    },
    getrole(){
        return new Promise((resolve,reject)=>{
            dbpool.connect("select * from yd_role",[],(err,data)=>{
                resolve(data)
            })
        })
    },
    getUser(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("select * from yd_manager where mg_id=?",params,(err,data)=>{
                resolve(data)
            })
        })
    },
    changeUser(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("update yd_manager set account=?,mg_name=?,sex=?,birth=?,role=?,status=?,head_img=? where mg_id=?",params,(err,data)=>{
                if(!err){
                    resolve(data)
                }else{
                    reject(err)
                }
                
            })
        })
    },
    addUser(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("insert into yd_manager values (null,?,default,?,?,?,?,?,?)",params,(err,data)=>{
                if(!err){
                    resolve(data)
                }else{
                    reject(err)
                }

            })
        })
    },
    deleUser(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("delete from yd_manager where mg_id=?",params,(err,data)=>{
                if(!err){
                    resolve(data)
                }else{
                    reject(err)
                }
            })
        })
    }
};

module.exports=usersModel;