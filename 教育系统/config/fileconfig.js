/**
 * Created by a on 2017/10/23.
 */
const mysql = require("mysql");
const dbpool = {
    pool:{},
    config:{
        host:"localhost", //主机地址
        port:"3306",  //端口默认是3306
        user:"root",
        password:"940125",
        database:"day6"
    },
    create(){
        console.log("创建连接池");
        //都用同一个连接池
        this.pool = mysql.createPool(this.config)
    },
    connect(sql,arr,fn){
       /* 3.发起query*/
        this.pool.getConnection((err,connection)=>{
            /*
             *  * 1.SQL语句
             * 2.SQL参数
             * 3.回调函数 -- 执行完sql语句之后调用，把结果注入在回调函数参数里面，作出响应*/
            connection.query(sql,arr,fn);
            /*4.释放连接*/
            connection.release();
        })
    }
}
module.exports = dbpool;
dbpool.create();