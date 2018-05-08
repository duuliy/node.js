/**
 * Created by Administrator on 11/14/2017.
 */
 const path=require("path")
const tagDao=require(path.join(__dirname,"../dao/tagDao.js"))
const tagController={
    pagecount:5,
    getTagsbyall(req,res){
        let sql="SELECT *,(SELECT a_name FROM t_admin WHERE tag.a_id=a_id) AS a_name,(select t_name from t_tags where tag.t_g_id=t_id) as g_name" +
            " FROM t_tags tag where 1=1"
        let param=[];
        let querydetail=req.body.querydetail;
        querydetail.cpeople=querydetail.cpeople||"";
        querydetail.qceg=querydetail.qceg||"";
        querydetail.qname=querydetail.qname||"";
        querydetail.qstate=querydetail.qstate||"";
        querydetail.id=querydetail.id||"";
        querydetail.page= querydetail.page||""
        if(querydetail.id!="")
        {
            sql+=" and t_id=?";
            param.push(parseInt(querydetail.id))
        }
        // console.log("查询的条件",req.body.querydetail)
        if(querydetail.cpeople!="")
        {
            sql+=" and a_id=?";
            param.push(parseInt(querydetail.cpeople))
        }
        if(querydetail.qceg!="")
        {
            sql+=" and t_g_id=?"
            param.push(parseInt(querydetail.qceg))
        }
        if(querydetail.qname!="")
        {
            sql+=" and t_name like ?"
            param.push("%"+querydetail.qname+"%")
        }
        if(querydetail.qstate!="")
        {
            sql+=" and state=?";
            param.push(parseInt(querydetail.qstate))
        }
        let senddate={}
        tagDao.getTotalCount(sql,param).then((data)=>{
            senddate.total=data.length;
            if(querydetail.page!="")
            {
                sql+=" limit ?,?";
                param.push((parseInt(querydetail.page)-1)*tagController.pagecount)
                param.push(tagController.pagecount)

            }

            tagDao.getTagsbyall(sql,param).then((data)=>{
                // console.log("查询的数据为",data)
                senddate.data=data
                res.send(senddate)
            })
        })

},
    getTagPage(req,res){
        let sql="select * from t_admin where a_id in (select distinct a_id from t_tags)";
        let param=[];
        let creatpeopledata;
        tagDao.getCreatePerson(sql,param).then((data)=>{
            creatpeopledata=data;
            sql="SELECT *,(SELECT a_name FROM " +
                "t_admin WHERE tag.a_id=a_id) AS a_name,(select t_name from t_tags where tag.t_g_id=t_id) as g_name FROM t_tags tag"
            tagDao.getTagsbyall(sql,param).then((gdata)=>{
                //console.log()
                res.render("tags.ejs",{admin:"admin",creatpeopledata:creatpeopledata,tagsdata:gdata})
            })

        })
      //  res.render("tags.ejs",{admin:"admin"})
    },
    addTag(req,res){
        let atag=req.body.addtag;
        var a_id=req.session.a_id||1;
        let param=[];
        param.push(a_id)//创建人
        param.push(atag.tagname)//标签名
        param.push(parseInt(atag.gid))//所属id
        let now=new Date();
        param.push(now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate())//创建时间
        param.push(parseInt(atag.state))//标签状态
        let sql="insert into t_tags values(NULL,?,?,?,?,?)"
        tagDao.addTag(sql,param).then((data)=>{
            // console.log(data)
            tagDao.getTagsbyall("SELECT *,(SELECT a_name FROM t_admin WHERE tag.a_id=a_id) AS a_name,(select t_name from t_tags where tag.t_g_id=t_id) as g_name" +
                " FROM t_tags tag where t_id=? ",[data.insertId]).then((data)=>{
                res.send(data)
            })

        })
    },
    validateTagCun(req,res){
        let sql="select * from t_tags where t_name=?";
        let param=[req.body.tagname]
        req.body.currentId=req.body.currentId||"";
        if(req.body.currentId!="")
        {
            sql+=" and t_id!=?"
            param.push(req.body.currentId)
        }
        tagDao.validateTagCun(sql,param).then((data)=>{
            if(data.length>0)
            {
                // console.log("验证数据为",data)
                res.send("1")
            }else{
                res.send("0")
            }
        }).catch((err)=>{
            console.log("发生错误",err.message)
        })
    },
    updateTag(req,res){
        let sql="update t_tags set t_name=?,t_g_id=?,state=? where t_id=?"
        let param=[];
        let uptagtag=req.body.uptagtag;
        param.push(uptagtag.tagname)
        param.push(uptagtag.gid)
        param.push(uptagtag.state)
        param.push(uptagtag.t_id)

        tagDao.updateTag(sql,param).then((data)=>{
            // console.log(data)
            tagDao.getTagsbyall("SELECT *,(SELECT a_name FROM t_admin WHERE tag.a_id=a_id) AS" +
                " a_name,(select t_name from t_tags where tag.t_g_id=t_id) as g_name" +
            " FROM t_tags tag where t_id=?",[uptagtag.t_id]).then((data)=>{
                res.send(data)
            })

        }).catch((err)=>{
            res.send(err.message)
        })
    },
    startandEndUse(req,res){
        let sql;
        if(parseInt(req.body.isqi)==1)
        {
            sql="update t_tags set state=1 where t_id=?";
        }else{
            sql="update t_tags set state=0 where t_id=?";
        }
        let param=[req.body.tagid]

        tagDao.startandEndUse(sql,param).then((data)=>{
            res.send("ok")
        }).catch((err)=>{
            console.log(err.message)
        })
    }
}
module.exports=tagController