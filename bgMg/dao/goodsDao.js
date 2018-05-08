const dbpool=require('../config/dbpoolConfig');

const goodsManager={
    getPages(){
        return new Promise((resolve,reject)=>{
            let sql="SELECT COUNT(*) AS total FROM yd_goods";
            dbpool.connect(sql,[],(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    getAllGoods(parmse){

        return new Promise((resolve,reject)=>{

            let arr=[]
            let sql="SELECT a.goods_id,a.name,a.price,a.sale_number,a.repertory,a.type,b.assort_name,c.name as scene,a.status " +
                "FROM yd_goods AS a,yd_assortment AS b,yd_scene AS c " +
                "WHERE a.goods_sort=b.assort_id AND a.scene=c.scene_id";

            if(parmse[0]!=""){
                sql+=" and a.type=?";
                arr.push(parmse[0]);
                // console.log(arr)
            }
            if(parmse[1]!=""){
                sql+=" and a.goods_sort=?"
                arr.push(parmse[1]);
                // console.log(arr)
            }
            if(parmse[2]!=""){
                sql+=" and a.scene=?"
                arr.push(parmse[2]);
                // console.log(arr)
            }
            sql+=" ORDER BY goods_id";
            sql+=" limit ?,?";

            arr.push(parmse[3]);
            arr.push(parmse[4]);

            // console.log(sql);
            dbpool.connect(sql,arr,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    getAllpinlei(){
        return new Promise((resolve,reject)=>{
            let sql="SELECT * FROM yd_assortment";
            dbpool.connect(sql,[],(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    getChangjing(){
        return new Promise((resolve,reject)=>{
            let sql="SELECT * FROM yd_scene";
            dbpool.connect(sql,[],(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    addGoods(parmse){
        return new Promise((resolve,reject)=>{
            let sql="INSERT INTO yd_goods VALUES(NULL,?,?,?,?,?,'2015-5-5',DEFAULT,?,?,?,null,null,?,DEFAULT)";
            dbpool.connect(sql,parmse,(err,data)=>{
                if(!err){
                    console.log(sql);
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    savaRetu(parmse){
        return new Promise((resolve,reject)=>{
            let sql="UPDATE yd_goods SET goods_hot_img=? WHERE goods_id=?";
            dbpool.connect(sql,parmse,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    savaZhutu(parmse){
        return new Promise((resolve,reject)=>{
            let sql="UPDATE yd_goods SET goods_img=? WHERE goods_id=?";
            dbpool.connect(sql,parmse,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    getGoodsById(parmse){
        return new Promise((resolve,reject)=>{
            let sql="SELECT * FROM yd_goods WHERE goods_id=?";
            dbpool.connect(sql,parmse,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    updataGoods(parmse){
        return new Promise((resolve,reject)=>{
            let sql="UPDATE yd_goods SET NAME=?,info=?,price=?,scene=?,TYPE=?,repertory=?,goods_sort=?,goods_par=?,goods_text=? WHERE goods_id=?";
            dbpool.connect(sql,parmse,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    //批量上架
    shangjiaAll(parmse){
        return new Promise((resolve,reject)=>{
            let sql="UPDATE yd_goods SET STATUS=1 WHERE goods_id IN (";
            for(var i=0;i<parmse.length;i++){
                sql+="?,"
            }
            console.log(sql);
            sql=sql.substring(0,sql.length-1);
            sql+=")";
            console.log(sql);
            dbpool.connect(sql,parmse,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    //批量下架
    xiajiaAll(parmse){
        return new Promise((resolve,reject)=>{
            let sql="UPDATE yd_goods SET STATUS=0 WHERE goods_id IN (";
            for(var i=0;i<parmse.length;i++){
                sql+="?,"
            }
            console.log(sql);
            sql=sql.substring(0,sql.length-1);
            sql+=")";
            console.log(sql);
            dbpool.connect(sql,parmse,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    }

};

module.exports=goodsManager;