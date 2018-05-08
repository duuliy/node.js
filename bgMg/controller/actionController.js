/**
 * Created by DELL on 2017/11/13.
 */
const functiondao = require("../dao/actionDao.js");
const multer=require("../config/uploadconfig.js")
const functionController = {
    pageCount:5,
    getAllFunction(request, response){
        console.log("get in function controller")
        console.log(request.params.page);
        let params=[];
        params.push((request.params.page-1)*functionController.pageCount);
        params.push(functionController.pageCount);
        functiondao.getAllFunctions(params).then(data=>{
            let actiondata=data;
            console.log("receive data");
            functiondao.getTotalPage().then(data=>{
                let totalCount=Math.ceil((data[0].countnum)/functionController.pageCount)
               console.log(data[0].countnum);
                console.log(totalCount)
                response.render("action-list", {funclist: actiondata,totalCount:totalCount});
            });
        });
    },
    addFunction(request, response){
        let ac_name = request.body.ac_name;
        let ac_info = request.body.ac_info;
        let ac_price = request.body.ac_price;
        let pathname="uploads/"+request.file.originalname;
        console.log(pathname);
        let ac_desc = request.body.ac_desc;
        let params = [null, ac_name, ac_info, pathname, ac_price, ac_desc];
        functiondao.addFunction(params).then(data=> {
            console.log("controller:"+data);
               response.redirect("/actions.do");
        }).catch(err=>{
            console.log(err.message)
        });
    },
    goToAdd(request, response){
        response.render("action-add", {});
    },
    goToEdit(request,response){
        console.log("gotoedit");
        let id=request.query.id;
        let params=[id];
        functiondao.getupdateId(params).then(data=>{
            console.log("gotordit:"+data);
            response.render("action-edit", {editlist:data});
        });
    },
    deleteAction(request,response){
        //console.log("delete",request);
        //console.log(request.headers.referer);
        //var arr=(request.referrer).split("/");
        //console.log(arr);
        let id=request.query.act_id;
        //console.log(id);
        let params=[id];
        functiondao.deleteAction(params).then(data=>{
            //response.redirect("/actions.do");
            response.send(data);
        }).catch(err=>{
            console.log(err.message);
        });
    },
    updateAction(request,response){
        console.log("update***********");
        let id=request.body.ac_id;
        let name=request.body.ac_name;
        let info=request.body.ac_info;
        let path=request.body.ac_imgurl;
        let price=request.body.ac_price;
        let all_info=request.body.ac_desc;
        let params=[name,info,path,price,all_info,id];
        console.log(params);
        functiondao.updateAction(params).then(data=>{
            //response.send(data);
            response.redirect("/actions.do");
        }).catch(err=>{
            console.log(err.message)
        });
    }
}
module.exports = functionController;