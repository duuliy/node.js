
const casedao = require("../dao/caseDao");
const fs = require("fs");
const upload = require("../config/uploadCaseconfig");
const constroller = {
    //设计案例页面
    getCase(req, res){
        casedao.caseDao().then(function (result) {
            res.render("d_case.ejs", {list: result})
        })
    },
    //启用和禁用
    getDisable(req, res){
        var name = req.query.name;
        casedao.disableDao(name)
    },
    getStart(req, res){
        var name = req.query.name;
        casedao.startDao(name);
    },
    //添加和修改
    getadd(req, res){
        var c_name = req.body.c_name,
            c_img = req.body.c_img,
            d_name = req.body.d_name,
            t_name = req.body.t_name,
            d_detail = req.body.d_detail;
        var param = [c_name, c_img, d_name, t_name, d_detail];
        casedao.adddao(param, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                res.send(result);
            }
        })
    },
    getmodify(req, res){
        var c_name = req.body.c_name,
            c_img = req.body.c_img,
            d_name = req.body.d_name,
            t_name = req.body.t_name,
            d_detail = req.body.d_detail;
        var img = "./public/uploads/" + c_name + "/" + c_img;
        console.log(img);
        upload.createfiles(c_name);
        var param = [c_name, c_img, d_name, t_name, d_detail];
        casedao.modifydao(param, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
    },
    //修改图片
    getupdateimg(req, res){
        var img = req.query.img.split("/");
        var imgs = "./public/" + img[3] + "/" + img[4] + "/" + img[5];
        fs.unlink(imgs, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("删除成功")
            }
        });
    },
    //创建文件夹
    getfile(req, res){
        var c_name = req.query.file;
        var url = "./public/uploads/" + c_name;
        /* if (!fs.exists(url)) {*/
        fs.mkdir(url, function (err) {
            if (err) {
                console.log("创建失败")
            } else {
                upload.createfiles(c_name)
            }
        });
        /*}*/
    },
    //设计师名称
    getdesigner(req, res){
        casedao.designerdao().then(function (data) {
            res.send(data)
        })
    },
    //标签
    getlabel(req, res){
        casedao.labeldao().then(function (data) {
            res.send(data)
        })
    },
    //查询
    getsearchcase(req, res){
        var name = req.query.name;
        casedao.searchdao(name).then(function (result) {
            res.send(result)
        })
    },
    //分页
    pageTotol(req,res){
        var currentData = req.query.currentData;
        casedao.getTotol().then(data=>{
            var num = Math.ceil(data[0].myCount/currentData);
            num = num.toString();
            console.log(num);
            res.send(num);
        })
    },
    getData(req,res){
        var currentPage = req.query.currentPage;
        var currentData = parseInt(req.query.currentData);
        casedao.getData([(currentPage-1)*currentData,currentData]).then(data=>{
            if(data.length>0){
                res.send({flag:1,message:data})
            }else{
                res.send({flag:-1,message:"失败"})
            }
        })
    }

};
module.exports = constroller;