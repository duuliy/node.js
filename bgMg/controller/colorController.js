const dbpool=require("../config/dbpoolconfig");
const colorModel=require("../dao/colorDao");

const colorController= {
    pageCount:5,
    getAllColor(req, resp){

        let params=[];
        params.push((req.params.page-1)*colorController.pageCount);
        params.push(colorController.pageCount);
        colorModel.getTotalCount().then(data=>{
            // console.log("count",data)
            let result=Math.ceil(data[0].totalcount/colorController.pageCount);
            colorModel.getAllColor(params).then(info=>{
                let url=req._parsedOriginalUrl.pathname.split("/");
                let urlpath=parseInt(url[url.length-1]);
                console.log(urlpath)
                resp.render("color",{list:info,totalcount:result,urlpath:urlpath})
            })
        })
    },
    addcolor(req, resp){
        colorModel.addColor([req.query.colorName]).then(data=>{
            resp.redirect("/color")
        })
    },
    deletecolor(req,resp){
      colorModel.deleteColor([req.body.colorid]).then(data=>{
          resp.send(data);
      })
    },
    getcolor(req,resp){
        let colorid=req.query.id;
        console.log("id=",colorid)
        colorModel.getcolor([colorid]).then(data=>{
            resp.render("colorUpdate",{mydata:data});
        }).catch((err)=>{
            resp.send(err);
        })
    },
    updateColor(req,resp){
        let colorname=req.body.name;
        let colorid=req.body.colid;


        console.log(colorname+colorid)

        colorModel.updatecolor([colorname,colorid]).then(data=>{
            console.log(data)
            resp.send(data);
        }).catch((err)=>{
            resp.send(err);
        })

    }/*,
    getPageColor(req,resp){
        console.log("222222")


    }*/
}
module.exports=colorController;