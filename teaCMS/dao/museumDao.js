/**
 * Created by Administrator on 2017/11/17.
 */
/**
 * Created by Administrator on 2017/11/14.
 */
    "use strict";
const db = require("../config/sqlConfig.js");
const getMuseum = {
    pageCount:5,
    getMuseum(currentPage){
        return new Promise(function(resolve,reject){
            db.connect("SELECT a.doc_id,a.doc_condition,b.pro_name,a.doc_title,a.doc_publisher,DATE_FORMAT(a.doc_time,'%Y-%m-%d') AS doc_time," +
                " a.doc_content,a.doc_url FROM museum AS a LEFT JOIN productinfo AS b ON a.pro_id=b.pro_id order by a.doc_id DESC limit ?,?",
                [(currentPage - 1) * getMuseum.pageCount, getMuseum.pageCount],
                (err,data)=>{
                    if(!err){
                        resolve(data);
                    }else{
                        reject(err)
                    }
                })
        })
    },
    updaMuseum(params){
        return new Promise(function(resolve,reject){
            db.connect("update museum set pro_id=?,doc_title=?,doc_publisher=?,doc_time=?,doc_content=?,doc_url=?,doc_condition=? where doc_id=?",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    addMuseum(pro_id,doc_title,doc_publisher,doc_time,doc_content,doc_url){
        return new Promise(function(resolve,reject){
            db.connect("insert into museum values(?,?,?,?,?,?,?,?)",[null,pro_id,doc_title,doc_publisher,doc_time,doc_content,doc_url,1],(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    deleMuseum(doc_id){
        return new Promise(function(resolve,reject){
            db.connect("update museum set doc_condition=? where doc_id=?",[0,doc_id],(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    serrchMuseum(pro_id,doc_publisher,currentPage){
        return new Promise(function(resolve,reject){
            let sql="SELECT a.doc_id,a.doc_condition,b.pro_name,a.doc_title,a.doc_publisher,DATE_FORMAT(a.doc_time,'%Y-%m-%d') AS doc_time," +
                " a.doc_content,a.doc_url FROM museum AS a LEFT JOIN productinfo AS b ON a.pro_id=b.pro_id where 1=1";
            let params=[];
            if(pro_id!=""){
                sql+=" and a.pro_id=?";
                params.push(pro_id)
            }
            if(doc_publisher!=""){
                sql+=" and doc_publisher like ?";
                doc_publisher="%"+doc_publisher+"%";
                doc_publisher=doc_publisher.trim();
                params.push(doc_publisher)
            }

            sql+=" limit ?,?";
            params.push((currentPage - 1) * getMuseum.pageCount);
            params.push(getMuseum.pageCount);
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    getMuseumPage(pro_id,doc_publisher){
        return new Promise(function(resolve,reject){
            let sql="SELECT count(*) as totalcount FROM museum AS a LEFT JOIN productinfo AS b ON a.pro_id=b.pro_id where doc_condition=1";
            let params=[];
            if(pro_id!=""){
                sql+=" and a.pro_id=?";
                params.push(pro_id);
            }
            if(doc_publisher!=""){
                sql+=" and doc_publisher like ?";
                doc_publisher="%"+doc_publisher+"%";
                doc_publisher=doc_publisher.trim();
                params.push(doc_publisher)
            }
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },

    //获取商品
    getPlayname(){
        return new Promise(function(resolve,reject){
            db.connect("select pro_name,pro_id from productinfo where pro_condition=1;select role_id,admin_login from admin","",(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    }
};



module .exports = getMuseum;