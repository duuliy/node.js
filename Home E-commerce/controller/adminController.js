const adminDao = require('../dao/adminDao');
const crypto = require('crypto');
const adminController = {
    getAdmin(req,res){
        var id = req.session.userid;
        adminDao.getAdmin([id]).then(data=>{
            res.render('admin',{list:data})
        })
    },
    setInfo(req,res){
        var id = req.session.userid;
        var phone = req.body.phone;
        var src = req.body.file;
        var hasher=crypto.createHash("md5");
        hasher.update(req.body.newPwd);
        var hashmsg=hasher.digest('hex');
        var arr = [hashmsg,phone,src,id];
        adminDao.getInfo(arr).then(data=>{
            if(data.length>0){
                res.send({flag:1,message:data});
            }else{
                res.send({flag:-1,message:'失败'});
            }
        })
    },
    getPwd(req,res){
        var hasher=crypto.createHash("md5");
        hasher.update(req.body.pwd);
        var hashmsg=hasher.digest('hex');
        var arr = [hashmsg,req.session.userid];
        adminDao.getPwd(arr).then(data=>{
            if(data.length>0){
                res.send({flag:1,message:'ok'})
            }else{
                res.send({flag:-1,message:'no'})
            }
        })
    }
};

module .exports = adminController;