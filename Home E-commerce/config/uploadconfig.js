const multer = require('multer');
const storage = multer.diskStorage({
    //保存路径
    destination: function (req,file,cd) {
        console.log(file);
        cd(null,"./public/uploadimg/adminimg")
    },//文件名字
    filename: function (req,file,cd) {
        var fileFormat = (file.originalname).split('.');
        cd(null,file.originalname)
    }
});

const upload = multer({
    storage:storage
});

module.exports=upload;
