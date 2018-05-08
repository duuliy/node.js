/**
 * Created by ZXW on 2017/11/12.
 */
"use strict";
const db = require("../config/sqlConfig");
const productDao = {
    currentPage: 5,
    getProductD(params){
        return new Promise(function (resolve, reject) {
             //let sql = "SELECT a.pro_id,a.pro_name,a.pro_amount,a.pro_price,a.pro_discount, a.pro_size,a.pro_deal_amount,a.pro_look_amount,a.pro_storetime,a.pro_info ,a.pro_condition,b.pro_type_name,b.pro_type_condition,c.pro_text_discribe,c.pro_text_img,c.pro_text_condition,d.pro_img_url,d.pro_img_status,d.pro_img_condition FROM productInfo a,productType b,productText c,productImg d WHERE d.pro_id = a.pro_id AND c.pro_id = a.pro_id AND a.pro_type_id = b.pro_type_id";
            let sql = "SELECT a.pro_id,a.pro_name,a.pro_amount,a.pro_price,a.pro_discount, a.pro_size,a.pro_deal_amount,a.pro_look_amount,DATE_FORMAT(pro_storetime,'%Y-%m-%d') AS pro_storetime,a.pro_info ,a.pro_condition,a.pro_text,b.pro_type_name,b.pro_type_condition FROM productInfo a,productType b where a.pro_type_id = b.pro_type_id order by pro_id DESC";
            sql += " limit ?,?";
            db.connect(sql, params, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(data);
                }
            })
        })
    },
    productNumD(params){
        return new Promise(function (resolve, reject) {
            let sql = "select pro_name,pro_id  from productinfo ";
            db.connect(sql, params, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err)
                }
            })
        })
    },
    productTypeD(params){
        return new Promise(function (resolve, reject) {
            let sql = "select pro_type_name from producttype ";
            db.connect(sql, params, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err)
                }
            })
        })
    },
    getTotalPageProD(sql, params){
        return new Promise(function (resolve, reject) {
            db.connect(sql, params, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err)
                }
            })
        })
    },
    searchProductD(sql, params){
        return new Promise(function (resolve, reject) {
            db.connect(sql, params, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err)
                }
            })
        })
    },
    addproduct(params){
        return new Promise(function (resolve, reject) {
            db.connect("insert into productinfo(pro_id,pro_type_id,pro_name,pro_amount,pro_price,pro_discount,pro_size,pro_deal_amount,pro_look_amount,pro_storetime,pro_info,pro_condition) values(?,?,?,?,?,?,?,?,?,?,?,?);insert into productImg(pro_id,pro_img_url,pro_img_status,pro_img_condition) values(?,?,?,?);insert into productText(pro_id,pro_text_discribe,pro_text_condition) values(?,?,?)",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(1);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    deleteproduct(params){
        return new Promise(function (resolve, reject) {
            db.connect("update productInfo set pro_condition = 0 where pro_id = ? ",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(1);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    loadeditproduct(params){
        return new Promise(function (resolve, reject) {
            db.connect("SELECT a.pro_id,a.pro_name,a.pro_amount,a.pro_price,a.pro_discount, " +
                "a.pro_size,a.pro_deal_amount,a.pro_look_amount,a.pro_storetime,a.pro_info ," +
                "a.pro_condition,b.pro_type_id,b.pro_type_condition,c.pro_text_discribe," +
                "c.pro_text_img,c.pro_text_condition,d.pro_img_url,d.pro_img_status,d.pro_img_condition FROM" +
                " productInfo a,productType b,productText c,productImg d WHERE d.pro_id = a.pro_id " +
                "AND c.pro_id = a.pro_id AND a.pro_type_id = b.pro_type_id and a.pro_id = ?",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    editproduct(params){
        return new Promise(function (resolve, reject) {
            db.connect("update productInfo set pro_id=?,pro_type_id=?,pro_name=?,pro_amount=?,pro_price=?,pro_discount=?," +
                "pro_size=?,pro_deal_amount=?,pro_look_amount=?,pro_storetime=?,pro_info=?,pro_condition=? where pro_id=?;" +
                "update productImg set pro_img_url=?,pro_img_status=?,pro_img_condition=? where pro_id = ?;" +
                "update productText set pro_text_discribe = ?,pro_text_condition=? where pro_id = ?",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(1);
                    } else {
                        reject(err);
                    }
                }
            )


        })
    },

//    SDL 新增
    queryProduct(sql, params){
        return new Promise(function(resolve,reject){
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(data);
                }
            })
        })
    },

//for zz begin 通用处理，不要删除
    proZZdao(sql,params){
        return new Promise(function(resolve, reject){
            db.connect(sql,
            params,
                (err,data)=>{
                    resolve(data)
                })
        })
    }
//for zz end

};
module.exports = productDao;