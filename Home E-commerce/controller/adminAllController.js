const adminAllDao=require("../dao/adminAllDao");
const crypto = require('crypto');
const adminAllController = {
    getAlltdaim(req,resp){
        adminAllDao.getAdmin([]).then(data=>{
            resp.render("adminAll",{list:data})
        })
    },
    getAdmin(req,res){
        var username = req.body.username||'';
        var phone = req.body.phone||'';
        var state = req.body.state||'';
        var id = req.body.id||'';
        var arr = [];
        var arr1= [];
        if(id==''){
            if(username!=''){
                arr.push(username);
                arr1.push(1);
            }
            if(phone!=''){
                arr.push(phone);
                arr1.push(2);
            }
            if(state!=''&&state!=2){
                arr.push(state);
                arr1.push(3);
            }
            adminAllDao.getAdmin(arr,arr1).then(data=>{
                if(data.length>0){
                    res.send({flag:1,message:data});
                }else{
                    res.send({flag:-1,message:"没有该用户"});
                }
            })
        }else{
            arr.push(id);
            adminAllDao.getAdmin(arr).then(data=>{
                if(data.length>0){
                    res.send({flag:1,message:data});
                }
            })
        }
    },
    addAdmin(req,res){
        var username = req.body.username;
        var password = req.body.password;
        var phone = req.body.phone;
        var createUser = req.session.username;
        var id = req.body.id||'';
        var hasher=crypto.createHash("md5");
        hasher.update(password);
        var hashmsg=hasher.digest('hex');
        var arr = [];
        adminAllDao.getAdmin([createUser],[1]).then(data=>{
            createUser = data[0].a_id;
            if(id==''){
                arr = [createUser,username,hashmsg,phone]
            }else{
                arr = [createUser,username,hashmsg,phone,id]
            }
            adminAllDao.addAdmin(arr).then(data1=> {
                if(data1){
                    res.send({flag:1,message:"成功"})
                }else{
                    res.send({flag:-1,message:"手机号已被注册"})
                }
            })
        })
    },
    setState(req,res){
        var id = req.body.id;
        var state = req.body.state;
        adminAllDao.setState([state,id]).then(data=>{
            if(data){
                res.send({flag:1,message:state});
            }
        })
    }
};
module.exports = adminAllController;