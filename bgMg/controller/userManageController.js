/**
 * Created by DELL on 2017/11/16.
 */
    const userManageDao=require("../dao/userManageDao.js")
const userManageController={
    pageCount:5,
    getAllmanageUser(request,response){
        console.log("in usermanage");
        let params=[];
        params.push((request.params.page-1)*userManageController.pageCount)
        params.push(userManageController.pageCount);
        var url=request._parsedOriginalUrl.pathname;
        var arr=url.split("/");
        var page=parseInt(arr[arr.length-1]);
        userManageDao.getAllmanageUsers(params).then(data=>{
            let userlist=data;
            userManageDao.gettotalCount().then(data=>{
                let totalCount=Math.ceil((data[0].countnum)/userManageController.pageCount);
                response.render("userManage",{userlist:userlist,totalCount:totalCount,pages:page});
            });
        }).catch(err=>{
            console.log(err.message);
        });
    },
    editStatus(request,response){
        let status=request.body.statusValue;
        let id=request.body.userid;
        let params=[status,id];
        console.log("statuscontroller:",status);
        userManageDao.editStatus(params).then(data=>{
            console.log("edit----------:",data);
           response.send(data);
        }).catch(err=>{
            console.log(err.message);
        });
    }

}
module.exports=userManageController;