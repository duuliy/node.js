/**
 * Created by a on 2017/11/1.
 */

const viewModal=require("../dao/userdao.js");
module .exports= {
    listPeo(req,res){
        "use strict";
        //查看mysql数据
        viewModal.getUser66(function (err, data) {
            if (err) {
                res.send("数据出错");
            } else {
                res.render("classGl", {"data": data});
            }
        })
    }
}