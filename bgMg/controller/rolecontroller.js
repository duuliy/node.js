/**
 * Created by Jay on 2017/11/13.
 */
const dbpool=require('../config/dbpoolConfig');
const roleModel=require("../dao/roleDAO");

const rolecontroller={
    pageCount:6,
    getRole(req,resp){
        //console.log(req.params.page);
        let params=[];
        params.push((req.params.page-1)*rolecontroller.pageCount,rolecontroller.pageCount)
        //let params=req.params.page;
        roleModel.getTotalCount().then((total)=>{
            let result=Math.ceil(total[0].totalcount/rolecontroller.pageCount);
            roleModel.getRole(params).then((data)=>{
                resp.render("allrole",{list:data,totalcount:result});
            })
        });
        //roleModel.getRole().then((data)=>{
        //    resp.render("allrole",{list:data});
        //})
    },
    changeRoleget(req,resp){
        let role_id=req.query.id;
        console.log("进入change");
        //console.log(role_id);
        roleModel.getChangerole([role_id]).then((data)=>{
            req.session.role_id=data[0].role_id;
            resp.render("changerole",{list:data});
        })
    },
    changeRole(req,resp){
        let role_id=req.session.role_id;
        let role_name=req.query.role_name;
        let role_control=req.query.role_control;
        roleModel.changeRole([role_name,role_control,role_id]).then((data)=>{
            //if(data){
                resp.redirect("allrole");
            //}
            //console.log(data);

        })
    },
    getAddrole(req,resp){
        roleModel.getAddrole().then((data)=>{
            //if(data){
                resp.render("addrole",{list:data});
            //}
            //console.log(data);
        })
    },
    addRole(req,resp){
        let role_name=req.query.role_name;
        let role_control=req.query.role_control;
        console.log(role_name);
        console.log(role_control);
        roleModel.addRole([role_name,role_control]).then((data)=>{
            //if(data){
            //resp.send('allrole')
                resp.redirect("allrole");
            //}
            //console.log(data);
        })
    },
    delRole(req,resp){
        let role_id=req.query.role_id;

        roleModel.delRole([role_id]).then((data)=>{
            //if(data){
            console.log("jinru");
            resp.send(data);
            //resp.write("1");
            //resp.redirect("allrole");
            //}
        })
    },
    delRole1(req,resp){
        let role_id=req.session.role_id;
        roleModel.delRole([role_id]).then((data)=>{
            //if(data){
                resp.redirect("allrole");
            //}
        })
    },
    roleTotal(req,resp){
        let page=req.query.page;
        let params=[];
        params.push((page-1)*rolecontroller.pageCount,rolecontroller.pageCount);
        roleModel.roleTotal(params).then((data)=>{
            resp.send(data);
        })
    }
};

module.exports=rolecontroller;