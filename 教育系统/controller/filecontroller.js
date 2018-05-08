/**
 * Created by a on 2017/10/20.
 */
// const mysql = require("mysql");
const dbpool = require("../config/fileconfig"); //dbpool


const userController = {
    getUser(request,response){
        console.log("controller收到getUser的任务");
        //...业务处理
        //GET请求里面获取form表单的数据
        //请求相关信息都在request对象里
        console.log(request.query.username);  //URL?后面的内容
        console.log(request.query.password);
        //SQL -  select * from t_user where username = username值 and password = password值
        //有结果返回 --> 登录成功
        response.send("任务完成，结束响应")
    },
    postUser(req,resp){
        console.log(req.body.username); //通过bodyParser读取后放到body对象里面
        console.log(req.body.password);
        console.log(req.query); // {}

        let username = req.body.username;
        let password = req.body.password;

        // resp.send("post收到");
        /*====连接mysql数据库======*/
        /*1.创建一个连接对象
         * mysql配置*/
        // const db = mysql.createConnection({
        //     host:"localhost", //主机地址
        //     port:"3306",  //端口默认是3306
        //     user:"root",
        //     password:"940125",
        //     database:"day6"
        // });
        // /*2.发起连接*/
        // db.connect();
        //
        // /*3.发起sql语句请求
        //  * 1.SQL语句
        //  * 2.SQL参数
        //  * 3.回调函数 -- 执行完sql语句之后调用，把结果注入在回调函数参数里面，作出响应*/
        // db.query("select * from roleArr where roleName =? and roleDes =?",
        //     [username,password],
        //     (err,data)=>{
        //     console.log(bodyParser);
        //         // console.log(err.message);  //错误提示
        //         console.log(data);  //返回[]
        //         if(data!=undefined){  //判断sql执行是否正确
        //             if(data.length>0){  //判断数据是否正确
        //                 // console.log("11")
        //                 resp.redirect("index.html")
        //             }else{
        //                 resp.send("登录失败");
        //             }
        //         }else{
        //             resp.send("数据库报错"+err.message)
        //         }
        //
        //     }
        // );
        // db.end()
        // // resp.redirect("success.html") //思考: 原生原理是怎么样

        dbpool.connect("select * from roleArr where roleName =? and roleDes =?",
            [username,password],
            (err,data)=>{
                if(data!=undefined){  //判断sql执行是否正确
                    if(data.length>0){  //判断数据是否正确
                        // console.log("11")
                        resp.redirect("index.html")
                    }else{
                        resp.send("登录失败");
                    }
                }else{
                    resp.send("数据库报错"+err.message)
                }
            })
    },
    //显示到页面
    getRole(req,res){
    //     //1.连接数据库
    //     const db=mysql.createConnection({
    //         host:"localhost",
    //         port:"3306",
    //         user:"root",
    //         password:"940125",
    //         database:"day6"
    //     });
    //     //2.发起连接
    //     db.connect();
    //     //3.发起请求
    //     //查询
    //     db.query("select * from roleArr",(err,data)=>{
    //         if(data!=undefined){
    //             if(data.length>0){
    //                 res.send(data);
    //             }else{
    //                 res.end("erro");
    //             }
    //         }else{
    //             res.end(err.message);
    //         }
    //     });
    //     //4.关闭数据库
    //     db.end();

        dbpool.connect("select * from roleArr",
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
    //传数据到另一个页面
    sendrole(req,res){
        let roleNo = req.query.id;
        dbpool.connect("select * from roleArr where roleNo = ?",[roleNo],(err,data)=>{
            res.send(data);
        })

    },
    //修改数据
    getxgrole(req,res){
        console.log(req.query)
        var roleNo=req.query.roleNo;
        var roleName=JSON.stringify(req.query.roleName);
        var roleDes=JSON.stringify(req.query.roleDes);
        var roleBz=JSON.stringify(req.query.roleBz);
        // //1.连接数据库
        // const db=mysql.createConnection({
        //     host:"localhost",
        //     port:"3306",
        //     user:"root",
        //     password:"940125",
        //     database:"day6"
        // });
        // //2.发起连接
        // db.connect();
        // //3.发起请求
        // //修改
        // db.query("update roleArr set roleNo="+roleNo+
        //     ",roleName="+roleName+",roleDes="+roleDes+
        //     ",roleBz="+roleBz+" where roleNo=?", roleNo, (err, data) => {
        //     if (data != undefined) {
        //         if (err) {
        //             res.end("erro");
        //         }
        //     } else {
        //         res.end(err.message);
        //     }
        // });
        // //4.关闭数据库
        // db.end();

        dbpool.connect("update roleArr set roleNo="+roleNo+
            ",roleName="+roleName+",roleDes="+roleDes+
            ",roleBz="+roleBz+" where roleNo=?", roleNo,
            (err,data)=>{
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
    getscrole(req,res){
        var roleNo=req.query.put;
        dbpool.connect("delete from roleArr where roleNo=?", roleNo,
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
    //添加数据
    getaddrole(req,res){
        var roleNo=req.query.roleNo;
        var roleName=req.query.roleName;
        var roleDes=req.query.roleDes;
        var roleBz=req.query.roleBz;
        //1.连接数据库
        // console.log(roleNo);
        // const db=mysql.createConnection({
        //     host:"localhost",
        //     port:"3306",
        //     user:"root",
        //     password:"940125",
        //     database:"day6"
        // });
        // //2.发起连接
        // db.connect();
        // //3.发起请求
        // //新增
        // db.query("insert into roleArr values(?,?,?,?)", [null,roleName,roleDes,roleBz], (err, data) => {
        //     if (data != undefined) {
        //         if (err) {
        //             res.end("erro");
        //         }
        //     } else {
        //         res.end(err.message);
        //     }
        // });
        //
        // //4.关闭数据库
        // db.end();
        dbpool.connect("insert into roleArr values(?,?,?,?)", [null,roleName,roleDes,roleBz],
            (err,data)=>{
                if (data != undefined) {
                    if (err) {
                        res.end("erro");
                    }
                } else {
                    res.end(err.message);
                }
            })
    },
    //查询数据
    getseachrole(req,res){
        var roleNo="%"+req.query.roleNo+"%";
        var roleName="%"+req.query.roleName+"%";
        let sql="select * from roleArr where roleNo like ? and roleName like ?"
        dbpool.connect(sql,[roleNo,roleName],
            // console.log(sql)
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
};




module.exports = userController;