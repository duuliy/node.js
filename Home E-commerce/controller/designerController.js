/**
 * Created by Administrator on 2017/11/14.
 */
'use strict'
const dbpool=require("../config/dbconfig.js");
const designerModel=require("../dao/designerDao.js");
const uploaddesigner=require("../config/uploaddesignerconfig");
const fs=require("fs");

const designerController={
    pageCount:5,
    addDesigner(req,resp){
        let name=req.body.name;
        let introduce=req.body.introduce;
        let mypath=req.body.mypath;
        let product=req.body.product;
        let createTime=req.body.createTime;
        let a_id=req.session.userid;
        console.log("我是a_id",a_id)
        let state=1;
        // console.log(name)
        designerModel.addDesignerDao("insert into t_designer values (?,?,?,?,?,?,?,?)",
            [null,name,mypath,introduce,
                product,createTime,a_id,state]).then(data=>{
                resp.send(data)
            }
        ).catch((err)=>{
                console.log(err.message)
            })
    },
    createfile(req,resp){
        let filename=req.body.filename;
        // console.log(filename)
        fs.mkdir("./public/uploads/"+filename,function(err){
            if(err){
                console.log("创建文件夹错误",err.message)
            }else{
                uploaddesigner.changedestorage(filename)
                // console.log(uploaddesigner.storage)
                resp.send("ok")
            }
        })
    },
    updatePathname(req,resp){
        let curentid=req.body.curentid;
        let imgName=req.body.imgName;
        console.log("我是修改的imgName："+imgName)
        let pathName="uploads/"+curentid+"/"+imgName;
        console.log("我是修改的pathName："+imgName)

        //if(imgName!=""){
            uploaddesigner.changedestorage(curentid)
        //}
        designerModel.updatePathnameDao("update t_designer set d_img=? where d_id=?",
            [pathName,curentid]).then(data=>{
                resp.send(data)
            }
        ).catch((err)=>{
                console.log(err.message)
            })
    },
    getAllDesigner(req,resp){
        designerModel.getAllDesignerDao("select *from t_designer as a left join t_admin as b on a.a_id=b.a_id",
            []).then(data=>{
                resp.render("designer",{list:data,admin:"admin"});
            }
        ).catch((err)=>{
                console.log(err.message)
            })
    },
    queryDesigner(req,resp){
        let querydetail=req.body.querydetail;
        let dname=querydetail.dname;
        let dpeople=querydetail.dpeople;
        let page=parseInt(querydetail.page);
        let sql="select *from t_designer as a left join t_admin as b on a.a_id=b.a_id where 1=1 ";
        let params=[];
        if(dname!=""){
            sql+=" and d_name like ? ";
            params.push("%"+dname+"%");
        }
        if(dpeople!=""){
            sql+=" and a_name like ? ";
            params.push("%"+dpeople+"%");
        }
        console.log(sql)
        console.log(params)
        let sendData={};

        designerModel.queryDesignerDao(sql,params).
            then((data)=>{
                sendData.total=data.length;
                console.log("我是sendData.total",data.length)

                sql+=" limit "+(page-1)*(designerController.pageCount)+","+designerController.pageCount;
                designerModel.getCountDao(sql,params).
                    then((data)=>{
                        console.log("我是查询出来的数据",data)
                        sendData.data=data;
                        resp.send(sendData)
                        console.log("我是sendData:",sendData)

                    }
                ).catch((err)=>{
                        console.log(err.message)
                    })
                //resp.send(sendData)
            }
        ).catch((err)=>{
                console.log(err.message)
            })

    },
    AllDesignerList(req,resp){
        designerModel.AllDesignerListDao("select *from t_designer as a left join t_admin as b on a.a_id=b.a_id",
            []).then(data=>{
                resp.send(data)
            }
        ).catch((err)=>{
                console.log(err.message)
            })
    },
    getOneList(req,resp){
        let id=req.query.id;
        designerModel.getOneListDao("select *from t_designer where d_id=?",
            [id]).then(data=>{
                resp.send(data)
            }
        ).catch((err)=>{
                console.log(err.message)
            })
    },
    modifyDesigner(req,resp){
        let id=req.body.id;
        let name=req.body.name;
        let introduce=req.body.introduce;
        let product=req.body.product;
        let createTime=req.body.createTime;
        let a_id=req.session.userid;
        let imgName=req.body.imgName;
        let pathName="uploads/"+id+"/"+imgName;
        var params,sql;
        console.log("我是imgName：",imgName)
        if(imgName==""){
            params=[name,introduce,product,createTime,a_id,id];
            sql="update t_designer set d_name=?," +
                " d_case=?,d_detail=?,createtime=?,a_id=? where d_id=?"
        }else{
            params=[name,pathName,introduce,product,createTime,a_id,id];
            sql="update t_designer set d_name=?," +
            " d_img=?,d_case=?,d_detail=?,createtime=?,a_id=? where d_id=?"
        }
        designerModel.modifyDesignerDao(sql,params).then(data=>{
                resp.send(data)
                uploaddesigner.changedestorage(id)
            }
        ).catch((err)=>{
                console.log(err.message)
            })
    },
    searchDesigner(req,resp){
        let searchName=req.query.searchName;
        let searchPerson=req.query.searchPerson;
        let sql="select *from t_designer as a left join t_admin as b on a.a_id=b.a_id where 1=1 ";
        let params=[];
        if(searchName!=""){
            sql+="and d_name like ? ";
            params.push("%"+searchName+"%");
        }
        if(searchPerson!=""){
            sql+="and a_name like ? ";
            params.push("%"+searchPerson+"%");
        }
        console.log(sql)
        console.log(params)

        designerModel.searchDesignerDao(sql,params).
            then((data)=>{
                console.log("我是查询出来的数据",data)
                resp.send(data)
            }
        ).catch((err)=>{
                console.log(err.message)
            })
    },
    deleteDesigner(req,resp){
        let id=req.query.id;
        let state=req.query.state;
        designerModel.deleteDesignerDao("update t_designer set state=? where d_id=?",
            [state,id]).then(data=>{
                resp.send(data)
                //console.log("wossjdhd")
                //console.log(data)
            }
        ).catch((err)=>{
                console.log(err.message)
            })
    }
}
module.exports=designerController;