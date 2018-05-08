/**
 * create by GY
 */
    "use strict";
const checkUserDao = require("../dao/checkUserDao.js");
const AV = require("leancloud-storage");


const APP_ID = 'W2vxVsNd7Nyj7y18dp8v4Syh-gzGzoHsz';
const APP_KEY = '91fUwVvu18dPFlS7nVgO4oMj';
//模块进行初始化
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


const checkUserCon ={
    checkUserExCon(request,response){
        let params = [];
        params.push(request.body.username);
        params.push(request.body.password);
        console.log(params);
        let code = request.body.code;
        if(code == request.session.code){
            checkUserDao.checkUserEx(params).then(function(data){
                console.log(data);
                if(data.length>0){
                    request.session.myname=data[0].admin_login;
                    response.send(data);
                }else{
                    console.log("登录出错，请重新登录");
                    response.send("登录出错，请重新登录");
                }
            })
        }else{
            response.send("验证码错误")
        }
    },
    getCheckNumC(request,response){
        AV.Cloud.requestSmsCode({
            mobilePhoneNumber: request.body.phone,
            name: 'teacms',//验证来源名字
            op: '登录',//正在经历的某个操作
            ttl: 10                     // 验证码有效时间为 10 分钟
        }).then(function(){
            //调用成功
            response.send("验证码发送成功")
        }, function(err){
            //调用失败
            response.send("验证码发送失败，请检查手机号")
        });
    },
    CheckNumC(request,response){
        let newPassword = request.body.newPassword;
        let boss_login = request.body.bossId;
        let params = [];
        params.push(newPassword);
        params.push(boss_login);
        console.log(" in check ");
        AV.Cloud.verifySmsCode(request.body.checkNum, request.body.phone).then(function(){
            checkUserDao.CheckNumD(params).then(function(data){
                response.send("修改成功")
            });
        }, function(err){
            //验证失败
            response.send(err)
        });

    },
    finduserC(request,response){
        let username = request.query.username;
        checkUserDao.finduserD(username).then(function(data){
            response.send(data);
        })
    },
    getCodeC(request,response){
        let code = "";
        let numArg = new Array(0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k',
            'l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K',
            'L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
        for(let i = 0 ; i < 5 ; i++){
            let index = Math.floor(Math.random()*52);
            code += String(numArg[index]);
        }
        console.log("验证码："+code);
        request.session.code = code;
        response.send(code);
    }
};
module .exports = checkUserCon;