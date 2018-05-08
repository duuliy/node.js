"use strict";
const dbpool = require("../config/sqlConfig.js");
//订单自加载
const bespeakDAO2={
    //showDing(){
    //    return new Promise(function(resolve,reject){
    //        let sql = "SELECT * FROM bookinfo,newtea,USER WHERE bookinfo.user_id = user.user_id AND  newtea.newtea_id = bookinfo.newtea_id";
    //        dbpool.connect(sql,[],
    //            (err,data)=>{
    //                resolve(data);
    //            })
    //    })
    //},

    xiuDING(X){
        console.log(X,"CON");
        return new Promise(function(resolve,reject){
            dbpool.connect("SELECT booking_id,user_id,newtea_id,booking_ispay,booking_tel,booking_amount,booking_condition " +
                " FROM bookinfo where booking_id=?", [X],
                (err,data)=>{
                    if(!err){
                        resolve(data);
                    }else{
                        reject(err)
                    }
                    console.log(data)
                })

        });

    },
    quexiuDING(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("UPDATE bookinfo SET user_id=?,newtea_id=?,booking_ispay=?,booking_tel=?,booking_amount=?,booking_condition=?  WHERE booking_id=?",
                params,
                (err,data)=>{
                    resolve("保存成功")
                }
            )

        })
    },
    addDING(params){
        console.log(params+"111");
        return new Promise(function(resolve,reject){
            dbpool.connect("INSERT INTO bookinfo VALUES (NULL,?,?,?,?,?,?)",
                params,
                (err,data)=>{
                    console.log(data);

                    if(!err){
                        resolve("新增成功")
                    }else{
                        reject(err.message)
                    }
                }
            )
        })
    },

    //===========================
    delectDING(D){
        return new Promise(function(resolve,reject){
            dbpool.connect("UPDATE bookinfo SET booking_condition=0 where booking_id=?",
                [D],
                (err,data)=>{
                    if(!err){
                        resolve("删除成功")
                    }else{
                        reject(err)
                    }

                }
            )


        })
    },

    //===========================================

    select(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("SELECT booking_id,user_id,newtea_id,booking_ispay,booking_tel,booking_amount,booking_condition FROM bookinfo WHERE booking_id=?",
                    params,
                (err,data)=>{
                    resolve(data);
                })
        })
    },


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


module.exports=bespeakDAO2;