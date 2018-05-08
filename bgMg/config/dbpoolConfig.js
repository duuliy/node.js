
const mysql=require("mysql");

const dbpool={
    pool:{},
    config:{
        post:"localhost",
        port:"3306",
        user:"root",
        password:"root",
        database:"lamp"
    },
    create(){
        this.pool=mysql.createPool(this.config)
    },
    connect(sql,arr,fn){
        this.pool.getConnection((err,connection)=>{
            connection.query(sql,arr,fn);
            connection.release();
        })
    }
}
module.exports=dbpool;
dbpool.create();




