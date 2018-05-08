
const goodsDao=require("../dao/goodsDao");

const goodsModule={
    pageCount:5,
    getAllgoodsList(req,resp){
        //获取商品信息
        let arr=[];
        let leibie=req.body.leibie||"";
        let pinlei=req.body.pinlei||"";
        let changjing=req.body.changjing||"";
        arr.push(leibie);
        arr.push(pinlei);
        arr.push(changjing);
        // console.log("开始页",req.params.pg-1);
        console.log("path",req.path)
        if(req.path=="/getAllgoods"){
            arr.push(0);
        }else{
            arr.push(parseInt(req.params.pg-1)*goodsModule.pageCount);
        }

        arr.push(goodsModule.pageCount);
        let pg=req.params.pg;
        console.log("asdfasdf",pg)
        goodsDao.getPages().then((total)=>{
            let result=Math.ceil(total[0].total/goodsModule.pageCount);
            console.log("页数",result)
            goodsDao.getAllGoods(arr).then((data)=>{
                //获取品类信息
                goodsDao.getAllpinlei().then(data1=>{
                    //获取场景信息
                    goodsDao.getChangjing().then(data2=>{
                        // req.body.leibie==undefined&&req.body.pinlei==undefined&&req.body.changjing==undefined
                        if(req.path!="/getAllgoods"){
                            resp.render("goodsM",{list:data,pinlei:data1,changjing:data2,totalPage:result,pg:pg})
                        }else{
                            resp.send({list:data,pinlei:data1,changjing:data2})
                        }
                    })
                })
            })
        })
    },
    getAddgoodsPage(req,resp){

        let goodsId=req.url.split("?")[1]
        console.log("id=",goodsId)
        if(goodsId==undefined){//增加商品
            let list=[{
                goods_id: "",
                name: "",
                info: "",
                price: "",
                scene: "",
                type: "",
                add_date: "",
                sale_number: "",
                repertory: "",
                goods_sort: "",
                goods_par: "",
                goods_img: "",
                goods_hot_img: "",
                goods_text: "",
                status: "" }]
            goodsDao.getAllpinlei().then(data1=>{
                goodsDao.getChangjing().then(data2=>{
                    resp.render("goodsA",{pinlei:data1,changjing:data2,list:list});
                })
            })
        }else{//更新商品
            goodsId=parseInt(goodsId.split("=")[1]);
            goodsDao.getAllpinlei().then(data1=>{
                goodsDao.getChangjing().then(data2=>{
                    goodsDao.getGoodsById([goodsId]).then(data3=>{
                        resp.render("goodsA",{pinlei:data1,changjing:data2,list:data3});
                    })
                })
            })
        }
    },
    savaGoods(req,resp){
        let goodName=req.body.goodName;
        let goodInfo=req.body.goodInfo;
        let goodPrice=req.body.goodPrice;
        let leixing=req.body.leixing;
        let pinlei=req.body.pinlei;
        let changjing=req.body.changjing;
        let kucun=req.body.kucun;
        let canshu=req.body.canshu;
        let fuwenben=req.body.fuwenben;
        if(req.body.goodsId==undefined){
            goodsDao.addGoods([goodName,goodInfo,goodPrice,changjing,leixing,kucun,pinlei,canshu,fuwenben]).then((data)=>{
                console.log('控制层',data);
                resp.send(data);
            }).catch((err)=>{
                console.log(err.message);
            })
        }else {
            let goodsId = req.body.goodsId;
            goodsDao.updataGoods([goodName, goodInfo, goodPrice, changjing, leixing, kucun, pinlei, canshu, fuwenben, goodsId]).then(data=>{
                resp.send(data);
            })

        }

    },
    //保存热图
    savaRetu(req,resp){
        resp.send(req.file.filename)
        let path=req.file.path.split("public\\")[1]
        let url=path.replace("\\","/");
        console.log("控制层",url);
        goodsDao.savaRetu([url,req.body.goodsId]).then((data)=>{
            resp.send(data)
        }).catch((err)=>{
            console.log(err.message)
        })
    },
    //保存主图
    saveZhutu(req,resp){
        console.log('商品g',req.body.goodsId);
        console.log(req.files);
        let myArr = [];
        let path;
        let url;
        for (var i = 0; i < req.files.length; i++) {
            path=req.files[i].path.split("public\\")[1]
            url=path.replace("\\",'/');
            myArr.push(url);
        }
        let myArr1=myArr.toString();
        console.log(myArr1);
        goodsDao.savaZhutu([myArr1,req.body.goodsId]).then((data)=>{
            console.log(data);
            resp.send(data)
        }).catch((err)=>{
            console.log(err.message)
        })
    },
    //批量上架
    shangjiaAll(req,resp){
        let a=req.body.arr;
        let arr=a.split(",")
        goodsDao.shangjiaAll(arr).then(data=>{
            resp.send(data);
        })

    },
    xiajiaAll(req,resp){
        let a=req.body.arr;
        let arr=a.split(",")
        goodsDao.xiajiaAll(arr).then(data=>{
            resp.send(data);
        })
    }
};

module.exports=goodsModule;