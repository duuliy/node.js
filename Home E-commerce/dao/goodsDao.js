

const dbpool = require("../config/dbconfig");

const goodsDao = {
    conuntNum:10,
    //查条目数
    searchCount(params){
        return new Promise((resolve,reject)=>{
            let sql = "select count(1) total from t_goods where 1=1";
            let sqlData = [];
            if (params.g_id) {
                sql += " and g_id like ?";
                sqlData.push('%'+params.g_id+'%');
            }
            if (params.g_name) {
                sql += " and g_name like ?";
                sqlData.push('%'+params.g_name+'%');
            }
            if (params.g_hot!=2 && params.g_hot) {
                sql += " and g_hot=?";
                sqlData.push(params.g_hot);
            }
            if (params.state!=2 && params.state) {
                sql += " and state=?";
                sqlData.push(params.state);
            }

            dbpool.connect(sql,sqlData,(err,data)=>{
                if(!err) {
                    let msg = {};
                    if (data.length>0) {
                        msg.result = 1;
                        msg.pageTotal = Math.ceil(data[0].total/goodsDao.conuntNum);
                    } else {
                        msg.result = 0;
                        msg.pageTotal = 0;
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            });
        });
    },

    //查商品数据
    searchGoods(params){
        return new Promise((resolve,reject)=>{
            let sql = "select * from t_goods where 1=1";
            let sqlData = [];
            if (params.g_id) {
                sql += " and g_id like ?";
                sqlData.push('%'+params.g_id+'%');
            }
            if (params.g_name) {
                sql += " and g_name like ?";
                sqlData.push('%'+params.g_name+'%');
            }
            if (params.g_hot!=2 && params.g_hot) {
                sql += " and g_hot=?";
                sqlData.push(params.g_hot);
            }
            if (params.state!=2 && params.state) {
                sql += " and state=?";
                sqlData.push(params.state);
            }
            sql += " order by createtime desc";
            if (params.pageNum) {
                let per_num = (params.pageNum-1)*goodsDao.conuntNum;
                sql += " limit " + per_num + "," + goodsDao.conuntNum;
            } else {
                sql += " limit " + 0 + "," + goodsDao.conuntNum;
            }
            // console.log(sql);
            dbpool.connect(sql,sqlData,(err,data)=>{
                if(!err) {
                    let msg = {};
                    if (data.length>0) {
                        msg.result = 1;
                        msg.list = data;
                    } else {
                        msg.list = [];
                        msg.result = 0;
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            });
        });
    },
    //新增商品
    addGoods(params) {
        return new Promise((resolve,reject)=>{
            let sql = "insert into t_goods values (null,?,?,?,?,?,?,now(),default)";
            let sqlData = [];

            sqlData.push(params.a_id);
            sqlData.push(params.g_name);
            sqlData.push(params.g_model);
            sqlData.push("uploadimg/"+params.g_model);
            sqlData.push(params.g_hot);
            sqlData.push(params.g_detail);

            dbpool.connect(sql,sqlData,(err,data)=>{
                if(!err) {
                    let msg = {};
                    if(data.insertId) {
                        msg.result = 1;//新增成功
                        msg.g_id = data.insertId;
                    } else {
                        msg.result = 0;//新增失败
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            });

        })
    },

    //修改商品
    updateGoods(params) {
        return new Promise((resolve,reject)=>{
            let sql = "update t_goods set g_name=?,g_model=?,g_img=?,g_detail=? where g_id=?";
            let sqlData = [];

            sqlData.push(params.g_name);
            sqlData.push(params.g_model);
            sqlData.push("uploadimg/"+params.g_model);
            sqlData.push(params.g_detail);
            sqlData.push(params.g_id);

            dbpool.connect(sql,sqlData,(err,data)=>{
                if(!err) {
                    let msg = {};
                    if(data.affectedRows) {
                        msg.result = 1;//更新成功
                    } else {
                        msg.result = 0;//更新失败
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            });

        })
    },

    //设置热门商品
    hotGoods(params){
        return new Promise((resolve,reject)=>{
            let sql = "update t_goods set g_hot=? where g_id in (?)";

            dbpool.connect(sql,[params.g_hot,[params.g_id]],(err,data)=>{
                if(!err) {
                    let msg = {};
                    if(data.affectedRows) {
                        msg.result = 1; //设置成功
                    } else {
                        msg.result = 0; //设置失败
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            });
        });
    },

    //设置上架下架
    stateGoods(params){
        return new Promise((resolve,reject)=>{
            let sql = "update t_goods set state=? where g_id in (?)";

            dbpool.connect(sql,[params.state,[params.g_id]],(err,data)=>{
                if(!err) {
                    let msg = {};
                    if(data.affectedRows) {
                        msg.result = 1; //设置成功
                    } else {
                        msg.result = 0; //设置失败
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            });
        });
    },

    //查商品sku数据
    searchSku(params){
        return new Promise((resolve,reject)=>{
            let sqlData = [];
            let sql = "SELECT a.*,b.g_p_name g_c_name,c.g_p_name g_s_name " +
                      "FROM t_g_sku a LEFT JOIN t_g_prop b ON a.g_p_id=b.g_p_id " +
                      "LEFT JOIN t_g_prop c ON a.g_p_id_s=c.g_p_id WHERE 1=1";

            if(params.g_id) {
                sql += " and a.g_id=?";
                sqlData.push(params.g_id);
            }

            if(params.sku_id) {
                sql += " and a.sku_id=?";
                sqlData.push(params.sku_id);
            }

            dbpool.connect(sql,sqlData,(err,data)=>{
                if(!err) {
                    let msg = {};
                    if (data.length>0) {
                        msg.result = 1;
                        msg.list = data;
                    } else {
                        msg.list = [];
                        msg.result = 0;
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            });
        });
    },

    //更新sku数据
    updateSku(params){
        return new Promise((resolve,reject)=>{
            let sql = "update t_g_sku set g_p_id=?,g_p_id_s=?," +
                      "sku_pur=?,sku_disc=?,sku_sell=?,sku_stock=?,state=?" +
                      " where sku_id=?";

            let sqlData = [];
            sqlData.push(params.g_p_id);
            sqlData.push(params.g_p_id_s);
            sqlData.push(params.sku_pur);
            sqlData.push(params.sku_disc);
            sqlData.push(params.sku_sell);
            sqlData.push(params.sku_stock);
            sqlData.push(params.state);
            sqlData.push(params.sku_id);

            dbpool.connect(sql,sqlData,(err,data)=>{
                if(!err) {
                    let msg = {};
                    if(data.affectedRows) {
                        msg.result = 1; //成功
                    } else {
                        msg.result = 0; //失败
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            });
        })
    },

    //新增sku数据
    addSku(params){
        return new Promise((resolve,reject)=>{
            let sql = "insert into t_g_sku values (null,?,?,?,?,?,?,?,?,now(),?)";

            let sqlData = [];
            sqlData.push(params.g_id);
            sqlData.push(params.g_p_id);
            sqlData.push(params.a_id);
            sqlData.push(params.g_p_id_s);
            sqlData.push(params.sku_pur);
            sqlData.push(params.sku_sell);
            sqlData.push(params.sku_stock);
            sqlData.push(params.sku_disc);
            sqlData.push(params.state);

            dbpool.connect(sql,sqlData,(err,data)=>{
                if(!err) {
                    let msg = {};
                    if(data.insertId) {
                        msg.result = 1; //成功
                        msg.sku_id = data.insertId;
                    } else {
                        msg.result = 0; //失败
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            });
        })
    },

    //查询属性信息
    propInfo(params){
        return new Promise((resolve,reject)=>{
            sql = "select * from t_g_prop where 1=1";
            if(params.g_p_prop) {
                sql += " and g_p_prop=? and state=1";
            }

            dbpool.connect(sql,[params.g_p_prop],(err,data)=>{
                if(!err) {
                    let msg = {};
                    msg.result = 1;
                    msg.list = data;
                    resolve(msg);
                } else {
                    reject(err);
                }
            });
        });
    },

    //查商品标签信息
    goodsTagsInfo(params){
        return new Promise((resolve,reject)=>{
            let sql = "SELECT a.*,b.t_name FROM t_g_tags a LEFT JOIN t_tags b ON a.t_id=b.t_id WHERE 1=1";
            let sqlData = [];

            if(params.g_id) {
                sql += " and g_id=?";
                sqlData.push(params.g_id);
            }
            if(params.g_t_id) {
                sql += " and g_t_id=?";
                sqlData.push(params.g_t_id);
            }

            dbpool.connect(sql,sqlData,(err,data)=>{
                if(!err) {
                    let msg = {};
                    msg.result = 1;
                    if(data.length>0) {
                        msg.list = data; //返回查到的数据
                    } else {
                        msg.list = []; //返回空数组
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            });
        });
    },

    //查标签信息
    getTagsInfo(params){
        return new Promise((resolve,reject)=>{
            let sql = "select * from t_tags where t_g_id!=0";
            dbpool.connect(sql,params,(err,data)=>{
                if(!err) {
                    let msg = {};
                    msg.result = 1;
                    if(data.length>0) {
                        msg.list = data; //返回查到的数据
                    } else {
                        msg.list = []; //返回空数组
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            });
        })
    },

    //新增商品标签
    addGoodsTags(params){
        return new Promise((resolve,reject)=>{
            let sql = "insert into t_g_tags values (null,?,?)";
            dbpool.connect(sql,[params.g_id,params.t_id],(err,data)=>{
                if(!err){
                    let msg = {};
                    if(data.insertId) {
                        msg.result = 1; //新增成功
                        msg.g_t_id = data.insertId;
                    } else {
                        msg.result = 0; //新增失败
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            })
        })
    },

    //更新商品标签
    updateGoodsTags(params){
        return new Promise((resolve,reject)=>{
            let sql = "update t_g_tags set t_id=? where g_t_id=?";
            dbpool.connect(sql,[params.t_id,params.g_t_id],(err,data)=>{
                if(!err){
                    let msg = {};
                    if(data.affectedRows) {
                        msg.result = 1; //更新成功
                    } else {
                        msg.result = 0; //更新失败
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            });
        });
    },

    //删除商品标签
    delGoodsTags(params){
        return new Promise((resolve,reject)=>{
            let sql = "delete from t_g_tags where g_t_id=?";
            dbpool.connect(sql,[params.g_t_id],(err,data)=>{
                if(!err) {
                    let msg = {};
                    if(data.affectedRows) {
                        msg.result = 1;
                    } else {
                        msg.result = 0;
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            });
        });
    }

};

module.exports = goodsDao;
