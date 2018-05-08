/**
 * Created by Administrator on 2017/11/14 0014.
 */
    "use strict";
    const customDao = require("../dao/customDao.js");
const customMangerCon = {
    getCustomMessC(request,reponse){
        let nowPage = request.body.nowPagec;
        let params = [];
        params.push(parseInt((parseInt(nowPage)-1)*customDao.currentPage));
        params.push(customDao.currentPage);
        customDao.getCustomMessD(params).then(function(data){
            reponse.send(data);
        })
    },
    searchCustomC(request,reponse){
        let params = [];
        let sql = "SELECT a.user_id,user_name,user_sex,user_tel,DATE_FORMAT(user_birth,'%Y-%m-%d') AS user_birth,COUNT(order_condition) AS mycount " +
            "FROM USER AS a LEFT JOIN orderform AS b ON a.user_id=b.user_id where 1=1 ";
        let username = request.body.username;
        let userNum = request.body.userNum;
        let user_tel = request.body.user_tel;
        let nowPage = request.body.nowPagec;
        console.log(username,userNum,user_tel,nowPage);
        if(username!=""){
            params.push(username);
            sql += " and a.user_name = ? ";
        }
        if(userNum!=""){
            console.log("in userNum");
            params.push(parseInt(userNum));
            sql += " and a.user_id = ? ";
        }
        if(user_tel!=""){
            params.push(user_tel);
            sql += " and a.user_tel= ? "
        }
        sql += "  GROUP BY a.user_id  limit ?,? ";

        params.push(parseInt((parseInt(nowPage)-1)*customDao.currentPage));
        params.push(customDao.currentPage);
        console.log(sql);
        console.log(params);
        customDao.searchCustomD(sql,params).then(function(data){
            reponse.send(data);
        })
    },
    getTotalPageCustomC(request,response){
        let params = [];
        let sql = "SELECT a.user_id,user_name,user_sex,user_tel,DATE_FORMAT(user_birth,'%Y-%m-%d') AS user_birth,COUNT(order_condition) AS mycount " +
            "FROM USER AS a LEFT JOIN orderform AS b ON a.user_id=b.user_id where 1=1 ";
        let username = request.query.username;
        let userNum = request.query.userNum;
        let user_tel = request.query.user_tel;
        if(username!=""){
            params.push(username);
            sql += " and a.user_name = ? ";
        }
        if(userNum!=""){
            console.log("in userNum");
            params.push(parseInt(userNum));
            sql += " and a.user_id = ? ";
        }
        if(user_tel!=""){
            params.push(user_tel);
            sql += " and a.user_tel= ? "
        }
        sql +="GROUP BY a.user_id";
        console.log(sql);
        customDao.getTotalPageCustomD(sql,params).then(function(data){
            var length = data.length;
            var result = Math.ceil(length/customDao.currentPage);
            response.send(200,result);
        })
    },
    searchMessC(request,response){
        customDao.searchMessD("").then( function(data){
            response.send(data);
        })
    }

};
module .exports = customMangerCon;