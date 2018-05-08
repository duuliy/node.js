const dbpool=require('../config/dbpoolConfig');
const sceneDao=require("../dao/sceneDao");



const sceneController={
    pageCount:5,

    /*页面自加载*/
    getScene(req,resp){

        let params=[];

        params.push(parseInt(req.params.pg-1)*sceneController.pageCount);
        params.push(sceneController.pageCount);

        sceneDao.scenePage().then(total=>{
            let result=Math.ceil(total[0].a/sceneController.pageCount);

            sceneDao.getAllScene(params).then(data=>{
                resp.render("lampSceneLb",{addScene:data,totalPage:result})
            })


        })

    },

    /*新增判断修改和新增*/
    getSceneForm(req,resp){
        let a=[{
            scene_id:"",
            name:""
        }];
        if(req.query.id==undefined){
            resp.render("lampSceneForm",{list:a})
        }else{
            sceneDao.getDan([req.query.id]).then(data=>{
                resp.render("lampSceneForm",{list:data})
            })
        }
    },

    /*删除*/
    delScene(req,resp){
        let scene_id=req.query.scene_id;
        sceneDao .getDelScene([scene_id]).then(data=>{
            //resp.send("lampSceneLb");
            sceneDao.getAllScene([req.query.scene_id,req.query.name]).then(data=>{
                //resp.redirect("lampSceneLb")
                resp.send(data);

            })

        })
    },

    /*保存判断新增和修改*/
    saveScene(req,resp){
        let saveB=req.body.saveB;
        //console.log("控制层",saveB);

        if(req.body.saveB==undefined) {
            //console.log("add");//新增
            sceneDao.getAddScene([null,req.body.name]).then(data=>{
                    resp.send(data);
            })

        }
        else{
            //console.log("update");//编辑
            console.log("name=",req.body.name);
            sceneDao.getUpScene([req.body.name,saveB]).then(data=>{
                resp.send(data);
            })
        }
    },



};


module.exports=sceneController;

