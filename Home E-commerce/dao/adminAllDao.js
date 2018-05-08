const dbpool = require("../config/dbconfig");
const adminDao = {
    getAdmin(arr,arr1){
        return new Promise((resolve,reject)=>{
            var sql = 'SELECT *,(SELECT a_name FROM t_admin AS b WHERE a.t_a_a_id=b.a_id) AS "create" FROM t_admin AS a WHERE 1=1';
            if(arr.length>0){
                if(arr1){
                    if(arr1.length!=0){
                        for(var i=0;i<arr1.length;i++){
                            if(arr1[i]==1){
                                sql += ' and a_name=?';
                            }
                            if(arr1[i]==2){
                                sql += ' and a_tel=?';
                            }
                            if(arr1[i]==3){
                                sql += ' and state=?';
                            }
                        }
                    }
                }else{
                    sql += ' and a_id=?';
                }
            }
            dbpool.connect(sql,arr,(err,data)=>{
                resolve(data);
            })
        })
    },
    addAdmin(arr){
        return new Promise((resolve,reject)=>{
            var sql = '';
            if(arr.length==4){
                sql += 'INSERT INTO t_admin(t_a_a_id,a_name,a_pwd,a_tel) VALUES (?,?,?,?)'
            }else if(arr.length==5){
                sql += 'UPDATE t_admin SET t_a_a_id=?,a_name=?,a_pwd=?,a_tel=? WHERE a_id=?'
            }
            dbpool.connect(sql,arr,(err,data)=>{
                resolve(data);
            });
        });
    },
    setState(arr){
        return new Promise((resolve,reject)=>{
            dbpool.connect('UPDATE t_admin SET state=? WHERE a_id=?',arr,(err,data)=>{
                    resolve(data);
            })
        })
    }
};

module.exports=adminDao;