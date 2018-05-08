const dbpool=require("../config/dbpoolConfig");

const addressDao={
    getAlladress(){
        return new Promise((resolve,reject)=> {
            dbpool.connect("select * from yd_address",[],(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    insertAdress(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("insert into yd_address values(?,?)",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err);
                }
            })
        })
    },
    deleteAddress(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("delete from yd_address where address_id=?",params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else {
                    reject(err);
                }
            })
        })
    }
};

module.exports=addressDao;