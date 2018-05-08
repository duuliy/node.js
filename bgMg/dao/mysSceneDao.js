const mysql=require("mysql");
const dbpool = require("../config/dbpoolConfig.js");

const sceneDao={
    /*自加载*/
    getAllScene(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("SELECT * FROM yd_scene limit ?,?",params,(err,data)=>{
                resolve(data);
            })
        })
    },

    /*分页*/
    scenePage(){
        return new Promise((resolve,reject)=>{
            dbpool.connect("SELECT COUNT(*) AS a FROM yd_scene",[],(err,data)=>{
                resolve(data);
            })
        })
    },

    //新增
    getAdd(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("INSERT INTO yd_scene VALUES (?,?,?)",params,(err,data)=>{
                resolve(data);
            })

        })
    },


    /*删除*/
    getDelScene(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("DELETE FROM yd_scene WHERE scene_id=?",params,(err,data)=>{
                resolve(data);
            })
        })
    },

    //修改
    getUp(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("update yd_scene SET name=?,scene_img=? WHERE scene_id=?",params,(err,data)=>{
                resolve(data);
            })
        })
    },

    //获取单条数据
    getDan(params){
        return new Promise((resolve, reject)=> {
            dbpool.connect("select * from yd_scene where scene_id=?", params, (err, data)=> {
                resolve(data);
            })
        })
    }


}

module .exports=sceneDao;