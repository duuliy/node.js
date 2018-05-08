/**
 * Created by Administrator on 11/15/2017.
 */
const path=require("path")
const db=require(path.join(__dirname,"../config/dbconfig.js"))
const shouorderdao={
    //得到表中数据总数量
    gettotalCount(sql)
    {
        return new Promise((resolve,reject)=>{
            db.connect(sql,[],(err,data)=>{
                if(err)
                {
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    //得到月份数据数据量
    geteverymonthcount(sql)
    {
        return new Promise((resolve,reject)=>{
            db.connect(sql,[],(err,data)=>{
                if(err)
                {
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    }
}
module.exports=shouorderdao