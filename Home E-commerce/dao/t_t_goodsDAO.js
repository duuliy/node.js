/**
 * Created by a on 2017/11/17.
 */
const dbpool = require("../config/dbconfig");
const t_t_goodsDAO={
    show(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("SELECT a.*,b.d_id,c.a_id FROM t_threeD a LEFT JOIN t_designer b ON a.d_id=b.d_id LEFT JOIN t_admin c ON a.a_id=c.a_id",params,
                (err,data)=>{
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    star(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("update t_threeD set state=0 where t_id=?",
                params,(err,data)=>{
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    stop(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("update t_threeD set state=1 where t_id=?",
                params,(err,data)=>{
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    revise(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("update t_threeD set t_name=?,t_img=?,d_id=?,t_detail=? where t_id=?",
                params,(err,data)=>{
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    add(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("insert into t_threeD values(?,?,?,?,?,?,?,?)",
                params,(err,data)=>{
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    }
};

module.exports=t_t_goodsDAO;