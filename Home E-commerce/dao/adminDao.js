const dbpool = require("../config/dbconfig");
const adminDao = {
    getAdmin(arr){
        return new Promise((resolve,reject)=>{
            var sql = 'SELECT *,(SELECT a_name FROM t_admin AS b WHERE a.t_a_a_id=b.a_id) AS "create" FROM t_admin AS a WHERE 1=1';
            sql += ' and a_id=?';
            dbpool.connect(sql,arr,(err,data)=>{
                resolve(data);
            })
        })
    },
    getInfo(arr){
        return new Promise((resolve,reject)=>{
            var sql = 'UPDATE t_admin SET a_pwd=?,a_tel=?,a_headimg=? WHERE a_id=?';
            dbpool.connect(sql,arr,(err,data)=>{
                resolve(data);
            })
        })
    },
    getPwd(arr){
        return new Promise((resolve,reject)=>{
            var sql = 'SELECT * FROM t_admin WHERE a_pwd=? AND a_id=?';
            dbpool.connect(sql,arr,(err,data)=>{
                resolve(data);
            })
        })
    }

};

module.exports=adminDao;
