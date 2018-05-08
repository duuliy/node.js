/**
 * Created by dell on 2017/11/15.
 */
const dbPool = require("../config/sqlconfig");

const packModel = {
    //每页显示个数
    pageCount:5,
    //显示数据
    showMyImg(sql,params){
        return new Promise((resolve,reject)=>{
            dbPool.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    //新增
    newPack(params){
        return new Promise((resolve,reject)=>{
            dbPool.connect("insert into packimg values(?,?,?,?,?,?)",params,(err,data)=>{
                if(!err){
                    resolve(data)
                }else{
                    reject(err)
                }
            })
        })
    },
    //删除
    deletePack(params){
        return new Promise((resolve,reject)=>{
            dbPool.connect("update packimg set pack_img_condition=0 where pack_img_id=?",params,(err,data)=>{
                if(!err){
                    resolve(data)
                }else{
                    reject(err)
                }
            })
        })
    },
    //修改
    changeInfo(params){
        return new Promise((resolve,reject)=>{
            dbPool.connect("update packimg set pack_img_name=?,pack_price=?,pack_img_url=? where pack_img_id=?",params,(err,data)=>{
                if(!err){
                    resolve(data)
                }else{
                    reject(err)
                }
            })
        })
    },
    //搜索
    searchInfo(params){
        return new Promise((resolve,reject)=>{
            dbPool.connect("select * from packimg,packmaterial where  packimg.pack_mat_id = packmaterial.pack_mat_id and pack_mat_name=?",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    //获取页数
    getPage(sql,params){
        return new Promise((resolve,reject)=>{
            dbPool.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data)
                }else{
                    reject(err)
                }
            })
        })
    }
};

module.exports = packModel;