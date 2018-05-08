/**
 * Created by a on 2017/10/26.
 */

const dbpool = require("../config/fileconfig"); //dbpool

const userModel = require("../dao/userdao");

const coursecontroller={
    pageCount:3,
    //显示页面
    getcourse(req,res){
        dbpool.connect("select * from courseArr",
            (err,data)=>{
                if(data!=undefined){
                    if(data.length>0){
                        res.send(data);
                        // console.log(data);
                        // console.log(data);
                    }else{
                        res.end("erro");
                    }
                }else{
                    res.end(err.message);
                }
            })
    },
    //传数据到另一个页面
    sendcourse(req,res){
        let courseNo = req.query.id;
        dbpool.connect("select * from roleArr where courseNo = ?",[courseNo],(err,data)=>{
            res.send(data);
        })

    },

    // 修改数据
    getxgcourse(req,res){
        var courseNo=req.body.courseNo;
        var courseName=req.body.courseName2;
        var stageName=req.body.allDay2;
        var courseDay=req.body.allDay2;
        var courseDate=req.body.courseDate;
        var courseBei=req.body.courseLei2;
        dbpool.connect("update courseArr set courseName=?,stageName=?,courseDay=?,courseDate=?,courseBei where courseNo=?",
            [courseName,stageName,courseDay,courseDate,courseBei,courseNo],
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
    // getsccourse(req,res){
    //     var courseNo=req.query.id;
    //     console.log(courseNo)
    //     dbpool.connect("delete from courseArr where courseNo=?", courseNo,
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
        userModel.addUser2([courseNo]).
        then(myResponse) //resolved
            .catch(function(err){  //异常捕获 catch rejected
                console.log(err)
                myResponse(err)
            })
    },
    // //添加数据
    getaddcourse(req,res){
        var courseNo=req.body.courseNo;
        var courseName=req.body.courseName2;
        var stageName=req.body.allDay2;
        var courseDay=req.body.allDay2;
        var courseDate=req.body.courseDate;
        var courseBei=req.body.courseLei2;
        console.log(req.body)
        dbpool.connect("insert into courseArr values(?,?,?,?,?,?)",
            [null,courseName,stageName,courseDay,courseDate,courseBei],
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
    //查询改显示数据
    getseachcourse(req,res){
        var peopleName=req.query.peopleName||"";
        var peoplePhone=req.query.peoplePhone||"";
        var peopleQQ=req.query.peopleQQ||"";
        var roleName=JSON.stringify(req.query.roleName);

        let currentPage = req.query.currentPage;
        let sql="select * from courseArr where 1=1";
        let params=[];
        if(peopleName!=""){
            sql+=" and peopleName like ?"
            peopleName="%"+peopleName+"%";
            params.push(peopleName);
        }
        if(peoplePhone!=""){
            sql+=" and peoplePhone like ?"
            peoplePhone="%"+peoplePhone+"%";
            params.push(peoplePhone);
        }
        if(peopleQQ!=""){
            sql+=" and peopleQQ like ?"
            peopleQQ="%"+peopleQQ+"%";
            params.push(peopleQQ);
        }
        //分页出来有好多。
        // limit currentPage-1*pageCount,pageCount
        sql+= " limit ?,?"
        params.push((currentPage-1)*coursecontroller.pageCount);
        params.push(coursecontroller.pageCount);
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
        dbpool.connect("select count(*) as totalcount from courseArr",[],(err,data)=>{
            // console.log(data);
            //9/3 ->3
            result = Math.ceil(data[0].totalcount/coursecontroller.pageCount);
            //resp.send(如果第一位是number,指的是http status)
            resp.send(200,result)
            // resp.send(data);
        })
    },
    newLogin(req,resp){
        let username = req.body.username;
        let password = req.body.password;
        // console.log(req.body);
        userModel.getUser([username,password]).
        then((data)=>{
            if(data.length>0){   //登录成功
                // console.log("登录的user");
                // console.log(data[0].u_username);
                //把用户名写入session
                req.session.username = data[0].u_username;
                // resp.locals.username= req.session.username
                // resp.redirect("index.html")
                resp.redirect(req.session.originalURL)
            }else{
                resp.send("登录失败")
            }
        })

    },
    getUsername(req,resp){
        console.log(req.session.username)
        resp.send(req.session.username)
    }
        };


module.exports = coursecontroller;