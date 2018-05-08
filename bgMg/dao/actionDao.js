/**
 * Created by DELL on 2017/11/13.
 */
    //const funcMysql=require("mysql");
const dbpool=require("../config/dbpoolConfig.js")
const functionDao={
    getAllFunctions(params){
        console.log("get in function dao");
        return new Promise((resolve,reject)=>{
            let funcSql="select * from yd_action limit ?,?";
            //let arr=[];
            dbpool.connect(funcSql,params,(err,data)=>{
               resolve(data);
            });
        });
    },
    addFunction(params){
        console.log("add");
        return new Promise((resolve,reject)=>{
            let insertSql="insert into yd_action values(?,?,?,?,?,?)";
            dbpool.connect(insertSql,params,(err,data)=>{
                console.log("dao:"+data);
                resolve(data);
            });
        });
    },
    deleteAction(params){
        return new Promise((resolve,reject)=>{
            let deleteSql="delete from yd_action where act_id=?";
            dbpool.connect(deleteSql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }
               else{
                    reject(err.message);
                }
            })


        })

    },
    updateAction(params){
        return new Promise((resolve,reject)=>{
            let updateSql="update yd_action set act_name=?,info=?,main_path=?,price=?,act_all_info=? where act_id=?";
            dbpool.connect(updateSql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
        //console.log("dao:"+params);
        //let updateSql="update yd_action set ac_name=?,info=?,main_path=?,price=?,act_all_info=? where act_id=?";
        //dbpool.connect(updateSql,params,(err,data)=>{
        //    if(!err){
        //
        //        console.log("update ok");
        //    }
        //});
    },
    getupdateId(params){
        //let params=[request.query.id];
        return new Promise((resolve,reject)=>{
            let getid="select * from yd_action where act_id=?";
            dbpool.connect(getid,params,(err,data)=>{
                console.log("getid:"+data);
                resolve(data);
            });
        });

    },
//    获取纵数据天数
    getTotalPage(){
        return new Promise((resolve,reject)=>{
           let pageSql="SELECT COUNT(*) AS countnum FROM yd_action ";
            dbpool.connect(pageSql,[],(err,data)=>{
                console.log("totalpage:"+data);
                resolve(data);
            });
        });
    }
}
module .exports=functionDao;