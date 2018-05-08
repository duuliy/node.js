"use strict";
const dbpool = require("../config/sqlConfig.js");
const bespeakDAO1={
    //pagecont:3,
//自加载----------------------------
    showNewTe(){
        return new Promise(function(resolve,reject){
            dbpool.connect("SELECT newtea_id,newtea_name,newtea_price, " +
            "DATE_FORMAT(newtea_soldday,'%Y-%m-%d') AS soldday, " +
                "newtea_condition FROM newtea where 1=1",[],
                (err,data)=>{
                    resolve(data);
                })
        })
    },
//修改------------------------------------
    xiuNewTe(X){
        return new Promise(function(resolve,reject){
            dbpool.connect("SELECT newtea_id,newtea_name,newtea_price, " +
                "DATE_FORMAT(newtea_soldday,'%Y-%m-%d') AS soldday, " +
                "newtea_condition FROM newtea where newtea_id='"+X+"'", [],
                (err,data)=>{
                    resolve(data);
                })

        });

},
    quexiuNewTea(sql,params){
        return new Promise(function(resolve,reject){
            dbpool.connect(sql,
                params,
                (err,data)=>{
                    if(!err){
                        resolve("保存成功")
                    }else{
                        console.log(err)
                    }

                }
            )

        })
    },

//删除--------------------------------------------
    delect(D){
        return new Promise(function(resolve,reject){
            dbpool.connect("UPDATE newtea SET newtea_condition=0 where newtea_id=?",
                [D],
                (err,data)=>{
                    if(!err){
                        resolve("删除成功")
                    }else{
                        resolve(err)
                    }

                }
            )


        })
    },
//新增-----------------------------------------
    add(params){
        console.log(params);
        return new Promise(function(resolve,reject){
          dbpool.connect("INSERT INTO newtea VALUES (null,?,?,?,?) ",
          params,
              (err,data)=>{
                  console.log(data);
                  if(!err){
                      resolve("新增成功");
                  }else{
                      console.log(err);
                      reject(err.message)
                  }
              }
          )
        })
    },
//搜索-----------------------------------------------
    select(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("SELECT newtea_id,newtea_name,newtea_price, " +
                "DATE_FORMAT(newtea_soldday,'%Y-%m-%d') AS soldday, " +
                "newtea_condition FROM newtea where newtea_name=?",
                params,
                (err,data)=>{
                    resolve(data);
                })
        })
    },





    //page(){
    //    return new Promise(function(resolve,reject){
    //        dbpool.connect("select count(*) as totalcont from newtea ",
    //            [],
    //            (err,data)=>{
    //                console.log(data);
    //                if(!err){
    //                    resolve(data)
    //                } else{
    //                    reject(err)
    //                }
    //    })
    //
    //    }
    //    )
    //}
    getstaff(sql,params){
        return new Promise(function (resolve, reject) {
            dbpool.connect(sql,
                params,
                (err, data)=> {
                    if (!err) {
                        console.log(sql);
                        console.log(params);
                        resolve(data);
                    } else {
                        reject(err)
                    }
                })
        });
    },
    getstaffPage(sql,params,parampagecount){
        return new Promise(function (resolve, reject) {
            /*  let result;
             db.connect("select count(*) as totalcount from admin", [], (err, data)=> {
             if (!err) {
             console.log("data======" + data[0].totalcount);
             console.log(param);
             result = Math.ceil(data[0].totalcount / param);
             resolve(result);
             }
             })
             })*/
            let result;
            dbpool.connect(sql,
                params,
                (err,data)=> {
                    if (!err) {
                        console.log("data======" + data[0].totalcount);
                        console.log(sql);
                        console.log(params);
                        result = Math.ceil(data[0].totalcount / parampagecount);
                        resolve(result);
                    }else{
                        reject(err);
                    }
                })
        })
    }
    };
module.exports=bespeakDAO1;