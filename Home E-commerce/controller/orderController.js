const path=require("path");
const mysql=("mysql");
const orderPageDao=require("../dao/orderDao.js");
const orderController={
    getAllOrder(req,res){
        let sql="select * from t_order where 1=1";
        let params=[];
        let seluid=req.query.seluid||"";
        let selstatus=req.query.selstatus||"";
        if(seluid){
            sql+=" and u_id=?";
            params.push(seluid);
        }
        if(selstatus){
            sql+=" and o_status=?";
            params.push(selstatus);
        }
        orderPageDao.getAllOrder(sql,params).then(data=>{
            res.render("order.ejs",{admin:"admin",list:data});
        })
    },
    getAllOrder2(req,res){
        let sql="select * from t_order where 1=1";
        let params=[];
        let seluid=req.query.seluid||"";
        let selstatus=req.query.selstatus||"";
        if(seluid){
            sql+=" and u_id=?";
            params.push(seluid);
        }
        if(selstatus){
            sql+=" and o_status=?";
            params.push(selstatus);
        }
        orderPageDao.getAllOrder(sql,params).then(data=>{
            res.send(data);
        })
    },
    getAllOrderGoods(req,res){
        let sql="select g_name,o_g_qua,o_g_price,sku_id from t_o_goods,t_goods where t_o_goods.g_id=t_goods.g_id";
        let params=[];
        orderPageDao.getAllOrderGoods(sql,params).then(data=>{
            res.render("orderGoods.ejs",{admin:"admin",list:data})
        });
    },
    updateOrder(req,res){
        let order_state=req.query.order_state;
        let query_state=req.query.query_state;
        let query_order_name=req.query.query_order_name;
        let sql = "update t_order set o_status=?,state=? where o_id=?";
        let params = [order_state,query_state,query_order_name];
        orderPageDao.updateOrder(sql,params).then((data)=>{
            orderPageDao.getAllOrder("select * from t_order",[]).then((data)=>{
                res.send(data);
            })
        });
    },
    updateOrder2(req,res){
        let order_state=req.query.order_state;
        let query_state=req.query.query_state;
        let query_order_name=req.query.query_order_name;
        let sql = "update t_order set o_status=?,state=? where o_id=?";
        let params = [order_state,query_state,query_order_name];
        orderPageDao.updateOrder(sql,params).then((data)=>{
            orderPageDao.getAllOrder("select * from t_order",[]).then((data)=>{
                res.send(data);
            })
        });
    }
};

module.exports=orderController;