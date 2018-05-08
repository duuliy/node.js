const dbpool=require("../config/dbpoolConfig.js");
const customModel={
    getAllCustom(params){
        return new Promise((resolve,reject)=>{
            let sql="SELECT custom_made_id,u_name,custom_phone,custom_mail,custom_address,custom_text,yd_scene.name AS scene_name,all_act,yd_goods.name AS goods_name,custom_zht FROM yd_custom_made JOIN yd_scene ON yd_custom_made.scene_id=yd_scene.scene_id JOIN yd_goods ON yd_custom_made.goods_id=yd_goods.goods_id JOIN yd_user ON yd_custom_made.user_id=yd_user.user_id limit ?,?";
            dbpool.connect(sql,params,
                (err,data)=>{
                    resolve(data);
                }
            )
        })
    },
    getTotalCount(){
        return new Promise((resolve,reject)=>{
            dbpool.connect("SELECT COUNT(*) AS totalcount FROM yd_custom_made",[],
                (err,data)=>{
                    resolve(data);
                }
            );

        })
    },
    updatezht(params){
        return new Promise((resolve,reject)=>{
            let sql="UPDATE yd_custom_made SET custom_zht=? WHERE custom_made_id =?";
            dbpool.connect(sql,params,
                (err,data)=>{
                    resolve(data);

                }
            )
        })
    }
}

module.exports=customModel;
