/**
 * Created by Administrator on 2017/11/13.
 */
    //ģ������
    const guigDao =require("../dao/guigDao");

const guigConstroller ={
    pageCount:5,
    //================================================����
    getAllguige(req,resp){
           let params=[];
            params.push((req.params.page-1)*guigConstroller.pageCount);
            params.push(guigConstroller.pageCount);
        //console.log(req.params.page);
        console.log(params);
        guigDao.getTotalPage().then((data)=>{
                let result = Math.ceil(data[0].totalcount/guigConstroller.pageCount);
            guigDao.getAllguig(params).then((data)=>{
                    resp.render("standards",{list:data,totalCount:result,urlpath:parseInt(req.params.page)});
        }).catch((err)=>{
            console.log(err.message);
            resp.send(err);
        });
        });
    },
    updateGuige(req,resp){
        let id=req.query.id;
        guigDao.updateGuige(id).then((data)=>{
            resp.render("standardsUpdate",{resave:data});
        }).catch((err)=>{
            console.log(err.message);
            resp.send(err);
        });


    },
    updateGuige2(req,resp){
        let id=req.body.guiGid;
        let size=req.body.size;
            params=[size,id];
            //console.log(params);
            guigDao.updateGuige2(params).then((data)=>{
                resp.send(data);
            }).catch((err)=>{
                console.log(err.message);
                resp.send(err);
            });
        },
    addguige(req,resp){
            resp.render("standardsAdd");
    },
    addGuige2(req,resp){
        let size=req.body.size;
        guigDao.addGuige2(size).then((data)=>{
            resp.send(data);
        }).catch((err)=>{
            console.log(err.message);
            resp.send(err);
        });
    },
    deleteGuige(req,resp){
        let id=req.body.id;
        guigDao.deleteGuige(id).then((data)=>{
            resp.send(data);
        }).catch((err)=>{
            console.log(err.message);
            resp.send(err);
        });
    }

};
module .exports=guigConstroller ;