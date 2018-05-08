/**
 * Created by Administrator on 2017/11/14.
 */

'use strict'

const dbpool=require("../config/dbconfig.js");

const designerModel={
    addDesignerDao(sql,params){
        return new Promise(function(resolve,reject){
            dbpool.connect(sql,
                params,(err,data)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(data);
                    }
                })
        })
    },
    getAllDesignerDao(sql,params){
        return new Promise(function(resolve,reject){
            dbpool.connect(sql,params,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    },
    AllDesignerListDao(sql,params){
        return new Promise(function(resolve,reject){
            dbpool.connect(sql,params,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    },
    getOneListDao(sql,params){
        return new Promise(function(resolve,reject){
            dbpool.connect(sql,params,(err,data)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(data);
                    }
                })
        })
    },
    modifyDesignerDao(sql,params){
        return new Promise(function(resolve,reject){
            dbpool.connect(sql,params,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    },
    searchDesignerDao(sql,params){
        return new Promise(function(resolve,reject){
            dbpool.connect(sql,params,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    },
    queryDesignerDao(sql,params){
        return new Promise(function(resolve,reject){
            dbpool.connect(sql,params,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    //console.log(data)
                    resolve(data);
                }
            })
        })
    },
    getCountDao(sql,params){
        return new Promise(function(resolve,reject){
            dbpool.connect(sql,params,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    console.log(data)
                    resolve(data);
                }
            })
        })
    },
    deleteDesignerDao(sql,params){
        return new Promise(function(resolve,reject){
            dbpool.connect(sql,params,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    },
    updatePathnameDao(sql,params){
        return new Promise(function(resolve,reject){
            dbpool.connect(sql,params,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    }
}

module .exports=designerModel;