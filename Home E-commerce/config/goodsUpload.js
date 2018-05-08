
'use strict'
const multer=require("multer");
//文件上传位置的配置
const storage=multer.diskStorage({
    destination: function(request,file,cb){
        // console.log(file);
        cb(null,"./public/uploadimg")
    },
    filename:function(request,file,cb){
        //var fileFormat = (file.originalname).split(".");
        // cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
        cb(null,file.originalname)
    }
})
const goodsUpload=multer({
    storage:storage
})
goodsUpload.changedestorage=function(filename)
{
    // console.log("修改上传路径");
    let storage=multer.diskStorage({
        destination: function(request,file,cb){
            cb(null,"./public/uploadimg/"+filename)
        },
        filename:function(request,file,cb){
            //var fileFormat = (file.originalname).split(".");
            // cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
            cb(null,file.originalname)
        }
    })
    this.storage=storage
}
module.exports=goodsUpload;