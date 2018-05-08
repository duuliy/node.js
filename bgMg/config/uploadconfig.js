/**
 * Created by Administrator on 2017/10/31.
 */


const multer=require("multer");

const storage=multer.diskStorage({
    destination:function (req,file,cb) {
        console.log("multer",file)
        cb(null,"./public/uploads");
    },
    filename:function (req,file,cb) {
        var fileFormat=(file.originalname).split(".");
        cb(null,file.originalname)
    }
})

const upload=multer({
    storage:storage
})

module.exports=upload;
