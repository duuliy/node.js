
const userdao=require("../dao/userDao");
const constroller={
  getUser(req,res){
    userdao.userDao().then(function (result) {
        res.render("user.ejs",{list:result})
    })
  },
    getsearch(req,res){
        var name=req.query.name;
        userdao.searchdao(name).then(function (result) {
            res.send(result)
        })
    },
    getDisable(req,res){
      var name=req.query.name;
      userdao.disableDao(name)
    },
    getStart(req,res){
        var name=req.query.name;
        userdao.startDao(name);
    }

};
module.exports=constroller;