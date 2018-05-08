/**
 * Created by a on 2017/10/24.
 */
const dbpool = require("../config/fileconfig"); //dbpool


const depcontroller={
    getdep(req,res){
        dbpool.connect("select * from depArr",
            (err,data)=>{
            if(data!=undefined){
            if(data.length>0){
                res.send(data);
            }else{
                res.end("erro");
            }
        }else{
            res.end(err.message);
        }
    })
    },
    // 修改数据
    getxgdep(req,res){
        console.log(req.query);
        var depNo=req.query.depNo;
        var depName=req.query.depName;
        var roleDes=req.query.roleDes;
        var depNum=req.query.depNum;
        var depBz=req.query.depBz;
        console.log(req.query);
        dbpool.connect("update depArr set depName=?,roleDes=?,depNum=?,depBz=? where depNo=?",
            [depName,roleDes,depNum,depBz,depNo],
            (err,data)=>{
                console.log(err);
                if (data != undefined) {
            if (err) {
                res.end("erro");
            }
        } else {
            res.end(err.message);
        }
    })
    },
    //删除数据
    getscdep(req,res){
        var depNo=req.query.id;
        console.log(req.query)
        dbpool.connect("delete from depArr where depNo=?", depNo,
            (err,data)=>{
                if (data != undefined) {
                    if (err) {
                        res.end(err.message)
                    }
                } else {
                    res.end(err.message);
                }
            })
    },
    //添加数据 ??
    getadddep(req,res){
        var depNo=req.query.depNo;
        var depName=req.query.depName;
        var roleDes=req.query.roleDes;
        var depNum=req.query.depNum;
        var depBz=req.query.depBz;
        dbpool.connect("insert into depArr values(?,?,?,?,?)",
            [null,depName,roleDes,depNum,depBz],
            (err,data)=>{
                if (data!= undefined) {
                    if (err) {
                        res.end("erro");
                    }
                } else {
                    res.end(err.message);
                }
            })
    },
    //查询数据
    getseachdep(req,res){
        var depNo=req.query.depNo;
        var depName="%"+req.query.depName+"%"||"";//模糊查询或者为空 同时进行查询。加trim()去掉空格
        //where 后面加个不妨碍的条件 1=1 ，在进行拼接，删除以下任意一条就不影响总体
        dbpool.connect("select * from depArr where depName=?",[depName],
            (err,data)=>{
                if(data!=undefined){
                    if(data.length>0){
                        res.send(data);
                    }else{
                        res.end("erro");
                    }
                }else{
                    res.end(err.message);
                }
            })
    }
}



module.exports = depcontroller;