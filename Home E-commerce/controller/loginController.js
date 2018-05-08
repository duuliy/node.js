
const loginModule = require('../dao/loginDao');
const crypto = require('crypto');
const loginController = {
    login(req,res){
        res.render('login');
    },
    getUser(req,res){
        let username = req.body.username;
        // var hasher=crypto.createHash("md5");
        var arr = [];
        req.session.username = username;
        if(req.body.password){
            // hasher.update(req.body.password);
            // var hashmsg=hasher.digest('hex');
            // console.log(hashmsg);
            arr.push(username);
            arr.push(req.body.password);
        }else{
            arr.push(username);
        }
        loginModule.userDao(arr).then(data=>{
            if(data.length>0){
                req.session.userid = data[0].a_id;
                req.session.username = data[0].a_name;
                req.session.userimg = data[0].a_headimg;
                if(req.body.checkbox){
                    res.cookie("user",{"user":req.body.username,"pwd":req.body.password,"id":data[0].a_id},{maxAge:1000*60*60});
                }
                res.send({flag:1,message:"成功"});
            }else{
                res.send({flag:-1,message:"错误"});
            }
        });
    }
};
module.exports=loginController;
