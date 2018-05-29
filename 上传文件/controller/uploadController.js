const multer = require("../config/uploadconfig");
const userModel = require("../dao/userdao");
const fileController = {
  uploadFile(req,resp){
    // console.log("uploadcontroller")
    // console.log(req.file) //对象，得到路径位置
    let pathname = "uploads/"+req.file.filename
    //duuliy设置为当前用户的id就行了
    // dbpool.connect("update image set img =? where name=?",[pathname,"duuliy"],(err,data)=>{
    //   console.log(data);
    //   resp.send("上传成功")
    // })
    userModel.updao([pathname,"duuliy"]).
    then((data)=>{
        // console.log(data)
        resp.send("上传成功")
      })
  },
  getImage(req,resp){
  //  请求数据库

    userModel.getdao(["duuliy"]).
    then((data)=>{
        console.log(data)
        resp.send(data);
      })
  }
}
module.exports=fileController