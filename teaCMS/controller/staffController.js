/**
 * Created by ZXW on 2017/11/11.
 */
    "use strict";
const staffDao = require("../dao/staffDao.js");

const staffController ={
    pageCount:5,  //每页显示5条
    showstaff(req,resp){
        let params = [];
        let search = req.query.search||"";
        //console.log("11111111:"+search);
        if(search=="管理员权限"){
            search=1
        }
        if(search=="超级管理员权限"){
            search=2
        }

        let currentPage = req.query.currentPage;
        let sql = "SELECT admin_id,role_name,role_porwer,admin_login,admin_psw,admin_condition " +
        " FROM role,admin WHERE role.role_id=admin.role_id ";
        if(search!=""){
            sql += " and role_porwer = ?";
            params.push(search);
        }
        sql += " order by admin_id desc limit ?,? ";
        params.push((currentPage-1)*staffController.pageCount);
        params.push(staffController.pageCount);
        staffDao.getstaff(sql,params).then(function(data){
            resp.send(data);
        }).catch(function(err){
            console.log(err);
        });
    },
    getstaffPageTotal(req,resp){

        let params = [];
        let search2 = req.query.search2||"";
        if(search2=="管理员权限"){
            search2=1
        }
        if(search2=="超级管理员权限"){
            search2=2
        }
        let sql = "SELECT COUNT(*) AS totalcount FROM admin,role WHERE role.role_id = admin.role_id";
        if(search2!=""){
            sql += " and role_porwer = ?";
            params.push(search2);
        }
        var parampagecount = staffController.pageCount;
        staffDao.getstaffPage(sql,params,parampagecount).then(function(data) {
            if(data>0){
                resp.send(200,data);
            }else{
                resp.send("0");
            }
        }).catch(function(err){
            console.log(err.message);
        });
    },
    addstaff(req,resp){
        var roleid = req.body.roleid;
        var adminlogin = req.body.adminlogin;
        var adminpsw = req.body.adminpsw;
        if(roleid=="管理员"){
            roleid=1
        }
        if(roleid=="超级管理员"){
            roleid=2
        }
        let params = [roleid,adminlogin,adminpsw];
        staffDao.addstaff(params).then(function (data){
            if(data){
                resp.redirect("person.html");
            }
        })
    },
    deletestaff(req,resp){
        var thisid = req.body.thisid;
        let params = [thisid];
        staffDao.deletestaff(params).then(function (data) {
            if(data){
                resp.send(200,data);
            }
        });
    },
    delStaffGroup(req,resp){
        var params = req.body.deleteidgroup;
        staffDao.delStaffGroup(params).then(function(data){
            if(data){
                resp.send(200,data);
            }
        })
    },
    editstaff(req,resp){
        var adminid = req.query.admin_id;
        let params = [adminid];
        staffDao.editstaff(params).then(function (data) {
            if(data){
                resp.send(data);
            }
        });
    },
    updateeditstaff(req,resp){
        //var adminid = req.body.adminid;
        var roleid = req.body.roleid;
        var adminlogin = req.body.adminlogin;
        var adminpsw = req.body.adminpsw;
        var admincondition = req.body.admincondition;
        var adminidbefore = req.body.adminidbefore;
        if(roleid=="管理员"){
            roleid=1
        }
        if(roleid=="超级管理员"){
            roleid=2
        }
        if(admincondition=="使用"){
            admincondition=1
        }
        if(admincondition=="注销"){
            admincondition=0
        }
        let params = [roleid,adminlogin,adminpsw,admincondition,adminidbefore];
        staffDao.updateeditstaff(params).then(function (data) {
            if(data){
                resp.send(200,data)
            }
        })
        },
    showsearchstaff(req,resp){
        var rolequanxian = req.query.search;
        let params = [rolequanxian];
        staffDao.showsearchstaff(params).then(function (data) {
            if (data) {
                resp.send(data)
            }
        })
    },
    getroleporwerchoose(req,resp){
        staffDao.getroleporwerchoose().then(function (data) {
            if (data) {
                resp.send(data)
            }
        });
    },
    getaddroleidchoose(req,resp){
        staffDao.getaddroleidchoose().then(function (data) {
            if (data) {
                resp.send(data)
            }
        });
    },
    getroleidchoose(req,resp){
        staffDao.getroleidchoose().then(function (data) {
            if (data) {
                resp.send(data)
            }
        });
    }
};
module.exports = staffController;