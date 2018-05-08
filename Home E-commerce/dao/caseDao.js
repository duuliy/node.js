
const mysql=require("mysql");
const database=require("../config/dbconfig");
const upload=require("../config/uploadconfig");
const caseDao={
    caseDao(){
        return new  Promise(function (resolve,reject) {
            database.connect("SELECT c_name as '案例名称',GROUP_CONCAT(g_name,'') AS '商品名称',t_d_case.c_img as '案例样品',d_name AS '设计师',t_d_case.createtime as '时间',t_d_case.d_detail as '案例介绍',a.t_name AS '案例标签',t_d_case.state as '状态' " +
                "FROM (t_d_case,t_designer,t_goods) " +
                "LEFT JOIN (SELECT * from t_tags) AS a ON a.a_id=t_d_case.a_id " +
                "WHERE t_d_case.d_id=t_designer.d_id AND t_d_case.a_id=t_goods.a_id " +
                "GROUP BY c_name",(err,data)=>{
                if(!err){
                    resolve(data)
                }else{
                    reject(err)
                }
            })
        })
    },
    //启用和禁用
    disableDao(name){
        database.connect("update t_d_case set state=0 where c_name=?",name,(err,data)=>{
            if(!err){
                console.log("成功")
            }else{
                console.log(err)
            }
        })
    },
    startDao(name){
        database.connect("update t_d_case set state=1 where c_name=?",name,(err,data)=>{
            if(!err){
                console.log("成功")
            }else{
                console.log(err)
            }
        })
    },
    //添加修改数据
    adddao(name,callback){
        var img="uploads/"+name[0]+"/"+name[1];
        database.connect("insert into t_d_case values(?,?,?,(select d_id from t_designer where d_name=?),(select t_id from t_tags where t_name=?),?,?,default)",
            [null,name[0],img,name[2],name[3],name[4],null],(err,data)=>{
                if(err){
                    console.log(err)
                }else{
                    callback(err,data)
                }
            });
    },
    modifydao(name,callback){
        var img="uploads/"+name[0]+"/"+name[1];
      database.connect("update t_d_case set c_name=?,c_img=?,d_id=(select d_id from t_designer where d_name=?),a_id=(select t_id from t_tags where t_name=?),d_detail=?,createtime=?,state=default where c_name=?",
           [name[0],img,name[2],name[3],name[4],null,name[0]],(err,data)=>{
            if(err){
                console.log(err)
            }else{
                callback(err,data);
                console.log("修改成功")
            }
          })
    },
    //设计师名称
    designerdao(){
        return new Promise(function (resolve,reject) {
            database.connect("select d_name from t_designer",(err,data)=>{
                if(!err){
                    resolve(data)
                }else{
                    reject(err)
                }
            })
        })
    },
    //标签名称
    labeldao(){
        return new Promise(function (resolve,reject) {
            database.connect("select t_name from t_tags",(err,data)=>{
                if(!err){
                    resolve(data)
                }else{
                    reject(err)
                }
            })
        })
    },
    //查询
    searchdao(name){
        var sql="SELECT c_name as '案例名称',GROUP_CONCAT(g_name,'') AS '商品名称',t_d_case.c_img as '案例样品',d_name AS '设计师',t_d_case.createtime as '时间',t_d_case.d_detail as '案例介绍',a.t_name AS '案例标签',t_d_case.state as '状态' " +
            "FROM (t_d_case,t_designer,t_goods) " +
            "LEFT JOIN (SELECT * from t_tags) AS a ON a.a_id=t_d_case.a_id " +
            "WHERE t_d_case.d_id=t_designer.d_id AND t_d_case.a_id=t_goods.a_id ";
        var arr=[];
        if(name!=""){
            sql+=" and c_name like ? GROUP BY c_name";
            name="%"+name+"%";
            arr.push(name);
        }else{
            sql+="GROUP BY c_name";
        }
        return new Promise(function (resolve,reject) {
            database.connect(sql,arr,(err,data)=>{
                if(!err){
                    resolve(data)
                }else{
                    reject(err)
                }
            })
        })
    },
    //分页
    getTotol(arr){
        return new Promise((resolve,reject)=>{
            var sql = 'select count(*) as myCount from '+"(SELECT c_name as '案例名称',GROUP_CONCAT(g_name,'') AS '商品名称',t_d_case.c_img as '案例样品',d_name AS '设计师',t_d_case.createtime as '时间',t_d_case.d_detail as '案例介绍',a.t_name AS '案例标签',t_d_case.state as '状态' " +
                "FROM (t_d_case,t_designer,t_goods) " +
                "LEFT JOIN (SELECT * from t_tags) AS a ON a.a_id=t_d_case.a_id " +
                "WHERE t_d_case.d_id=t_designer.d_id AND t_d_case.a_id=t_goods.a_id " +
                "GROUP BY c_name) as data";
            database.connect(sql,arr,(err,data)=>{
                resolve(data);
            })
        })
    },
    getData(arr){
        return new Promise((resolve,reject)=>{
            var sql = "SELECT c_name as '案例名称',GROUP_CONCAT(g_name,'') AS '商品名称',t_d_case.c_img as '案例样品',d_name AS '设计师',t_d_case.createtime as '时间',t_d_case.d_detail as '案例介绍',a.t_name AS '案例标签',t_d_case.state as '状态' " +
                "FROM (t_d_case,t_designer,t_goods) " +
                "LEFT JOIN (SELECT * from t_tags) AS a ON a.a_id=t_d_case.a_id " +
                "WHERE t_d_case.d_id=t_designer.d_id AND t_d_case.a_id=t_goods.a_id " +
                "GROUP BY c_name "+
                "LIMIT ?,?";
            database.connect(sql,arr,(err,data)=>{
                resolve(data);
            })
        })
    }


};
module.exports=caseDao;