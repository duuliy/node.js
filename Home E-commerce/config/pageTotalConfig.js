const dbpool = require("../config/dbconfig");
//var table = 't_admin';
var sql = '';
const pageTotolDao = {
    getTotol(arr){
        return new Promise((resolve,reject)=>{
            //var sql = 'select count(*) as myCount from '+table;
            dbpool.connect(sql,arr,(err,data)=>{
                resolve(data);
            })
        })
    },
    getData(arr){
        console.log(arr);
        return new Promise((resolve,reject)=>{
            //var sql = 'select * from '+table+' limit ?,?';
            sql += ' limit ?,?';
            dbpool.connect(sql,arr,(err,data)=>{
                //if(!err) {
                //    console.log(data);
                //} else {
                //    console.log(err);
                //}
                resolve(data);
            })
        })
    }
};

const page = {
    pageTotol(req,res){
        var currentData = req.query.currentData;
        pageTotolDao.getTotol().then(data=>{
            var num = Math.ceil(data[0].myCount/currentData);
            num = num.toString();
            res.send(num);
        })
    },
    getData(req,res){
        var currentPage = parseInt(req.query.currentPage);
        var currentData = parseInt(req.query.currentData);
        pageTotolDao.getData([(currentPage-1)*currentData,currentData]).then(data=>{
            console.log(data);
            if(data.length>0){
                res.send({flag:1,message:data})
            }else{
                res.send({flag:-1,message:"失败"})
            }
        })
    }
};
page.sql = function (promas) {
    sql = promas;
};
module.exports = page;
