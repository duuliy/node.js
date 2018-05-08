/**
 * Created by zz on 2017/11/12.
 */
 "use strict";
const productDao = require("../dao/productDao.js");

const teaproduct ={
    getProductC(request,response){
        let params = [];
        let nowPage = request.body.nowPagec;
        params.push(parseInt(parseInt(nowPage)-1)*productDao.currentPage);
        params.push(productDao.currentPage);
        productDao.getProductD(params).then(function(data){
            response.send(data)
        })
    },
    productNumC(request,response){
        productDao.productNumD("").then(function(data){
            response.send(data);
        })
    },
    productTypeC(request,response){
        productDao.productTypeD("").then(function(data){
            response.send(data);
        })
    },
    getTotalPageProC(request,response){
        let sql = "SELECT count(*) as mycount FROM productInfo a,productType b,productText c,productImg d WHERE d.pro_id = a.pro_id AND c.pro_id = a.pro_id AND a.pro_type_id = b.pro_type_id";
        let params = [];
        let productNum = request.query.productNum;
        let productName = request.query.productName;
        let productType = request.query.productType;
        let nowPage = request.query.nowPagec;
        console.log(productNum,productName,productType);
        if(productNum!="商品编号"){
            console.log("in productNum");
            params.push(parseInt(productNum));
            sql += " and a.pro_id= ? ";
        }
        if(productName!="商品名称"){
            console.log("in productName");
            params.push(productName);
            sql += " and a.pro_name = ? ";
        }
        if(productType!="商品种类"){
            console.log("in productType");
            params.push(productType);
            sql += " and b.pro_type_name = ? "
        }
        //console.log(sql);
        productDao.getTotalPageProD(sql,params).then(function(data){
            var result = Math.ceil(data[0].mycount/productDao.currentPage);
            response.send(200,result);

        })

    },
    searchProductC(request,response){
        let params = [];
        let sql = "SELECT a.pro_id,a.pro_name,a.pro_amount,a.pro_price,a.pro_discount, a.pro_size,a.pro_deal_amount,a.pro_look_amount,a.pro_storetime,a.pro_info ,a.pro_condition,b.pro_type_name,b.pro_type_condition,c.pro_text_discribe,c.pro_text_img,c.pro_text_condition,d.pro_img_url,d.pro_img_status,d.pro_img_condition FROM productInfo a,productType b,productText c,productImg d WHERE d.pro_id = a.pro_id AND c.pro_id = a.pro_id AND a.pro_type_id = b.pro_type_id";
        let productNum = request.body.productNum;
        let productName = request.body.productName;
        let productType = request.body.productType;
        let nowPage = request.body.nowPagec;
        console.log(productNum,productName,productType);
        if(productNum!="商品编号"){
            params.push(productNum);
            sql += " and a.pro_id  = ? ";
        }
        if(productName!="商品名称"){
            console.log("in productName 111");
            params.push(productName);
            sql += " and a.pro_name = ? ";
        }
        if(productType!="商品种类"){
            params.push(productType);
            sql += " and b.pro_type_name = ? "
        }
        sql += "  limit ?,? ";
        params.push(parseInt((parseInt(nowPage)-1)*productDao.currentPage));
        params.push(productDao.currentPage);

        productDao.searchProductD(sql,params).then(function(data){
            response.send(data);
        })
    },
    addproduct(req,resp){
        var proid = req.body.proid;
        var protypeid = req.body.protypeid;
        //var protypename = req.body.protypename;
        var proname = req.body.proname;
        var proamout = req.body.proamout;
        var proprice = req.body.proprice;
        var prodiscount = req.body.prodiscount;
        var prosize = req.body.prosize;
        var prodealamout = req.body.prodealamout;
        var prolookamout = req.body.prolookamout;
        var prostoretime = req.body.prostoretime;
        var proinfo = req.body.proinfo;
        var procondition = req.body.procondition;
        var proimgurl = req.body.proimgurl;
        var proimgstatus = req.body.proimgstatus;
        var proimgcondition = req.body.proimgcondition;
        var protextdiscribe = req.body.protextdiscribe;
        var protextcondition = req.body.protextcondition;
        let params = [proid,protypeid,proname,proamout,proprice,prodiscount,prosize,prodealamout,prolookamout,
            prostoretime,proinfo,procondition,proid,proimgurl,proimgstatus,proimgcondition,proid,protextdiscribe,protextcondition];
        productDao.addproduct(params).then(function(data){
            if(data){
                resp.send("1");
            }
        })
    },
    deleteproduct(req,resp){
        var proid = req.body.proid;
        let params = [proid];
        productDao.deleteproduct(params).then(function(data){
            if(data){
                resp.send("1");
            }
        })
    },
    loadeditproduct(req,resp){
        var editproid = req.body.editproid;
        let params = [editproid];
        productDao.loadeditproduct(params).then(function(data){
            if(data){
                resp.send(data);
            }
        })
    },
    editproduct(req,resp){
        var editproid =req.body.editproid;
        var proid = req.body.proid;
        var protypeid = req.body.protypeid;
        var proname = req.body.proname;
        var proamout = req.body.proamout;
        var proprice = req.body.proprice;
        var prodiscount = req.body.prodiscount;
        var prosize = req.body.prosize;
        var prodealamout = req.body.prodealamout;
        var prolookamout = req.body.prolookamout;
        var prostoretime = req.body.prostoretime;
        var proinfo = req.body.proinfo;
        var procondition = req.body.procondition;
        var proimgurl = req.body.proimgurl;
        var proimgstatus = req.body.proimgstatus;
        var proimgcondition = req.body.proimgcondition;
        var protextdiscribe = req.body.protextdiscribe;
        var protextcondition = req.body.protextcondition;
        let params = [proid,protypeid,proname,proamout,proprice,prodiscount,prosize,prodealamout,prolookamout, prostoretime,proinfo,procondition,editproid,
            proimgurl,proimgstatus,proimgcondition,editproid,
            protextdiscribe,protextcondition,editproid];
        productDao.editproduct(params).then(function(data){
            if(data){
                resp.send("1");
            }
        })
    }
};
module.exports = teaproduct;