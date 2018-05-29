
const dbpool = require("../config/dbconfig");


const userdao = {
    updao(params){
        return new Promise(function(resolve,reject){
          dbpool.connect("update image set img =? where name=?",
            params,(err,data)=>{
              console.log("userDAO查询完毕");
              console.log(data);
              if(!err){
                resolve(data)
              }else{
                reject(err)
              }
            })
        })
      },
      getdao(params){
        return new Promise(function(resolve,reject){
          dbpool.connect("select * from image where name=?",
            params,(err,data)=>{
                console.log("userDAO查询完毕");
              if(!err){
                resolve(data)
              }else{
                reject(err)
              }
            })
        })
      },
}

module.exports=userdao