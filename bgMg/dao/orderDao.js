const dbpool = require("../config/dbpoolconfig");

const orderModel={
    getOrder(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("select * from yd_order order by is_order limit ?,?",params,(err,data)=>{
                resolve(data);
            })
        })
    },
    orderPage(){
        return new Promise((resolve,reject)=>{
            dbpool.connect("select count(*) as a from yd_order",[],(err,data)=>{
                resolve(data)
            })
        })
    },
    changeUser(params){
        console.log(11111111111)
        return new Promise((resolve,reject)=>{
            dbpool.connect("update yd_order set is_send=? where order_id=?",params,(err,data)=>{
                if(!err){
                    resolve(data)
                }else{
                    reject(err)
                }
            })
        })
    }
};

module.exports=orderModel;
