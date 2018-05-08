/**
 * Created by Administrator on 2017/11/14.
 */
"use strict";
const db = require("../config/sqlConfig.js");
const plantTea = {
    pageCount:5,
    getPlant(currentPage){
        return new Promise(function(resolve,reject){
            db.connect("select * from tea order by tea_id DESC limit ?,?",
                [(currentPage - 1) * plantTea.pageCount, plantTea.pageCount],
                (err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    updaTea(teaname,tea_text,tea_status,tea_img,tea_condition){
        return new Promise(function(resolve,reject){
            db.connect("update tea set tea_img=?,tea_text=?,tea_condition=? where tea_category=?",[tea_img,tea_text,tea_condition,teaname],(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    addinsert(teaname,tea_text,tea_img){
        return new Promise(function(resolve,reject){
            db.connect("insert into tea values(?,?,?,?,?)",[null,tea_img,tea_text,teaname,1],(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    deleTea(tea_id){
        return new Promise(function(resolve,reject){
            db.connect("update tea set tea_condition=? where tea_id=?",[0,tea_id],(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    serrchTea(tea_status,tea_category,currentPage){
        return new Promise(function(resolve,reject){
            let sql="select * from tea where 1=1";
            let params=[];
            //if(tea_status!=""){
            //    sql+=" and tea_status like ?";
            //    tea_status="%"+tea_status+"%";
            //    tea_status=tea_status.trim();
            //    params.push(tea_status)
            //}
            if(tea_category!=""){
                sql+=" and tea_category like ?";
                tea_category="%"+tea_category+"%";
                tea_category=tea_category.trim();
                params.push(tea_category)
            }

            sql+=" limit ?,?";
            params.push((currentPage - 1) * plantTea.pageCount);
            params.push(plantTea.pageCount);

            db.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    },
    getpage(tea_status,tea_category){
        return new Promise(function(resolve,reject){
         let sql="select count(*) as totalcount from tea where tea_condition=1";
         let params=[];
        //if(tea_status!=""){
        //    sql+=" and tea_status like ?";
        //    tea_status="%"+tea_status+"%";
        //    tea_status=tea_status.trim();
        //    params.push(tea_status)
        //}
        if(tea_category!=""){
            sql+=" and tea_category like ?";
            tea_category="%"+tea_category+"%";
            tea_category=tea_category.trim();
            params.push(tea_category)
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
    getTeaname(){
        return new Promise(function(resolve,reject){
            db.connect("select DISTINCT tea_category from tea","",(err,data)=>{
                if(!err){
                    console.log(data);
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    }
};



module .exports = plantTea;