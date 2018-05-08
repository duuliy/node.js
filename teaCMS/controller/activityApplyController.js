/**
 * Created by SDL on 2017/11/16 0016.
 */
"use strict";
const activityModel = require("../dao/activityDao");

const activityApplyController = {
    pagesize: 3,
    getPageTotal(request, response){
        let currentPage = request.params.currentPage;
        let queryUser = request.query.actUser || "";
        let queryDetail = request.query.actDetail || "";
        let sql = "SELECT COUNT(*) as size FROM USER,activity,apply WHERE user.user_id = apply.user_id AND " +
            "activity.act_id = apply.act_id ";
        if (queryDetail !== "") {
            sql += " and act_detail like '%" + queryDetail + "%'";
        }
        if (queryUser !== "") {
            sql += " and user_name like '%" + queryUser + "%'";
        }
        console.log(sql);
        activityModel.activityQuery(sql, []).then((data) => {
            let size = Math.ceil(data[0].size / activityApplyController.pagesize);
            console.log("size:"+size);
            response.send({flag: 1, msg: "页数获取成功", data: size})
        }).catch(err => {
            response.send({flag: -1, msg: "数据库出错"});
        });
    },
    queryActivity(request, response){
        let currentPage = request.query.currentpage;
        let queryUser = request.query.actUser || "";
        let queryDetail = request.query.actDetail || "";
        let sql = "select apply_id,user.user_id,user.user_name,activity.act_id,activity.act_detail,apply_ticket,apply_count,apply_condition from user,activity,apply where user.user_id = apply.user_id and activity.act_id = apply.act_id";
        if (queryDetail !== "") {
            sql += " and act_detail like '%" + queryDetail + "%'";
        }
        if (queryUser !== "") {
            sql += " and user_name like '%" + queryUser + "%'";
        }
        sql += " limit ?,?";
        activityModel.activityQuery(sql, [(currentPage - 1) * 3, activityApplyController.pagesize]).then(
            function (data) {
                response.send({flag: 1, msg: "插入数据成功", data: data});
            }
        ).catch((err) => {
            console.log(err);
            response.send({flag: -1, msg: "数据库出错"});
        });
    },
    deleteActivity(request,response){
        let id = request.query.id;
        activityModel.activityQuery("update apply set apply_condition = 0 where apply_id = ?",[id]).then(
            function(){
                response.send({flag:1,msg:"更改状态成功"});
            }
        ).catch((err)=>{
            console.log(err);
            response.send({flag:-1,msg:"数据库出错"});
        });
    }
};

module.exports = activityApplyController;