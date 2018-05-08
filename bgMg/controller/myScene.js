const dbpool=require('../config/dbpoolConfig');
const sceneDao=require("../dao/mysSceneDao");


const myScene={
    pageCount:5,
    /*自加载*/
    getScene(req,resp){
        let params=[];

        let a=req.params.pg;



        params.push(parseInt(req.params.pg-1)*myScene.pageCount);
        params.push(myScene.pageCount);

        sceneDao.scenePage().then(total=>{
            let result=Math.ceil(total[0].a/myScene.pageCount);

            sceneDao.getAllScene(params).then(data=>{
                resp.render("lampSceneLoad",{loadScene:data,pg:a,totalPage:result})
            })

        })

    },

    //跳转新增页面
    getAdd(req,resp){
        resp.render("lampSceneAdd",{})
    },

    //跳转修改页面
    getUp(req,resp){
        sceneDao.getDan([req.query.id]).then(data=>{
            resp.render("lampSceneUpdate",{list:data})
        })
    },

    //新增
    addScene(req,resp){
        let path=req.file.filename;
        sceneDao.getAdd([null,req.body.name,path]).then(data=>{
            resp.redirect("lampSceneLoad");
        })
    },

    /*删除*/
    delScene(req,resp){
        let scene_id=req.query.scene_id;
        sceneDao .getDelScene([scene_id]).then(data=>{
            sceneDao.getAllScene([req.query.scene_id,req.query.name,req.query.scene_img]).then(data=>{
                resp.send(data);
            })
        })
    },

    //修改

    upAll(req,resp){
        let path;
        let path1=req.body.img;
        console.log("ago",path1);
        if(req.file==undefined){
            path=path1;
        }else{
            path=req.file.filename;
        }
        sceneDao.getUp([req.body.name,path,req.body.id]).then(data=>{
            resp.redirect("lampSceneLoad");
        })
    },



};

module .exports=myScene;