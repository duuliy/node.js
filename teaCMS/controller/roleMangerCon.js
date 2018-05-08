/**
 * Created by Administrator on 2017/11/15 0015.
 */
    "use strict";
const roleMangerDao = require("../dao/roleMangerDao.js");
const roleMangerCon = {
    getRoleC(resquest,response){
        let nowPage =  resquest.query.nowPagec;
        let params = [];
        params.push(parseInt(nowPage-1)*roleMangerDao.currentPage);
        params.push(roleMangerDao.currentPage);
        roleMangerDao.getRoleD(params).then(function(data){
            response.send(data);
        })

    },
    getTotalPageC(resquest,response){
        let role_name = resquest.query.roleName;
        let nowPage = resquest.query.roleName;
        let params = [];
        let sql = "select count(*) as mycount from role where 1=1";
        if(role_name!="角色名称"){
            sql += " and role_name=?";
            params.push(role_name);
        }
        roleMangerDao.getTotalPageD(sql,params).then(function(data){
            var result;
            result= Math.ceil(data[0].mycount/roleMangerDao.currentPage);
            response.send(200,result)
        })
    },
    searchRoleC(request,response){
        let role_name = request.query.roleName;
        let nowPage = request.query.nowPagec;
        let params = [];
        let sql = "select * from role where 1=1 ";
        if(role_name!="角色名称"){
            sql += " and role_name=?";
            params.push(role_name);
        }
        sql += " limit ?,?";
        params.push(parseInt(nowPage-1)*roleMangerDao.currentPage);
        params.push(roleMangerDao.currentPage);
        roleMangerDao.searchRoleD(sql,params).then(function(data){
            response.send(data);
        })
    },
    getRoleNameC(request,response){
        roleMangerDao.getRoleNameD("").then(function(data){
            response.send(data);
        })
    },
    newRoleC(request,response){
        let params = [];
        let role_name = request.body.role_name || "";
        let role_porwer = request.body.role_porwer;
        let role_type = request.body.role_type;
        params.push(role_name);
        if(role_porwer=="管理员权限"){
            params.push(1);
        }else{
            params.push(2)
        }
        if(role_type=="注销"){
            params.push(0)
        }else{
            params.push(1)
        }
        let sql = "insert into role values(null,?,?,?)";
        roleMangerDao.newRoleD(sql,params).then(function(data){
            response.send(data);
        })
    },
    getNowMessC(request,response){
        let role_id = request.query.role_id;
        let params = [];
        params.push(role_id);
        roleMangerDao.getNowMessD(params).then(function(data){
            response.send(data)
        })
    },
    updateRoleC(request,response){
        let role_id = request.query.role_id || "";
        let role_name = request.query.role_name;
        let role_porwer = request.query.role_porwer;
        let role_type = request.query.role_type;
        let  params = [];
        params.push(role_name);
        if(role_porwer=="管理员权限"){
            params.push(1);
        }else{
            params.push(2)
        }
        if(role_type=="注销"){
            params.push(0)
        }else{
            params.push(1)
        }
        params.push(parseInt(role_id));

        roleMangerDao.updateRoleD(params).then(function(data){
            response.send(data);
        })
    },
    deleteRoleC(request,response){
        let role_id = request.query.role_id;
        let params = [];
        params.push(role_id);
        roleMangerDao.deleteRoleD(params).then(function(data){
            response.send(data);
        })
    }
};
module.exports = roleMangerCon;

