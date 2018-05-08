/**
 * Created by GY on 2017/11/13 0013.
 */
    "use strict";
const orderMangerDao = require("../dao/orderMangerDao.js");


const orderMangerC = {
    getOrderMessC(request,response){
        let nowPage = request.body.nowPagec;
        let params = [];
        params.push(parseInt((parseInt(nowPage)-1)*orderMangerDao.currentPage));
        params.push(orderMangerDao.currentPage);
        orderMangerDao.getOrderMessD(params).then(function(data){
            response.send(data);
        })
    },
    getTotalPageC(request,response){
        let sql = "SELECT Count(*) as mycount FROM orderform,USER WHERE user.user_id = orderform.user_id";
        let params = [];
        let username = request.query.username;
        let orderNum = request.query.orderNum;
        let nowPage = request.query.nowPagec;
        if(username!=""){
            //params.push(username);
            //sql += " and user.user_name = ? ";
            sql += " and user.user_name like '%"+username+"%' ";
        }
        if(orderNum!=""){
            params.push(parseInt(orderNum));
            sql += " and orderform.order_id = ? ";
        }
        orderMangerDao.getTotalPageD(sql,params).then(function(data){
            var result = Math.ceil(data[0].mycount/orderMangerDao.currentPage);
            response.send(200,result);
        })

    },
    getUserNameC(request,response){
        orderMangerDao.getUserNameD("").then(function(data){
            response.send(data);
        })
    },
    orderNumC(request,response){
        orderMangerDao.orderNumD("").then(function(data){
            response.send(data);
        })
    },
    packMuilC(request,response){
        orderMangerDao.packMuilD("").then(function(data){
            response.send(data);
        })
    },
    packImgC(request,response){
        orderMangerDao.packImgD("").then(function(data){
            response.send(data);
        })
    },
    searchOrderC(request,response){
        let params = [];
        let sql = "SELECT * FROM orderform,USER WHERE user.user_id = orderform.user_id ";
        let username = request.body.username;
        let orderNum = request.body.orderNum;
        let nowPage = request.body.nowPagec;
        if(username!=""){
            //params.push(username);
            //sql += " and user.user_name = ? ";
            sql += " and user.user_name like '%"+username+"%' ";
        }
        if(orderNum!=""){
            params.push(orderNum);
            sql += " and orderform.order_id = ? ";
        }
        sql += "  limit ?,? ";
        params.push(parseInt((parseInt(nowPage)-1)*orderMangerDao.currentPage));
        params.push(orderMangerDao.currentPage);
        orderMangerDao.searchOrderD(sql,params).then(function(data){
            response.send(data);
        })
    },
    saveSendThingC(request,response){
        let order_id = request.query.order_idS;
        let order_status = request.query.order_status;
        //console.log(order_id,order_status);
        orderMangerDao.saveSendThingD([order_status,order_id]).then(function(data){
            response.send("修改成功");
        })
    },
    getProImgC(request,response){
        let params = [];
        params.push(request.body.order_id);
        orderMangerDao.getProImgD(params).then(function(data){
            response.send(data);
        })
    }
};
module .exports =  orderMangerC;