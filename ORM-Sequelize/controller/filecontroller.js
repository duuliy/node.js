
const dbpool = require("../config/dbconfig"); //dbpool
// const userModel = require("../dao/userdao");

const filecontroller = {
    // //显示到页面
    // getRole(req,res){
    //     dbpool.connect("select * from roleArr",
    //         (err,data)=>{
    //             if(data!=undefined){
    //                 if(data.length>0){
    //                     res.send(data);
    //                 }else{
    //                     res.end("erro");
    //                 }
    //             }else{
    //                 res.end(err.message);
    //             }
    //         })
    // },
    // //传数据到另一个页面
    // sendrole(req,res){
    //     let roleNo = req.query.id;
    //     dbpool.connect("select * from roleArr where roleNo = ?",[roleNo],(err,data)=>{
    //         res.send(data);
    //     })

    // },
    // //修改数据
    // getxgrole(req,res){
    //     console.log(req.query)
    //     var roleNo=req.query.roleNo;
    //     var roleName=JSON.stringify(req.query.roleName);
    //     var roleDes=JSON.stringify(req.query.roleDes);
    //     var roleBz=JSON.stringify(req.query.roleBz);
    //     dbpool.connect("update roleArr set roleNo="+roleNo+
    //         ",roleName="+roleName+",roleDes="+roleDes+
    //         ",roleBz="+roleBz+" where roleNo=?", roleNo,
    //         (err,data)=>{
    //             if (data != undefined) {
    //                 if (err) {
    //                     res.end("erro");
    //                 }
    //             } else {
    //                 res.end(err.message);
    //             }
    //         })

    // },
    // //删除数据
    // getscrole(req,res){
    //     var roleNo=req.query.put;
    //     dbpool.connect("delete from roleArr where roleNo=?", roleNo,
    //         (err,data)=>{
    //             if (data != undefined) {
    //                 if (err) {
    //                     res.end(err.message)
    //                 }
    //             } else {
    //                 res.end(err.message);
    //             }
    //         })
    // },
    // //添加数据
    // getaddrole(req,res){
    //     var roleNo=req.query.roleNo;
    //     var roleName=req.query.roleName;
    //     var roleDes=req.query.roleDes;
    //     var roleBz=req.query.roleBz;
    //     dbpool.connect("insert into roleArr values(?,?,?,?)", [null,roleName,roleDes,roleBz],
    //         (err,data)=>{
    //             if (data != undefined) {
    //                 if (err) {
    //                     res.end("erro");
    //                 }
    //             } else {
    //                 res.end(err.message);
    //             }
    //         })
    // },
    // //查询数据
    // getseachrole(req,res){
    //     var roleNo="%"+req.query.roleNo+"%";
    //     var roleName="%"+req.query.roleName+"%";
    //     let sql="select * from roleArr where roleNo like ? and roleName like ?"
    //     dbpool.connect(sql,[roleNo,roleName],
    //         // console.log(sql)
    //         (err,data)=>{
    //             if(data!=undefined){
    //                 if(data.length>0){
    //                     res.send(data);
    //                 }else{
    //                     res.end("erro");
    //                 }
    //             }else{
    //                 res.end(err.message);
    //             }
    //         })
    // }
};




module.exports = filecontroller;