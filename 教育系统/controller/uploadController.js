/**
 * Created by a on 2017/10/30.
 */
const multer = require("../config/uploadconfig");
const dbpool = require("../config/fileconfig");
const fs=require("fs");
const uploadController = {
    uploadFile(req,resp){
        // console.log("uploadcontroller")
        // console.log(req.file) //对象，得到路径位置
        let pathname = "images/"+req.file.filename
        dbpool.connect("update t_user set u_imgsrc =? where u_username=?",[pathname,"abc"],(err,data)=>{
            console.log(data);
            resp.send("上传成功")
        })
    },
    getImage(req,resp){
        //  请求数据库
        dbpool.connect("select * from t_user where u_username=?",["abc"],
            (err,data)=>{
                resp.send(data);
            })

    },
    downimg(req,res){

        fs.readdir('./public/images', function (err, files) {
            if(err) {
                console.error(err);
                return;
            } else {
                // console.log(files);
                res.send(files);
            }})
    }
}
module.exports=uploadController;