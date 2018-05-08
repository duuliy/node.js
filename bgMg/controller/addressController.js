const dbpool=require('../config/dbpoolConfig');
const addressDao=require("../dao/addressDao");
const addressC={
    getEjs(req,resp){
        console.log("hello");
        addressDao.getAlladress().then(data=>{
            if(data){
                resp.render("addressM",{list:data});
            }
        }).catch(err=>{
            console.log(err);
        })
    }
};

module.exports=addressC;