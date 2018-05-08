/**
 * Created by Administrator on 11/15/2017.
 */
const path=require("path")
const db=require(path.join(__dirname,"../config/dbconfig.js"))
const shouyedao={
getMaxandMinMonth(){
   return new Promise((resolve,reject)=>{
       let sql="SELECT DISTINCT MONTH(createtime) AS mon FROM t_admin where year(createtime)=year(now()) ORDER BY MONTH(createtime)";
       db.connect(sql,[],(err,data)=>{
           if(err){
               reject(err)
           }else{
               resolve(data)
           }

       })
   })

},
getTotalCountinthisyear(sql){
   return new Promise((resolve,reject)=>{
       db.connect(sql,[],(err,data)=>{
          if(err){
              reject(err)
          }else{
              resolve(data)
          }
       })
   })

},
geteveryMonthCount(sql,param){
 return new Promise((resolve,reject)=>{
     db.connect(sql,param,(err,data)=>{
         if(err){
             reject(err)
         }else{
             resolve(data)
         }

     })
 })
}
}
module.exports=shouyedao