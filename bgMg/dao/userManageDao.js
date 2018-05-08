/**
 * Created by DELL on 2017/11/16.
 */
    const dbpool=require("../config/dbpoolConfig.js")
const userManageDao={
    getAllmanageUsers(params){
        return new Promise((resolve,reject)=>{
            let userSql="select * from yd_user LIMIT ?,?";
            dbpool.connect(userSql,params,(err,data)=>{
                resolve(data);
            });
        });
    },
    gettotalCount(){
        return new Promise((resolve,reject)=>{
            let userSql="SELECT count(*) as countnum from yd_user ";
            dbpool.connect(userSql,[],(err,data)=>{
                if(!err){
                    resolve(data);
                }
                else{
                    reject(err.message);
                }
            });
        });
    },
    editStatus(params){
        console.log("edit:",params);
        return new Promise((resolve,reject)=>{
           let editSql="update yd_user set status=? where user_id=? ";
            dbpool.connect(editSql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }
                else{
                    reject(err.message);
                }
            });
        });
    }
}
module.exports=userManageDao;