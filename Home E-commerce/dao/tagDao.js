/**
 * Created by Administrator on 11/14/2017.
 */
const path=require("path")
const db=require(path.join(__dirname,"../config/dbconfig.js"))
const tagDao={
    getTagsbyall(sql,param){
        return new Promise((resove,reject)=>{
            db.connect(sql,param,(err,data)=>{
                if(err){
                    console.log("错误发生",err.message)
                }else{
                    resove(data)
                }
            })
        })

    },
    getCreatePerson(sql,param){
     return new Promise((resove,reject)=>{
         db.connect(sql,param,(err,data)=>{
             if(err){
                 console.log("查询用户表错误",err.message)
             }else{
                 resove(data)
             }
         })
     })
    },
    addTag(sql,param){
        return new Promise((resove,reject)=>{
            db.connect(sql,param,(err,data)=>{
                if(err){
                    console.log("插入标签数据错误",err.message)
                }else{
                    resove(data)
                }
            })
        })
    },
    validateTagCun(sql,param){
        return new Promise((resove,reject)=>{
            db.connect(sql,param,(err,data)=>{
                if(err){
                    reject(err)
                    console.log("查询错误",err.message)
                }else{
                    resove(data)
                }
            })
        })
    },
    updateTag(sql,param){
        return new Promise((resolve,reject)=>{
            db.connect(sql,param,(err,data)=>{
                if(err)
                {
                    reject(err)
                }else{
                    resolve(data);
                }
            })
        })
    },
    startandEndUse(sql,param){
        return new Promise((resolv,reject)=>{
            db.connect(sql,param,(err,data)=>{
                if(err)
                {
                    console.log(err.message)
                    reject(err)
                }else{
                    resolv(data);
                }
            })
        })
    },
    getTotalCount(sql,param)
    {
        return new Promise((resove,reject)=>{
            db.connect(sql,param,(err,data)=>{
                if(err){
                    console.log("错误发生",err.message)
                }else{
                    resove(data)
                }
            })
        })
    }
}
module.exports=tagDao