/**
 * Created by a on 2017/11/17.
 */
const dbpool = require("../config/dbconfig");
const threeDAO={
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
    },
    //标签管理系列
    revisetag(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("update t_t_tags set t_id=?,t_id2=?,t_space_id=?,t_room_id=?,t_map_id=? where g_t_id=?",
                params,(err,data)=>{
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    },

    style(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("select t_id from t_t_tags where g_t_id=?",
                params,(err,data)=>{
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    space(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("select t_space_id from t_t_tags where g_t_id=?",
                params,(err,data)=>{
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    room(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("select t_room_id from t_t_tags where g_t_id=?",
                params,(err,data)=>{
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    map(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("select t_map_id from t_t_tags where g_t_id=?",
                params,(err,data)=>{
                    if(!err){
                        resolve(data)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    goods(params){
        return new Promise(function(resolve,reject){
            dbpool.connect("select * from t_t_goods where t_id=?",
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

module.exports=threeDAO;