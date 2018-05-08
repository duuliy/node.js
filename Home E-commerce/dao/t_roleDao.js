
const dbpool = require("../config/dbconfig");
const t_roleDao = {
    getRole(){
        return new Promise((resolve,reject)=>{
            dbpool.connect("SELECT *,t_role.state as rstate FROM t_role,t_admin WHERE a_name=(SELECT a_name FROM t_admin WHERE t_role.a_id=t_admin.a_id)"
            ,[],(err,data)=>{
                console.log(data);
                resolve(data)
            })
        })
    },
    getRolebyall(sql,param){
        return new Promise((resove,reject)=>{
            dbpool.connect(sql,param,(err,data)=>{
                if(err){
                    console.log("错误发生",err.message)
                }else{
                    resove(data)
                }
            })
        })

    },
    addTag(sql,param){
        return new Promise((resove,reject)=>{
            dbpool.connect(sql,param,(err,data)=>{
                if(err){
                    console.log("插入角色相关数据错误",err.message)
                }else{
                    resove(data)
                }
            })
        })
    },
    validateRoleCun(sql,param){
        return new Promise((resove,reject)=>{
            dbpool.connect(sql,param,(err,data)=>{
                if(err){
                    reject(err);
                    console.log("查询错误",err.message)
                }else{
                    resove(data)
                }
            })
        })
    },
    insertRole(sql,param){
        return new Promise((resolve,reject)=>{
            dbpool.connect(sql,param,(err,data)=>{
                if(err)
                {
                    reject(err);
                    console.log("修改错误",err.message)
                }else{
                    resolve(data);
                }
            })
        })
    },
    opendownUse(sql,param){
        return new Promise((resolv,reject)=>{
            dbpool.connect(sql,param,(err,data)=>{
                if(err)
                {
                    console.log('禁用，启用',err.message);
                    reject(err)
                }else{
                    resolv(data);
                }
            })
        })
    },
    getTotalCount(sql,param)
    {
        //console.log("值",param)
        return new Promise((resove,reject)=>{
            dbpool.connect(sql,param,(err,data)=>{
                if(err){
                    console.log("错误发生",err.message)
                    reject(err)
                }else{
                    resove(data)
                }
            })
        })
    },
    getqueryRole(sql,param)
    {
        return new Promise((resove,reject)=>{
            dbpool.connect(sql,param,(err,data)=>{
                if(err){
                    reject(err)
                }else{
                    resove(data)
                }
            })
        })
    }

};
module.exports=t_roleDao;