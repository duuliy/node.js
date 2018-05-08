/**
 * Created by Administrator on 2017/11/14.
 */

const loginDao=require("../dao/loginDao")

const loginController={
    login(req,resp){
        let username=req.body.username;
        let password=req.body.password;
        console.log(username);
        console.log(password);
        loginDao.login([username,password]).then((data)=>{
            if(data.length==1){
                req.session.username=data[0].account;
                req.session.role=data[0].role;
                console.log('角色',req.session.role);
                console.log(req.session.username);
            }
            resp.send(data);
        })
    }
}

module.exports=loginController;