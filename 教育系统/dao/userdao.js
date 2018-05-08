/**
 * Created by a on 2017/10/26.
 */
//1.连接数据库
const dbpool = require("../config/fileconfig");

const userdao = {
    addUser(params,callback){
        // let result="初始化result";
        //dbpool.connect
        //SQL
        //SQL参数*controller传进来
        //回调函数:得到sql执行结果 -》告诉调用userModel.addUser的调用者
        dbpool.connect("insert into t_user values (NULL,?,?)",
            params,(err,data)=>{
                console.log("userDAO查询完毕");
                console.log(data);
                // console.log(callback)
                callback(data)
                //要告诉controller
                // result = data;
            })
        console.log("addUser执行完毕")

        // return result;
    },
    addUser2(params){
        return new Promise(function(resolve,reject){

            //promise-mysql
            //执行操作
            dbpool.connect("delete from courseArr where courseNo=?",
                params,(err,data)=>{
                    console.log("userDAO查询完毕");
                    // console.log(data);
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    getUser(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("select * from t_user where u_username =? and u_password = ?",params,
                (err,data)=>{
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    addUser3(params){
        return new Promise(function(resolve,reject){
            //promise-mysql
            //执行操作
            dbpool.connect("delete from studentArr where s_No=?",
                params,(err,data)=>{
                    // console.log(data);
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    sendclassdao(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("select * from studentArr where s_No = ?",
                params,(err,data)=>{
                    if(!err){
                        resolve(data);
                    }else{
                        reject(err)
                    }
                })
        })
    },
    getUser66(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("select * from classArr",params,
                (err,data)=>{
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    }
}

module.exports=userdao