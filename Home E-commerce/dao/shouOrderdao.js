/**
 * Created by Administrator on 11/15/2017.
 */
const path=require("path")
const db=require(path.join(__dirname,"../config/dbconfig.js"))
const shouorderdao={
    //�õ���������������
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
    //�õ��·�����������
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