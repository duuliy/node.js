/**
 * Created by ZXW on 2017/11/11.
 */
    "use strict";
const db = require("../config/sqlConfig.js");
const staffDao = {
    getstaff(sql,params){
        return new Promise(function (resolve, reject) {
            db.connect(sql,
                params,
                (err, data)=> {
                    if (!err) {
                        console.log("data-length:"+data.length);
                        resolve(data);
                    } else {
                        reject(err)
                    }
                })
        });
    },
    getstaffPage(sql,params,parampagecount){
        return new Promise(function (resolve, reject) {
            let result;
            db.connect(sql,
                params,
                (err,data)=> {
                if (!err) {
                    result = Math.ceil(data[0].totalcount / parampagecount);
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    addstaff(params){
        return new Promise(function (resolve, reject) {
            db.connect("insert into admin(role_id,admin_login,admin_psw,admin_condition) values (?,?,?,1)",
                params,
                (err, data)=> {
                    if (!err) {
                        resolve(1);
                        //resp.send("登记成功")
                    } else {
                        console.log(err);
                    }
                })
        })
    },
    deletestaff(params){
        return new Promise(function (resolve, reject) {
            db.connect(
                //"delete from admin where admin_id=?"
                "update admin set admin_condition = 0 where admin_id = ?",
                params,
                (err, data)=> {
                    if (!err) {
                        if (data != undefined) {
                            resolve(1);
                        }
                    } else {
                        console.log(err);
                    }
                })
        })
    },
    delStaffGroup(params){
        //params= params.join(",");
        let zz="?";
        for (var a=0;a<params.length-1;a++){
            zz+=",?"
        }
        return new Promise(function (resolve, reject) {
            db.connect("update admin set admin_condition = 0 where admin_id in ("+zz+")",
                params,
                (err,data)=>{
                    if(!err){
                        resolve(1);
                    }else{
                        reject(err.message)
                    }
                })
        })
    },
    editstaff(params){
        return new Promise(function (resolve, reject) {
            db.connect("select * from admin where admin_id = ?",
                params,
                (err, data)=> {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
        })
    },
    updateeditstaff(params){
        return new Promise(function (resolve, reject) {
            db.connect("update admin set role_id=?,admin_login=?,admin_psw=?,admin_condition=? where admin_id=?",
                params,
                (err,data)=> {
                    if (!err) {
                        console.log("22222222222:"+params);
                        resolve(data);
                    }
                    else {
                        reject(err);
                    }
                })
        })
    },
    showsearchstaff(params){
        return new Promise(function (resolve, reject) {
            db.connect("SELECT admin_id,role_name,role_porwer,admin_login,admin_psw FROM role,admin WHERE role.role_id=admin.role_id and role_porwer=?",
                params,
                (err,data)=>{
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
        })
        },
    getroleporwerchoose(){
        return new Promise(function (resolve, reject) {
            db.connect("select role_porwer from role",
                [],
                (err,data)=>{
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
        })
    },
    getaddroleidchoose(){
        return new Promise(function (resolve, reject) {
            db.connect("select role_id from role",
                [],
                (err,data)=>{
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
        })
    },
    getroleidchoose(){
        return new Promise(function (resolve, reject) {
            db.connect("select role_id from role",
                [],
                (err,data)=>{
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
        })
    }
};
module.exports = staffDao;