
const dbpool=require("../config/dbpoolconfig");
const customModel=require("../dao/customDao");
const customController={
    pageCount:5,
    getAllCustom(req,resp){
        let params=[];
        params.push((req.params.page-1)*customController.pageCount);
        params.push(customController.pageCount);

        customModel.getTotalCount().then(TotalCount=>{
            let result=Math.ceil(TotalCount[0].totalcount/customController.pageCount);
            customModel.getAllCustom(params).then(data=>{
                console.log("定制",data);
                 let url=req._parsedOriginalUrl.pathname.split("/");
                let urlpath=parseInt(url[url.length-1]);
                console.log(urlpath);
                resp.render("customMade",{list:data,totalcount:result,urlpath:urlpath})
            }).catch((err)=>{
                console.log(err.message)
            })

        })

    },
    updatezht(req,resp){
        let custom_zht=req.body.custom_zht;
        let customid=req.body.custom_id;

        customModel.updatezht([custom_zht,customid]).then(data=>{
            resp.send(data);
            console.log(custom_zht,customid)
        })

    }
}

module.exports=customController;