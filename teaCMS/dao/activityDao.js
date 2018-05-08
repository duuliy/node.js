/**
 * Created by SDL on 2017/11/14 0014.
 */

const db = require("../config/sqlConfig.js");
const activityDao = {
    activityQuery(sql,params){
        return new Promise(function(resolve,reject){
            db.connect(sql,params,(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })

    }

};
module .exports = activityDao;