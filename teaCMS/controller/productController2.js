/**
 * Created by zz on 2017/11/12.
 */
 "use strict";
const productDao = require("../dao/productDao2.js");
const fs = require("fs");

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
        // let sql = "SELECT count(*) as mycount FROM productInfo a,productType b WHERE d.pro_id = a.pro_id AND c.pro_id = a.pro_id AND a.pro_type_id = b.pro_type_id";
        let sql = "SELECT count(*) as mycount FROM productInfo a,productType b WHERE a.pro_type_id = b.pro_type_id";
        let params = [];
        let productNum = request.query.productNum;
        let productName = request.query.productName;
        let productType = request.query.productType;
        let nowPage = request.query.nowPagec;
        if(productNum!="商品编号"){
            params.push(parseInt(productNum));
            sql += " and a.pro_id= ? ";
        }
        if(productName!="商品名称"){
            params.push(productName);
            sql += " and a.pro_name = ? ";
        }
        if(productType!="商品种类"){
            params.push(productType);
            sql += " and b.pro_type_name = ? "
        }
        //console.log(sql);
        productDao.getTotalPageProD(sql,params).then(function(data){
            var result = Math.ceil(data[0].mycount/productDao.currentPage);
            response.send(""+result);
        })

    },
    searchProductC(request,response){
        let params = [];
         //let sql = "SELECT a.pro_id,a.pro_name,a.pro_amount,a.pro_price,a.pro_discount, a.pro_size,a.pro_deal_amount,a.pro_look_amount,a.pro_storetime,a.pro_info ,a.pro_condition,b.pro_type_name,b.pro_type_condition,c.pro_text_discribe,c.pro_text_img,c.pro_text_condition,d.pro_img_url,d.pro_img_status,d.pro_img_condition FROM productInfo a,productType b,productText c,productImg d WHERE d.pro_id = a.pro_id AND c.pro_id = a.pro_id AND a.pro_type_id = b.pro_type_id";
        let sql = "SELECT a.pro_id,a.pro_name,a.pro_amount,a.pro_price,a.pro_discount, a.pro_size,a.pro_deal_amount,a.pro_look_amount,a.pro_storetime,a.pro_info ,a.pro_condition,b.pro_type_name,b.pro_type_condition FROM productInfo a,productType b where a.pro_type_id = b.pro_type_id ";
        let productNum = request.body.productNum;
        let productName = request.body.productName;
        let productType = request.body.productType;
        let nowPage = request.body.nowPagec;
        //console.log(productNum,productName,productType);
        if(productNum!="商品编号"){
            params.push(productNum);
            sql += " and a.pro_id  = ? ";
        }
        if(productName!="商品名称"){
            //console.log("in productName 111");
            params.push(productName);
            sql += " and a.pro_name = ? ";
        }
        if(productType!="商品种类"){
            params.push(productType);
            sql += " and b.pro_type_name = ? "
        }
        sql += " order by a.pro_id desc limit ?,? ";
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
    },

//SDL 新增
    addProductBase(req,resp){
        let proname = req.body.proname;
        let protypename = req.body.protypename;
        let proamout = req.body.proamout;
        let proprice = req.body.proprice;
        let prodiscount = req.body.prodiscount;
        let prosize = req.body.prosize;
        let prostoretime = req.body.prostroetime;
        let proinfo = req.body.proinfo;
        let detailText = req.body.detailText;
        let params = [null,protypename,proname,proamout,proprice,prodiscount,prosize,0,0,
            prostoretime,proinfo,detailText,1];
        let sql = "insert into productinfo values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
        let editId;
        productDao.queryProduct(sql,params).then(function(data){
            productDao.queryProduct("select max(pro_id)as editId from productinfo",[]).then(function(data){
                editId = data.editId;
                resp.send({flag:1,msg:"插入数据成功"});
            })
        });

    },
    //for zz begin
    productImg(req,resp){
        let params = [];
        params.push(req.body.proImgId);
        let sql="SELECT * FROM productimg WHERE pro_id=? ";
        productDao.proZZdao(sql,params).then((data)=>{
            resp.send(data);
        });
    },
    productText(req,resp){
        let params = [];
        params.push(req.body.proTextID);
        let sql = "SELECT * FROM producttext WHERE pro_id=? ";
        productDao.proZZdao(sql,params).then((data)=>{
            resp.send(data);
        });
    },
    imgStatus(req,resp){
        let params = [];
        let myid = parseInt(req.body.id)+1;
        params.push(req.body.status);
        params.push(req.body.id);
        params.push(myid);
        let sql = "UPDATE productimg SET pro_img_condition=? WHERE pro_img_id=? OR pro_img_id=?";
        productDao.proZZdao(sql,params).then((data)=>{
            resp.send(data);
        });
    },
    textStatus(req,resp){
        let params = [];
        params.push(req.body.status);
        params.push(req.body.id);
        let sql = "UPDATE producttext SET pro_text_condition=? WHERE pro_text_id=? ";
        productDao.proZZdao(sql,params).then((data)=>{
            resp.send(data);
        });
    },
    editpro(req,resp){
        let params = [];
        params.push(req.body.proid2);
        params.push(req.body.protypeid2);
        params.push(req.body.proname2);
        params.push(req.body.proamout2);
        params.push(req.body.proprice2);
        params.push(req.body.prodiscount2);
        params.push(req.body.prosize2);
        params.push(req.body.prodealamout2);
        params.push(req.body.prolookamout2);
        params.push(req.body.prostoretime2);
        params.push(req.body.proinfo2);
        params.push(req.body.procondition2);
        params.push(req.body.updateDetailEditor);
        params.push(req.body.proid2);
        let sql = "UPDATE productInfo SET pro_id=?,pro_type_id=(SELECT pro_type_id FROM producttype WHERE pro_type_name=?)," +
            "pro_name=?,pro_amount=?,pro_price=?,pro_discount=?,pro_size=?,pro_deal_amount=?,pro_look_amount=?," +
            "pro_storetime=?,pro_info=?,pro_condition=?,pro_text = ? WHERE pro_id=? ";
        productDao.proZZdao(sql,params).then((data)=>{
            resp.send(data);
        });
    },
    fsProImg(req,resp){
        let tempPath = req.files.imgFile.path;
        let targetPath = "./public/uploads/"+req.files.imgFile.name;
        fs.createReadStream(tempPath).pipe(fs.createWriteStream(targetPath));
        var imgPath = "uploads/"+req.files.imgFile.name;
        resp.send(imgPath);
    },
    addshowimg(req,resp){
        let params = [];
        params.push(req.body.name);
        params.push(req.body.price);
        params.push(req.body.showimg0);
        params.push(req.body.showimg1);
        params.push(req.body.showimg2);
        console.log(params);
        let sql = "INSERT INTO productimg VALUES (NULL,(SELECT pro_id FROM productinfo WHERE " +
            "pro_name=? AND pro_price=?),?,?,?,1);";
        productDao.proZZdao(sql,params).then((data)=>{
            resp.send(data);
        });
    },
    addproimg(req,resp){
        let params = [];
        params.push(req.body.proimg0);
        params.push(req.body.proimg1);
        params.push(req.body.proimg2);
        params.push(req.body.proid);
        let sql = "UPDATE productimg SET pro_img1=?,pro_img2=?,pro_img3=? WHERE pro_id=?;";
        productDao.proZZdao(sql,params).then((data)=>{
            resp.send(data);
        });
    }
    //for zz end
};
module.exports = teaproduct;