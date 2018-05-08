const mysql=require("mysql");
const dbpool = require("../config/dbpoolConfig.js");

const serviceDao={
    /*自加载*/
    getAllService(params){
        let sql="SELECT a.service_id,a.user_id,a.goods_id,b.name,a.service_time FROM yd_service AS a,yd_goods AS b WHERE a.goods_id=b.goods_id LIMIT ?,?";
        return new Promise((resolve,reject)=>{
            dbpool.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },

    /*分页*/
    servicePage(){
        return new Promise((resolve,reject)=>{
            dbpool.connect("SELECT COUNT(*) AS a FROM yd_service",[],(err,data)=>{
                resolve(data);
            })
        })
    },

    //修改状态

    getUp(params){
      return new Promise((resolve,reject)=>{
          dbpool.connect("UPDATE yd_service set status=? where service_id=?",params,(err,data)=>{
              resolve(data)
          })
      })
    }


}

module.exports=serviceDao