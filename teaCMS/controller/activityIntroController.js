/**
 * Created by SDL on 2017/11/14 0014.
 */
"use strict";
const activityModel = require("../dao/activityDao");

const activityIntroController = {
    pagesize:3,
    getPageTotal(request,response){
        let currentPage = request.params.currentPage;
        let queryDetail = request.query.actDetail || "";
        let queryPlace = request.query.actPlace || "";
        let sql = "select count(*) as size from activity where 1=1 ";
        if(queryDetail !== ""){
            sql += " and act_detail like '%"+queryDetail+"%'";
        }
        if(queryPlace !== ""){
            sql += " and act_place like '%"+queryPlace+"%'";
        }
        console.log(sql);
        activityModel.activityQuery(sql,[]).then((data)=>{
           let size = Math.ceil(data[0].size/activityIntroController.pagesize);
            console.log(size);
            response.send({flag:-1,msg:"页数获取成功",data:size})
        }).catch(err=>{
            response.send({flag:-1,msg:"数据库出错"})
        });
    },
    queryActivity(request,response){
        let currentPage = request.query.currentpage;
        let queryDetail = request.query.actDetail || "";
        let queryPlace = request.query.actPlace || "";
        let sql = "select act_id,act_detail,DATE_FORMAT(act_date,'%Y-%m-%d') AS act_date," +
            "act_place,act_personcount,act_condition from activity WHERE 1=1 ";
        if(queryDetail !== ""){
            sql += " and act_detail like '%"+queryDetail+"%'";
        }
        if(queryPlace !== ""){
            sql += " and act_place like '%"+queryPlace+"%'";
        }
        sql += " limit ?,?";
        activityModel.activityQuery(sql,[(currentPage-1)*3,activityIntroController.pagesize]).then(
            function(data){
                response.send({flag:1,msg:"插入数据成功",data:data});
            }
        ).catch((err)=>{
            console.log(err);
            response.send({flag:-1,msg:"数据库出错"});
        });
    },
    addActivity(request,response){
        let detail =request.query.detail;
        let date = request.query.date;
        let place = request.query.place;
        let count = request.query.count;
        activityModel.activityQuery("insert into activity values(null,?,?,?,?,1)",[detail,date,place,count]).then(
            function(){
                console.log("插入数据成功");
                response.send({flag:1,msg:"插入数据成功"});
            }
        ).catch((err)=>{
            console.log(err);
            response.send({flag:-1,msg:"数据库出错"});
        });
    },
    updateActivity(request,response){
        let detail =request.query.detail;
        let date = request.query.date;
        let place = request.query.place;
        let count = request.query.count;
        let id = request.query.id;
        console.log("获取数据");
        console.log(detail+"/"+date+"/"+place+"/"+count);
        activityModel.activityQuery("update activity set act_detail = ? ,act_date = ? , act_place = ? ,act_personcount = ?," +
            "act_condition = ? where act_id = ?",[detail,date,place,count,1,id]).then(
            function(){
                console.log("修改数据成功");
                response.send({flag:1,msg:"修改数据成功"});
            }
        ).catch((err)=>{
            console.log(err);
            response.send({flag:-1,msg:"数据库出错"});
        });
    },
    deleteActivity(request,response){
        let id = request.query.id;
        let status = request.query.status;
        console.log("删除id："+id);
        console.log("删除status："+status);
        activityModel.activityQuery("update activity set act_condition = ? where act_id = ?",[status,id]).then(
            function(){
                console.log("删除数据成功");
                response.send({flag:1,msg:"删除数据成功"});
            }
        ).catch((err)=>{
            console.log(err);
            response.send({flag:-1,msg:"数据库出错"});
        });
    }
};

module.exports = activityIntroController;