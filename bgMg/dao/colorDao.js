const dbpool=require("../config/dbpoolConfig.js");

const colorModel={
    getAllColor(params){
        return new Promise((resolve,reject)=>{
            let sql="select * from yd_color limit ?,?";
            dbpool.connect(sql,params,
                (eer,data)=>{
                   resolve(data);
                })
        })
    },
    addColor(params){
      return new Promise((resolve,reject)=>{
          dbpool.connect("insert into yd_color values(null,?)",params,
              (err,data)=>{
                  resolve(data);
              }
          )
      })

    },
    deleteColor(params){

        return new Promise((resolve,reject)=>{
            dbpool.connect("DELETE FROM yd_color WHERE color_id=?",params,
                (err,data)=>{
                    resolve(data);
                    console.log("11111")
                }
            )

        })


    },
    getcolor(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("select * from yd_color where color_id=? ",params,
                (err,data)=>{
                    if(!err){
                        resolve(data);
                    }else{
                        reject(err);
                    }

                }
            )

        })
    },
    updatecolor(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("UPDATE yd_color SET NAME=? WHERE color_id=? ",params,
                (err,data)=>{
                   resolve(data);
                    console.log(data);
                }
            )
        })
    },
    getTotalCount(){
        return new Promise((resolve,reject)=>{
            dbpool.connect("select count(*) as totalcount from yd_color",[],
                (err,data)=>{
                    resolve(data);
                }
            )
        })
    }
}
module.exports=colorModel;

