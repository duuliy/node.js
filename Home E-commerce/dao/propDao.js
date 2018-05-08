

const dbpool = require("../config/dbconfig");

const propDao = {
    conuntNum:10,
    //查询条目
    searchCount(params){
        return new Promise((resolve,reject)=>{
            let sql = "select count(1) total from t_g_prop a left join t_admin b on a.a_id=b.a_id where 1=1"
            let sqlData = [];

            if (params.g_p_name) {
                sql += " and a.g_p_name like ?";
                sqlData.push('%'+params.g_p_name+'%');
            }
            if (params.g_p_prop!=0 && params.g_p_prop) {
                sql += " and a.g_p_prop=?";
                sqlData.push(params.g_p_prop);
            }
            if (params.state!=2 && params.state) {
                sql += " and a.state=?";
                sqlData.push(params.state);
            }
            if(params.g_p_id) {
                sql += " and a.g_p_id=?";
                sqlData.push(params.g_p_id);
            }

            dbpool.connect(sql,sqlData,(err,data)=>{
                if(!err) {
                    let msg = {};
                    if (data.length>0) {
                        msg.result = 1;
                        msg.pageTotal = Math.ceil(data[0].total/propDao.conuntNum);
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
    //查询属性数据
    searchProp(params){
        return new Promise((resolve,reject)=>{
            let sql = "select a.*,b.a_name from t_g_prop a left join t_admin b on a.a_id=b.a_id where 1=1"
            let sqlData = [];

            if (params.g_p_name) {
                sql += " and a.g_p_name like ?";
                sqlData.push('%'+params.g_p_name+'%');
            }
            if (params.g_p_prop!=0 && params.g_p_prop) {
                sql += " and a.g_p_prop=?";
                sqlData.push(params.g_p_prop);
            }
            if (params.state!=2 && params.state) {
                sql += " and a.state=?";
                sqlData.push(params.state);
            }
            if(params.g_p_id) {
                sql += " and a.g_p_id=?";
                sqlData.push(params.g_p_id);
            }
            if (params.pageNum) {
                let per_num = (params.pageNum-1)*propDao.conuntNum;
                sql += " limit " + per_num + "," + propDao.conuntNum;
            } else {
                sql += " limit " + 0 + "," + propDao.conuntNum;
            }

            dbpool.connect(sql,sqlData,(err,data)=>{
                if(!err) {
                    let msg = {};
                    if (data.length>0) {
                        msg.result = 1; //查询到信息
                        msg.list = data;
                    } else {
                        msg.list = [];
                        msg.result = 0; //未查询到信息
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            });

        });
    },

    //新增属性
    addProp(params){
        return new Promise((resolve,reject)=>{
            let sql = "insert into t_g_prop values (null,?,?,?,now(),?)";
            let sqlData = [];
            sqlData.push(params.a_id);
            sqlData.push(params.g_p_prop);
            sqlData.push(params.g_p_name);
            sqlData.push(params.state);

            dbpool.connect(sql,sqlData,(err,data)=>{
                if(!err) {
                    let msg = {};
                    if (data.insertId) {
                        msg.result = 1; //新增成功
                    } else {
                        msg.result = 0; //新增失败/
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            });
        });
    },

    //修改属性
    updateProp(params){
        return new Promise((resolve,reject)=>{
            let sql;
            let sqlData = [];
            if(params.g_p_name) {
                sql = "update t_g_prop set g_p_name=?,g_p_prop=? where g_p_id=?";
                sqlData.push(params.g_p_name);
                sqlData.push(params.g_p_prop);
                sqlData.push(params.g_p_id);
            } else {
                sql = "update t_g_prop set state=? where g_p_id=?";
                sqlData.push(params.state);
                sqlData.push(params.g_p_id);
            }

            dbpool.connect(sql,sqlData,(err,data)=>{
                if(!err) {
                    let msg = {};
                    if(data.affectedRows) {
                        msg.result = 1; //修改成功
                    } else {
                        msg.result = 0; //修改失败
                    }
                    resolve(msg);
                } else {
                    reject(err);
                }
            });

        });
    }
};

module.exports = propDao;
