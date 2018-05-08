

const goodsDao = require("../dao/goodsDao");
const path = require("path");
const goodsUpload = require("../config/goodsUpload");
const fs = require("fs");

const goodsController = {
    //商品信息
    goodsInfo(req,resp){
        let sendMsg;
        goodsDao.searchGoods([])
            .then((msg)=>{
                // msg.admin = "admin";
                // resp.render("goods.ejs",msg);
                sendMsg = msg;
                return goodsDao.propInfo({"g_p_prop":1});
            })
            .then((msg)=>{
                sendMsg.color = msg.list;
                return goodsDao.propInfo({"g_p_prop":2});
            })
            .then((msg)=>{
                sendMsg.size = msg.list;
                return goodsDao.searchCount([]);
            })
            .then((msg)=>{
                sendMsg.pageTotal = msg.pageTotal;
                resp.render("goods.ejs",sendMsg);
            })
    },
    //查询
    searchGoods(req,resp){
        let sendMsg;
        goodsDao.searchGoods(req.query)
            .then((msg)=>{
                // console.log(msg);
                sendMsg = msg;
                return goodsDao.searchCount(req.query);
            })
            .then((msg)=>{
                sendMsg.pageTotal = msg.pageTotal;
                resp.send(sendMsg);
            })
    },
    //新增商品
    addGoods(req,resp){
        req.body.a_id = req.session.userid;
        let sendMsg = {};
        let filename = req.body.g_model;
        fs.mkdir("./public/uploadimg/"+filename);
        goodsDao.addGoods(req.body)
            .then((msg)=>{
                if(msg.result) {
                    let data = req.body;
                    sendMsg.g_id = data.g_id = msg.g_id;
                    goodsUpload.changedestorage(filename);
                    data.state = 1;
                    return goodsDao.addSku(data);
                } else {
                    resp.send(msg);
                }
            })
            .then((msg)=>{
                if(msg.result) {
                    sendMsg.result = msg.result;
                }
                resp.send(sendMsg);
            })
    },
    //新增商品图片
    addGoodsImg(req,resp){
        resp.send({"result":1});
    },
    //修改商品信息
    updateGoods(req,resp){
        goodsDao.updateGoods(req.body)
            .then((msg)=>{
                let newFile = req.body.g_model;
                fs.rename("./public/uploadimg/"+req.body.oldFile,"./public/uploadimg/"+newFile);
                goodsUpload.changedestorage(newFile);
                resp.send(msg);
            })
    },

    //设置热门
    hotGoods(req,resp){
        goodsDao.hotGoods(req.query)
            .then((msg)=>{
                resp.send(msg);
            });
    },

    //设置上架下架
    stateGoods(req,resp){
        goodsDao.stateGoods(req.query)
            .then((msg)=>{
                resp.send(msg);
            });
    },

    //商品sku信息
    skuInfo(req,resp){
        goodsDao.searchSku(req.query)
            .then((msg)=>{
                // msg.admin = "admin";
                resp.send(msg);
            });
    },

    //更新sku信息
    updateSku(req,resp){
        goodsDao.updateSku(req.body)
            .then((msg)=>{
                if(msg.result) {
                    return goodsDao.searchSku(req.body);
                } else {
                    return 0;
                }
            })
            .then((msg)=>{
                resp.send(msg);
            })
    },

    //新增sku信息
    addSku(req,resp){
        let sqlData = req.body;
        sqlData.a_id = req.session.userid;
        goodsDao.addSku(sqlData)
            .then((msg)=>{
                if(msg.result) {
                    return goodsDao.searchSku(msg);
                } else {
                    resp.send(msg);
                }
            })
            .then((msg)=>{
                resp.send(msg);
            })
    },

    //颜色属性信息
    colorInfo(req,resp){
        goodsDao.propInfo(req.query)
            .then((msg)=>{
                // msg.admin = "admin";
                resp.send(msg);
            })
    },
    //商品标签信息
    goodsTagsInfo(req,resp){
        goodsDao.goodsTagsInfo(req.query)
            .then((msg)=>{
                resp.send(msg);
            })
    },
    //标签信息
    getTagsInfo(req,resp){
        goodsDao.getTagsInfo([])
            .then((msg)=>{
                resp.send(msg);
            })
    },
    //新增商品标签
    addGoodsTags(req,resp){
        goodsDao.addGoodsTags(req.body)
            .then((msg)=>{
                if(msg.result) {
                    return goodsDao.goodsTagsInfo(msg);
                } else {
                    resp.send(msg);
                }
            })
            .then((msg)=>{
                resp.send(msg);
            })
    },
    //更新商品标签
    updateGoodsTags(req,resp){
        goodsDao.updateGoodsTags(req.body)
            .then((msg)=>{
                if(msg.result) {
                    return goodsDao.goodsTagsInfo(req.body);
                } else {
                    resp.send(msg);
                }
            })
            .then((msg)=>{
                resp.send(msg);
            })

    },
    //删除商品标签
    delGoodsTags(req,resp){
        goodsDao.delGoodsTags(req.query)
            .then((msg)=>{
                resp.send(msg);
            })
    }
};

module.exports = goodsController;
