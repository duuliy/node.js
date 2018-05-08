/**
 * Created by Administrator on 2017/11/15.
 */
const AssortmentDao=require("../dao/AssortmentDao");
const assortmentController={
    pageCount:5,
    /*getAllAssortment(req,resp){
        AssortmentDao.getAllAssortment().then((data)=>{
                resp.render("assortment",{list:data});
            }).catch((err)=>{
                console.log(err.message);
                resp.send(err);
            });
    },*/
    getAllAssortment(req,resp){
        let params=[];
        params.push((req.params.page-1)*assortmentController.pageCount);
        params.push(assortmentController.pageCount);
        //console.log(params);
        AssortmentDao.getTotalPage().then((data)=>{
            let result = Math.ceil(data[0].totalcount/assortmentController.pageCount);
            AssortmentDao.getAllAssortment(params).then((data)=>{
                resp.render("assortment",{list:data,totalCount:result,urlpath:parseInt(req.params.page)});
            }).catch((err)=>{
                console.log(err.message);
                resp.send(err);
            });
        });
    },
    AssortmentUpdate(req,resp){
        let assort_id=req.query.id;
        AssortmentDao.AssortmentUpdate(assort_id).then((data)=>{
            resp.render("assortmentUpdate",{resave:data});
        }).catch((err)=>{
            console.log(err.message);
            resp.send(err);
        });
    },
    AssortmentUpdate2(req,resp){
        let assortid=req.body.assortid;
        let assortname=req.body.assortname;
        let params=[assortname,assortid];
        //console.log(params);
        AssortmentDao.AssortmentUpdate2(params).then((data)=>{
            resp.send(data);
        }).catch((err)=>{
            console.log(err.message);
            resp.send(err);
        });
    },
    AssortmentAdd1(req,resp){
        AssortmentDao.AssortmentAdd1().then((data)=>{
            resp.render("assortmentAdd");
        }).catch((err)=>{
            console.log(err.message);
            resp.send(err);
        });
    },
    AssortmentAdd(req,resp){
        let assortname=req.body.assortname;
        let params=[assortname];
        console.log(params);
        AssortmentDao.AssortmentAdd(params).then((data)=>{
            resp.send(data);
        }).catch((err)=>{
            console.log(err.message);
            resp.send(err);
        });
    },
    AssortmentDelete(req,resp){
        let id = req.query.id;
        let params = [id];
        //console.log(params);
        AssortmentDao.AssortmentDelete(params).then((data)=> {
            resp.send(data);
        }).catch((err)=> {
            console.log(err.message);
            resp.send(err);
        });
    }
};
module.exports=assortmentController;