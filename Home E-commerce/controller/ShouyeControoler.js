/**
 * Created by Administrator on 11/15/2017.
 */
const path=require("path")
const shoudao=require(path.join(__dirname,"../dao/ShouyeDao.js"))
const shouycontroler={

    getMaxandMinMonth(req,res)
    { let getalldetail={}
        shoudao.getMaxandMinMonth().then((data)=>{
            getalldetail.maxandmin=data
            //console.log(data)
            shoudao.getTotalCountinthisyear("select count(*) as tolcount from t_user where year(createtime)=year(now())").then((data)=>{

                getalldetail.count=data;


                shoudao.geteveryMonthCount("SELECT COUNT(*) AS everycount,MONTH(createtime) AS mon " +
                    "FROM t_user WHERE YEAR(createtime)=YEAR(NOW()) GROUP BY MONTH(createtime) order by MONTH(createtime)",[]).then((data)=>{
                    getalldetail.evemoncount=data
                   if(data.length>1)
                   {
                       shoudao.geteveryMonthCount("SELECT COUNT(*) AS everycount,MONTH(createtime) AS mon " +
                           "FROM t_user WHERE YEAR(createtime)=(YEAR(NOW())-1) and MONTH(createtime)<"+(data[data.length-1].mon+1)+" GROUP BY MONTH(createtime)",[]).then((data)=>{
                           getalldetail.oldyearcount=data
                           console.log(getalldetail.evemoncount[getalldetail.evemoncount.length-1].mon)
                           shoudao.getTotalCountinthisyear("select count(*) as tolcount from t_user where year(createtime)=year(now())-1 and month(createtime)<"+(getalldetail.evemoncount[getalldetail.evemoncount.length-1].mon+1)).then((data)=>{
                               getalldetail.oldtotal=data;
                               res.send(getalldetail)
                    console.log("111111")
                    console.log(data[data.length-1].mon)
                           }).catch((err)=>{
                               console.log(err.message)
                           })

                       })
                   }else{
                       getalldetail.oldtotal=[];
                       res.send(getalldetail)
                   }



                }).catch((err)=>{
                    console.log(err.message)
                })


            }).catch((err)=>{
                console.log(err.message)
            })
        }).catch((err)=>{
            console.log(err.message)
            res.send(err)
        })
    }
}
module.exports=shouycontroler


