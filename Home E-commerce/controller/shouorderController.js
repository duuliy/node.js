/**
 * Created by Administrator on 11/15/2017.
 */
const path=require("path")
const shouorderdao=require(path.join(__dirname,"../dao/shouOrderdao.js"))
const shouorder={
    getorderzhexian(req,res)
    {
        let getalldetail={}
        shouorderdao.gettotalCount("select count(*) as tolcount from t_order where year(paytime)=year(now())").then((data)=>{
            getalldetail.count=data;
            shouorderdao.geteverymonthcount("SELECT COUNT(*) AS everycount,MONTH(paytime) AS mon,YEAR(paytime) AS eveyear FROM t_order WHERE YEAR(paytime)=YEAR(NOW()) GROUP BY MONTH(paytime) ORDER BY MONTH(paytime)").then((data)=>{
                getalldetail.evemoncount=data;
                if(data.length>1)
                {
                    shouorderdao.gettotalCount("select count(*) as tolcount from t_order where year(paytime)=year(now())-1 and month(paytime)<"+(data[data.length-1].mon+1)).then((data)=>{
                        getalldetail.oldtotal=data;
                        shouorderdao.geteverymonthcount("SELECT COUNT(*) AS everycount,MONTH(paytime) AS mon,YEAR(paytime) AS " +
                            "eveyear FROM t_order WHERE YEAR(paytime)=YEAR(NOW())-1 and month(paytime)<"+(getalldetail.evemoncount[getalldetail.evemoncount.length-1].mon+1)+
                            " GROUP BY MONTH(paytime) ORDER BY MONTH(paytime)").then((data)=>{
                            getalldetail.oldyearcount=data
                            res.send(getalldetail)
                        })
                    }).catch((err)=>{
                        console.log(err.message)
                    })
                }else{
                    getalldetail.oldtotal=[]
                    getalldetail.oldyearcount=[]
                }


            }).catch((err)=>{
                console.log(err.message)
            })

        }).catch((err)=>{
            console.log(err.message)
        })
    },
    getYuzhexian(req,res){
        let getalldetail={}
        shouorderdao.gettotalCount("select count(*) as tolcount from t_appointment where year(createtime)=year(now())").then((data)=>{
            getalldetail.count=data;
            shouorderdao.geteverymonthcount("SELECT COUNT(*) AS everycount,MONTH(createtime) AS mon,YEAR(createtime) AS eveyear FROM t_appointment WHERE YEAR(createtime)=YEAR(NOW()) GROUP BY MONTH(createtime) ORDER BY MONTH(createtime)").then((data)=>{
                getalldetail.evemoncount=data;
                res.send(getalldetail)
                console.log("得到的预约信息为",getalldetail)
            }).catch((err)=>{
                console.log(err.message)
            })

        }).catch((err)=>{
            console.log(err.message)
        })
    }
}
module.exports=shouorder