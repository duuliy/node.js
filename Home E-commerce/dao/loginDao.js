
const dbpool = require('../config/dbconfig');
const loginModule = {
    userDao(arr){
        return new Promise((resolve,reject)=>{
            var sql = 'SELECT * FROM t_admin WHERE 1=1';
            if(arr.length>0){
                sql += ' AND a_name=?'
            }
            if(arr.length>1){
                sql += ' AND a_pwd=?'
            }
            dbpool.connect(sql,arr,(err,data)=>{
                resolve(data);
            })
        })
    }
};
module.exports=loginModule;
