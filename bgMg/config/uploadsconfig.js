/**
 * Created by Administrator on 2017/11/20.
 */
const multer = require("multer");
//磁盘位置
const stages = multer.diskStorage({
    //文件存储的位置
    destination:function(req,file,cb){
        cb(null,"./public/uploads");
    },
    filename:function(req,file,cb){
        //文件名
        var fileFormat = (file.originalname).split(".");
        cb(null,file.originalname);
    }
});
const upload = multer({
    storage:stages
});
upload.changedestorage=function(filename)
{
    //console.log("修改上传路径");
    let storage=multer.diskStorage({
        destination: function(request,file,cb){
            cb(null,"./public/uploads/"+filename)
        },
        filename:function(request,file,cb){
            // cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
            cb(null,file.originalname);
            //console.log("./public/uploads/"+filename);
        }


    });
    this.storage=storage;
};
module.exports=upload;