
/*1.引入mysql*/
const path=require("path");
const dbpool = require("../config/dbconfig"); //dbpool
//引入Dao层
const t_roleDao=require("../dao/t_roleDao");
const t_roleController = {
    getAllrole(req, res){
        t_roleDao.getRole().then(data=> {
            console.log("DAO执行完毕，controller执行回调函数");
            res.render("trole", {list: data, admin: "admin"})
        })
    },
    pagecount:5,
    getqueryRole(req, res){
        let param=[];
        let querydetail=req.query.querydetail;
        querydetail.role_name = querydetail.role_name || "";
        querydetail.role_script = querydetail.role_script || "";
        querydetail.role_state =querydetail.role_state || "";
        id=querydetail.id||""
        console.log("查询", querydetail.role_script);
        //sql语句
        let sql = "select *,(select a_name from t_admin where a_id=t_role.a_id) as a_name from t_role where 1=1";
        //SELECT * FROM t_role,t_admin WHERE a_name=(SELECT a_name FROM t_admin WHERE t_role.a_id=t_admin.a_id)
        let params = [];
        if(id!="")
        {
            sql+=" and r_id=?"
            params.push(id)
        }
        if (querydetail.role_name != "") {
            sql += " and r_name like ?";
            //role_name = "%" + role_name + "%";
            params.push(querydetail.role_name)
        }
        if (querydetail.role_script != "") {
            sql += " and r_jur = ?";
            params.push(querydetail.role_script)
        }
        if (querydetail.role_state != "") {
            sql += " and state = ?";
            params.push(querydetail.role_state)
        }
        console.log(sql);
        console.log("条件", querydetail);
        let senddate={}
        t_roleDao.getTotalCount(sql,params).then((data)=>{
            console.log("数据条数", data);
            senddate.total=data.length;
            if(querydetail.conutFenye!="")
            {
                sql+=" limit ?,?";
                params.push((parseInt(querydetail.conutFenye)-1)*t_roleController.pagecount);
                //console.log(querydetail.conutFenye)
                params.push(t_roleController.pagecount)
                //console.log(params)
            }
            t_roleDao.getqueryRole(sql,params).then((data)=>{
                // console.log("查询的数据为",data)
                senddate.data=data;
                res.send(senddate)
            })
        }).catch((err)=>{
            console.log("出错了",err.message)
        })

        //dbpool.connect(sql, params, (err, data)=> {
        //    if(err)
        //    {
        //        console.log(err.message)
        //    }else{
        //        console.log("数据为",data);
        //        res.send(data);
        //        //resp.render("trole", {list: data, admin: "admin"})
        //    }
        //
        //})
    },
    getaddRole(req,resp){
        let atag=req.body.addtag;
        var a_id=req.session.a_id||1;
        let param=[];
        param.push(a_id)//创建人
        //console.log("创建人",a_id)
        param.push(atag.tagname)//标签名
        //console.log("标签名",atag.tagname)
        param.push(atag.gid)//所属id
        //console.log("ID",atag.gid)
        param.push(atag.rmark)//备注
        //console.log("备注",atag.rmark)
        let now=new Date();
        param.push(now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate())//创建时间
        param.push(atag.state)//标签状态
        //console.log("标签状态",atag.state);
        let sql="insert into t_role values(NULL,?,?,?,?,?,?)";
        //console.log("sql"+sql)
        //console.log("插入的数据",param)
        t_roleDao.addTag(sql,param).then((data)=>{
            console.log("查询的"+data)
            t_roleDao.getRolebyall("SELECT t_role.*,t_admin.*,t_role.state as rstate FROM t_role,t_admin WHERE  t_role.a_id=t_admin.a_id and r_id=?",[data.insertId]).then((data)=>{
               console.log("差荣誉感",data);
                resp.send(data)
            })

        })
    },
    validateRoleCun(req,res){
        let sql="select * from t_role where r_name=?";
        let param=[req.body.tagname];
        req.body.currentId=req.body.currentId||"";
        if(req.body.currentId!="")
        {
            sql+=" and r_id!=?";
            param.push(req.body.currentId)
        }
        t_roleDao.validateRoleCun(sql,param).then((data)=>{
            if(data.length>0)
            {
                console.log("验证数据为",data);
                res.send("1")
            }else{
                res.send("0")
            }
        }).catch((err)=>{
            console.log("发生错误",err.message);
        })
    },
    insertRole(req,res){
        let sql="update t_role set r_name=?,r_jur=?,r_remark=?,state=? where r_id=?"
        let param=[];
        let uptagtag=req.body.uptagtag;
        param.push(uptagtag.tagname);
        param.push(uptagtag.script);
        param.push(uptagtag.remark);
        param.push(uptagtag.state);
        param.push(uptagtag.r_id);
        t_roleDao.insertRole(sql,param).then((data)=>{
            //console.log("修改的数据"+param);
            //console.log(data);
            t_roleDao.getRolebyall("SELECT t_role.*,t_admin.* FROM t_role,t_admin WHERE  t_role.a_id=t_admin.a_id and r_id=?",
                [uptagtag.r_id]).then((data)=>{
                res.send(data)
            })

        }).catch((err)=>{
            res.send(err.message)
        })
    },
    opendownUse(req,res){
        let sql;
        if(parseInt(req.body.isqi)==1)
        {
            sql="update t_role set state=1 where r_id=?";
        }else{
            sql="update t_role set state=0 where r_id=?";
        }
        let param=[req.body.tagid]
        t_roleDao.opendownUse(sql,param).then((data)=>{
            res.send("ok")
        }).catch((err)=>{
            console.log(err.message)
        })
    }
};
module.exports = t_roleController;