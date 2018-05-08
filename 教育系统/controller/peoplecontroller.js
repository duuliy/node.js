/**
 * Created by a on 2017/10/23.
 */
const dbpool = require("../config/fileconfig"); //dbpool

const peoplecontroller={
    // 连接数据库
    pageCount:3,
    //显示页面
    getPeople(req,res){
        dbpool.connect("select * from peopleArr limit 3",
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
    // 修改数据
    getxgPeople(req,res){
        var peopleNo=req.query.peopleNo;
        var depName=JSON.stringify(req.query.depName);
        var peopleName=JSON.stringify(req.query.peopleName);
        var peopleAcount=JSON.stringify(req.query.peopleAcount);
        var peoplePhone=JSON.stringify(req.query.peoplePhone);
        var peopleQQ=JSON.stringify(req.query.peopleQQ);
        var peopleEmail=JSON.stringify(req.query.peopleEmail);
        var roleName=JSON.stringify(req.query.roleName);
        dbpool.connect("update peopleArr set depName="+depName+
            ",peopleName="+peopleName+
            ",peopleAcount="+peopleAcount+
            ",peoplePhone="+peoplePhone+
            ",peopleQQ="+peopleQQ+
            ",peopleEmail="+peopleEmail+
            ",roleName="+roleName+
            "where peopleNo=?", peopleNo,
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
    getscPeople(req,res){
        var peopleNo=req.query.id;
        dbpool.connect("delete from peopleArr where peopleNo=?", peopleNo,
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
    getaddPeople(req,res){
        var peopleNo=req.query.peopleNo;
        var depName=req.query.depName;
        var peopleName=req.query.peopleName;
        var peopleAcount=req.query.peopleAcount;
        var peoplePhone=req.query.peoplePhone;
        var peopleQQ=req.query.peopleQQ;
        var peopleEmail=req.query.peopleEmail;
        var roleName=req.query.roleName;
        dbpool.connect("insert into peopleArr values(?,?,?,?,?,?,?,?)",
            [null,depName,peopleName,peopleAcount,peoplePhone,peopleQQ,peopleEmail,roleName],
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
    getseachPeople(req,res){
        var peopleName=req.query.peopleName||"";
        var peoplePhone=req.query.peoplePhone||"";
        var peopleQQ=req.query.peopleQQ||"";
        var roleName=JSON.stringify(req.query.roleName);

        let currentPage = req.query.currentPage;
        let sql="select * from peopleArr where 1=1";
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
            params.push((currentPage-1)*peoplecontroller.pageCount);
            params.push(peoplecontroller.pageCount);
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
        dbpool.connect("select count(*) as totalcount from peopleArr",[],(err,data)=>{
            // console.log(data);
            //9/3 ->3
            result = Math.ceil(data[0].totalcount/peoplecontroller.pageCount);

            // console.log(result);
            // console.log(typeof result); //number
            //RangeError: Invalid status code: 4 -- 不是一个有效的状态码
            //resp.status=404
            //resp.send(如果第一位是number,指的是http status)
            resp.send(200,result)
            // resp.send(data);
        })
    }
};


module.exports = peoplecontroller;