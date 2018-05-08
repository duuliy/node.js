const dbpool=require('../config/dbpoolConfig');
const serviceDao=require("../dao/serviceDao");

const serviceController={
    pageCount:5,
    /*�Լ���*/
    getService(req,resp){
        let params=[];
        let a=req.params.pg;

        params.push(parseInt(req.params.pg-1)*serviceController.pageCount);
        params.push(serviceController.pageCount);

        serviceDao.servicePage().then(total=>{
            let result=Math.ceil(total[0].a/serviceController.pageCount);

            serviceDao.getAllService(params).then(data=>{
                console.log(data);
                resp.render("ServiceLoad",{loadService:data,pg:a,totalPage:result})
            })

        })

    },

    upService(req,resp){
        console.log("控制层",req.body.service_status)
        console.log("控制层",req.body.service_id)
        serviceDao.getUp([req.body.service_status,req.body.service_id]).then(data=>{
            resp.send(data)
        })
    }



}

module .exports=serviceController;