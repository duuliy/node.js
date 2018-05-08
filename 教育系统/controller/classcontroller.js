/**
 * Created by a on 2017/10/29.
 */
const dbpool = require("../config/fileconfig"); //dbpool

const userModel = require("../dao/userdao");

const classcontroller= {
    pageCount: 3,
    // 改"显示"数据
    getseachclass(req,res){
        var s_No=req.body.s_No||"";
        var s_name=req.body.s_name||"";
        let currentPage = req.body.currentPage;
        let sql="select * from studentArr where 1=1";
        let params=[];
        if(s_No!=""){
            sql+=" and s_No like ?";
            s_No="%"+s_No+"%";
            params.push(s_No);
        }
        if(s_name!=""){
            sql+=" and s_name like ?";
            s_name="%"+s_name+"%";
            params.push(s_name);
        }
        //分页出来有好多。
        // limit currentPage-1*pageCount,pageCount
        sql+= " limit ?,?"
        params.push((currentPage-1)*classcontroller.pageCount);
        params.push(classcontroller.pageCount);
        // console.log(sql);
        // console.log(params);
        dbpool.connect(sql,params,(err,data)=>{
            // console.log(data);
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
    //分页
    getPageTotal(req,resp){
        let result;
        dbpool.connect("select count(*) as totalcount from studentArr",[],(err,data)=>{
            // console.log(data);
            //9/3 ->3
            result = Math.ceil(data[0].totalcount/classcontroller.pageCount);
            //resp.send(如果第一位是number,指的是http status)
            resp.send(200,result)
            // resp.send(data);
        })
    },
    //传数据到另一个页面
    sendcourse(req,res){
        let s_No = req.query.id;
        // dbpool.connect("select * from studentArr where s_No = ?",[s_No],(err,data)=>{
        //     res.send(data);
        // })
        function myResponse(err,data){
            if (data != undefined) {
                if (err) {
                    res.end(err.message)
                }
            } else {
                res.end(err.message);
            }
        }
        userModel.sendclassdao([s_No]).//返回的data直接用，err，data作为参数传参就不行。
            then((data)=>{
            res.send(data);
        }).
        then(myResponse) //resolved
            .catch(function(err){  //异常捕获 catch rejected
                console.log(err)
                myResponse(err)
            })
    },
    //查询数据
    getclass(req,res){
        var s_No=req.body.s_No||"";
        var s_name=req.body.s_name||"";
        let currentPage = req.body.currentPage;
        let sql="select * from studentArr where 1=1";
        let params=[];
        if(s_No!=""){
            sql+=" and s_No like ?";
            s_No="%"+s_No+"%";
            params.push(s_No);
        }
        if(s_name!=""){
            sql+=" and s_name like ?";
            s_name="%"+s_name+"%";
            params.push(s_name);
        }
        //分页出来有好多。
        // limit currentPage-1*pageCount,pageCount
        // sql+=" limit ?,?";
        // params.push((currentPage-1)*classcontroller.pageCount);
        // params.push(classcontroller.pageCount);
        // console.log(sql);
        // console.log(params);
        dbpool.connect(sql,params,(err,data)=>{
            // console.log(data);
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
    //删除
    addUser4(req,res){
        var courseNo=req.query.id;
        //Promise.then(f2).then()
        function myResponse(err,data){
            //data from DAO
            if (data != undefined) {
                if (err) {
                    res.end(err.message)
                }
            } else {
                res.end(err.message);
            }
        }
        userModel.addUser3([courseNo]).
        then(myResponse) //resolved
            .catch(function(err){  //异常捕获 catch rejected
                console.log(err)
                myResponse(err)
            })
    },
    getaddstu(req,res){
            var classNo=req.body.bj2;
            var s_No=req.body.inpStuNo2;
            var s_name=req.body.inpStuNam2;
            var phone=req.body.inpStuNum2;
            var gradTime=req.body.inpStuTime2;
            var edu=req.body.inpStuEdu2;
        var gradSchool=req.body.inpStuSch2;
        var conNum=req.body.inpConNum2;
        var fiPre=req.body.stuAddPer2;
        var fiTime=req.body.stuAddTime2;
            console.log(req.body);
            dbpool.connect("insert into studentArr values(?,?,?,?,?,?,?,?,?,?)",
                [classNo,null,s_name,phone,gradTime,edu,gradSchool,conNum,gradSchool,fiPre,fiTime],
                (err,data)=>{
                    if (data!= undefined) {
                        if (err) {
                            res.end("erro");
                        }
                    } else {
                        res.end(err.message);
                    }
                })
    }
};
module.exports = classcontroller;
