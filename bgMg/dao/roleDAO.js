/**
 * Created by Jay on 2017/11/13.
 */
const dbpool=require("../config/dbpoolconfig");

const classModel={
    getRole(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("select * from yd_role limit ?,?",params,(err,data)=>{
                resolve(data);
            });
        })

    },
    getTotalCount(){
        return new Promise((resolve,reject)=>{
            dbpool.connect("select count(*) as totalcount from yd_role",[],(err,data)=>{
                resolve(data);
            });
        })
    },
    getChangerole(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("select * from yd_role where role_id=?",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }

            });
        })
    },
    changeRole(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("update yd_role set role_name=?,role_control=? where role_id=?",params,(err,data)=>{
                if(!err){
                    resolve(data);
                    //console.log
                }else{
                    reject(err);
                }
            });
        })
    },
    getAddrole(){
        return new Promise((resolve,reject)=>{
            dbpool.connect("select * from yd_role",[],(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            });
        })
    },
    addRole(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("insert into yd_role values(null,?,?)",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            });
        })
    },
    delRole(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("delete from yd_role where role_id=?",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    roleTotal(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("select * from yd_role limit ?,?",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    }
    //getUser(params){
    //    console.log("进入DAO");
    //    return new Promise(function(resolve,reject){
    //        dbpool.connect("select * from staff where staff_userid =? and staff_password = ?",params,
    //            (err,data)=>{
    //                if(!err){
    //                    resolve(data)
    //                }else{
    //                    reject(err)
    //                }
    //            })
    //    })
    //}


};

module.exports=classModel;