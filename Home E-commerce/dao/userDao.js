
const mysql=require("mysql");
const database=require("../config/dbconfig");
const userDao={
    userDao(){
      return new  Promise(function (resolve,reject) {
          database.connect("SELECT u_name,u_tel,u_sex,u_qq,createtime,state from t_user",(err,data)=>{
              if(!err){
                  resolve(data)
              }else{
                  reject(err)
              }
          })
      })
    },
    //启用和禁用
    disableDao(name){
        database.connect("update t_user set state=0 where u_name=?",name,(err,data)=>{
            if(!err){
                console.log("成功")
            }else{
                console.log(err)
            }
        })
    },
    startDao(name){
        database.connect("update t_user set state=1 where u_name=?",name,(err,data)=>{
            if(!err){
                console.log("成功")
            }else{
                console.log(err)
            }
        })
    },
    //查询
    searchdao(name){
        var sql="SELECT u_name,u_tel,u_sex,u_qq,createtime,state from t_user where 1=1";
        var arr=[];
        if(name!=""){
            sql+=" and u_name like ?";
            name="%"+name+"%";
            arr.push(name);
        }
        return new Promise(function (resolve,reject) {
            database.connect(sql,arr,(err,data)=>{
                if(!err){
                    resolve(data)
                }else{
                    reject(err)
                }
            })
        })
    },
};
module.exports=userDao;