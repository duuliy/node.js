

const propDao = require("../dao/propDao");

const propController = {
    //属性数据查询
    propInfo(req,resp){
        let sendMsg = {};
        propDao.searchProp([])
            .then((msg)=>{
                sendMsg = msg;
                return propDao.searchCount([]);
            })
            .then((msg)=>{
                sendMsg.pageTotal = msg.pageTotal;
                resp.render("prop.ejs",sendMsg);
            })
    },
    //查询
    searchProp(req,resp){
        let sendMsg = {};
        propDao.searchProp(req.query)
            .then((msg)=>{
                sendMsg = msg;
                return propDao.searchCount(req.query);
            })
            .then((msg)=>{
                sendMsg.pageTotal = msg.pageTotal;
                resp.send(sendMsg);
            });
    },
    //新增
    addProp(req,resp) {
        let sqlData = req.body;
        sqlData.a_id = req.session.userid;
        propDao.addProp(sqlData)
            .then((msg)=>{
                resp.send(msg);
            });
    },
    //修改
    updateProp(req,resp) {
        propDao.updateProp(req.body)
            .then((msg)=>{
                resp.send(msg);
            });
    },
};

module.exports = propController;

