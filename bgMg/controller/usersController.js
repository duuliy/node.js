const usersModel = require("../dao/usersDao");

const usersController={
    pageCount:5,
    getusersEjs(req,resp){
        let params=[];
        let list={};
        params.push(parseInt(req.params.pg-1)*usersController.pageCount);
        params.push(usersController.pageCount);
        usersModel.usersPage().then(total=>{
            let result=Math.ceil(total[0].a/usersController.pageCount);
            let url = req._parsedOriginalUrl.pathname.split("/");
            let pathUrl = parseInt(url[url.length-1]);
            usersModel.getAllUser(params).then(data=> {
                resp.render("users", {list: data,totalPage:result,pathUrl:pathUrl});
            })
        })
    },
    getuserEjs(req,resp){
        let mg_id=req.query.id;
        let list={};
        let lists={};
            usersModel.getUser([mg_id]).then((data)=> {
                usersModel.getrole().then((newdata)=> {
                    resp.render("changeUser", {list:data,lists: newdata});
                })
            })
    },
    changeUser(req,resp){
        let mg_id = req.body.mg_id;
        let account = req.body.account;
        let mg_name = req.body.mg_name;
        let sex = req.body.sex;
        let birth = req.body.year+"-"+req.body.month+"-"+req.body.day;
        let role = req.body.role;
        let status = req.body.status;
        let head_img="uploads/"+req.file.originalname;
        usersModel.changeUser([account,mg_name,sex,birth,role,status,head_img,mg_id]).then((data)=>{
            resp.redirect("/users");
        }).catch((err)=>{
            console.log(err.message);
        })
    },
    openaddUser(req,resp){
        let lists={};
        usersModel.getrole().then((data)=> {
            resp.render("addUser", {lists: data});
        })
    },
    addUser(req,resp){
        //let mg_id = req.body.mg_id;
        let account = req.body.account;
        let mg_name = req.body.mg_name;
        let sex = req.body.sex;
        let birth = req.body.year+"-"+req.body.month+"-"+req.body.day;
        let role = req.body.role;
        let status = req.body.status;
        let head_img="uploads/"+req.file.originalname;
        usersModel.addUser([account,mg_name,sex,birth,role,status,head_img]).then((data)=>{
            resp.redirect("/users");
        }).catch((err)=>{
            console.log(err.message);
        })
    },
    deleUser(req,resp){
        let mg_id=req.query.mg_id;
        usersModel.deleUser([mg_id]).then(data=>{
            resp.redirect("/users");
        }).catch((err)=>{
            console.log(err.message);
        })
    }
};

module.exports=usersController;