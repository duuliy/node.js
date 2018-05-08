/**
 * Created by a on 2017/11/17.
 */
const viewModal=require("../dao/threeDAO");
const dbpool = require("../config/dbconfig");
const threeDcontroller= {
    showthreeD(req,res){
        "use strict";
        viewModal.show(function (err, data) {
            if (err) {
                res.send("数据出错");
            } else {
                res.render("threeD", {"data": data,admin:"admin"});
            }
        })
    },
    starthreeD(req,res){
        var t_id=req.query.id;
        function myResponse(err,data){
            if (data != undefined) {
                res.send(data);
                if (err) {
                    res.end(err.message)
                }
            } else {
                res.end(err.message);
            }
        }
        viewModal.star([t_id]).
        then(myResponse) //resolved
            .catch(function(err){  //异常捕获 catch rejected
                console.log(err)
                myResponse(err)
            })
    },
    stopthreeD(req,res){
        var app_id=req.query.id;
        function myResponse(err,data){
            res.send(data);
            if (data != undefined) {
                if (err) {
                    res.end(err.message)
                }
            } else {
                res.end(err.message);
            }
        }
        viewModal.stop([app_id]).
        then(myResponse) //resolved
            .catch(function(err){  //异常捕获 catch rejected
                myResponse(err)
            })
    },
    searchthreeD(req,res){
        var t_name=req.body.t_name||"";
        var d_id=req.body.d_id||"";
        let sql="SELECT a.*,b.d_id,c.a_id FROM t_threeD a LEFT JOIN t_designer b ON a.d_id=b.d_id LEFT JOIN t_admin c ON a.a_id=c.a_id WHERE 1=1";
        let params=[];
        if(t_name!=""){
            sql+=" and t_name like ?";
            t_name="%"+t_name+"%";
            params.push(t_name);
        }
        if(d_id!=""){
            sql+=" and b.d_id like ?";
            d_id="%"+d_id+"%";
            params.push(d_id);
        }
        dbpool.connect(sql,params,(err,data)=>{
            if(data!=undefined){
                if(data.length>0){
                    res.send(data);
                }else{
                    res.end("erro");
                }
            }else{
                res.end(err.message);
            }
        })
    },
    //修改
    revisethreeD(req,res){
        var t_id=req.body.addInputnum2;
        var t_name=req.body.addInputName2;
        var t_img=req.body.addInputFile2;
        var d_id=req.body.addInputtime2;
        var t_detail=req.body.addroomProduct2;
        function myResponse(err,data){
            res.send(data);
            if (data != undefined) {
                if (err) {
                    res.end(err.message)
                }
            } else {
                res.end(err.message);
            }
        }
        viewModal.revise([t_name,t_img,d_id,t_detail,t_id]).
        then(myResponse)
            .catch(function(err){
                myResponse(err)
            })
    },
    //新增
    addthreeD(req,res){
        var t_id=req.body.addInputnum33;
        var t_name=req.body.addInputName33;
        var t_img=req.body.addInputFile33;
        var d_id=req.body.addInputtime33;
        var t_detail=req.body.addroomProduct33;
        var default2="2017-11-18";
        function myResponse(err,data){
            res.send(data);
            if (data != undefined) {
                if (err) {
                    res.end(err.message)
                }
            } else {
                res.end(err.message);
            }
        }
        viewModal.add([null,t_name,t_img,d_id,t_detail,default2,22,1]).
        then(myResponse)
            .catch(function(err){
                myResponse(err)
            })
    },
    //标签系列
    revisetags(req,res){
        var g_t_id=req.body.addInputnum5;
        var t_id=g_t_id;
        var t_id2=req.body.addInputName5;
        var t_space_id=req.body.addInputFile5;
        var t_room_id=req.body.addInputtime5;
        var t_map_id=req.body.addInputmap5;
        function myResponse(err,data){
            console.log(data)
            res.send(data);
            if (data != undefined) {
                if (err) {
                    res.end(err.message)
                }
            } else {
                res.end(err.message);
            }
        }
        viewModal.revisetag([t_id,t_id2,t_space_id,t_room_id,t_map_id,g_t_id]).
        then(myResponse)
            .catch(function(err){
                myResponse(err)
            })
    },
    styleoption(req,res){
        var g_t_id=req.body.g_t_id;
        function myResponse(data){
            res.send(data);
        }
        viewModal.style([g_t_id]).
        then(myResponse)
            .catch(function(err){
                myResponse(err)
            })
    },
    spaceoption(req,res){
        var g_t_id=req.body.g_t_id;
        function myResponse(data){
            res.send(data);
        }
        viewModal.space([g_t_id]).
        then(myResponse)
            .catch(function(err){
                myResponse(err)
            })
    },
    roomoption(req,res){
        var g_t_id=req.body.g_t_id;
        function myResponse(data){
            res.send(data);
        }
        viewModal.room([g_t_id]).
        then(myResponse)
            .catch(function(err){
                myResponse(err)
            })
    },
    mapoption(req,res){
        var g_t_id=req.body.g_t_id;
        function myResponse(data){
            res.send(data);
        }
        viewModal.map([g_t_id]).
        then(myResponse)
            .catch(function(err){
                myResponse(err)
            })
    },
    //商品系列
    showgoods(req,res){
        var t_id=req.body.t_id;
        function myResponse(data){
            res.send(data);
        }
        viewModal.goods([t_id]). then(myResponse)
            .catch(function(err){
                myResponse(err)
            })
    }
}
module .exports=threeDcontroller