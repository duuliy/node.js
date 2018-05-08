
const multer=require("multer");
const storage=multer.diskStorage({
    destination:function (req,file,cb) {
            cb(null,"./public/uploads/")
    },
    filename:function (req,file,cb) {
        cb(null,file.originalname)
    }
});
const upload=multer({
    storage:storage
});
upload.createfile=function (filename) {
    let storage=multer.diskStorage({
        destination:function (req,file,cb) {
            cb(null,"./public/uploads/"+filename);
        },
        filename:function (req,file,cb) {
            cb(null,file.originalname)}
    });
    this.storage=storage;
};

module.exports=upload;
