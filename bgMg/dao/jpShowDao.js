const dbpool=require("../config/dbpoolConfig.js");

const jpShowModel={
    jpShow(){
        return new Promise((resolve,reject)=>{
            let sql="SELECT custom_img_path FROM yd_custom_made";
            dbpool.connect(sql,[],
                (err,data)=>{
                    if(!err){
                        resolve(data);
                    }else{
                        reject(err);
                    }

                }
            )
        })
    },
    buyGoods(params){
        return new Promise((resolve,reject)=>{
            let sql="SELECT NAME,info,price FROM yd_goods WHERE NAME=?";
            dbpool.connect(sql,params,
                (err,data)=>{
                    if(!err){
                        resolve(data);
                    }else{
                        reject(err);
                    }
                }
            )
        })
    },
    actionGoods(params){
        return new Promise((resolve,reject)=>{
            let sql="SELECT act_name FROM yd_action WHERE act_id IN(SELECT act_id FROM yd_goods_action WHERE goods_id=(SELECT goods_id FROM yd_goods WHERE NAME=?))";
            dbpool.connect(sql,params,
                (err,data)=>{
                    if(!err){
                        resolve(data);
                    }else{
                        reject(err);
                    }
                }
            )
        })
    },
    colorGoods(params){
        return new Promise((resolve,reject)=>{
            let sql="SELECT NAME FROM yd_color WHERE color_id IN(SELECT color_id FROM yd_goods_color WHERE goods_id=(SELECT goods_id FROM yd_goods WHERE NAME=?))";
            dbpool.connect(sql,params,
                (err,data)=>{
                    if(!err){
                        resolve(data);
                    }else{
                        reject(err);
                    }
                }
            )
        })
    },
    sizeGoods(params){
        return new Promise((resolve,reject)=>{
            let sql="SELECT notice FROM yd_size WHERE size_id IN(SELECT size_id FROM yd_goods_size WHERE goods_id=(SELECT goods_id FROM yd_goods WHERE NAME=?))";
            dbpool.connect(sql,params,
                (err,data)=>{
                    if(!err){
                        resolve(data);
                    }else{
                        reject(err);
                    }
                }
            )
        })
    },
    balanceGoods(params){
        return new Promise((resolve,reject)=>{
            let sql="SELECT consi_name,consi_phone,state,city,district,address FROM yd_user_address WHERE user_id=(SELECT user_id FROM yd_user WHERE u_name=?)";
            dbpool.connect(sql,params,
                (err,data)=>{
                    if(!err){
                        resolve(data);
                    }else{
                        reject(err);
                    }
                }
            )
        })
    }
}
module.exports=jpShowModel;
