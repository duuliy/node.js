
const Sequelize = require('sequelize');
const userModel = require("../dao/sequelizeDao");

const Op = Sequelize.Op
const filecontroller = {
    // //显示到页面
    getany(req, res) {
        userModel.findAll(
            {
                where: {
                    id: {
                        [Op.between]: [1, 10],
                    }
                }
            }
        ).then(data => {
            console.log(data)
            res.send(data)
        })
    },
    //增加
    addsome(req, res) {
        userModel.create({
            year: '2008-05-05',
            name: '小明',
            sex:1,
            position:'前台',
            Jurisdiction: '是',
            Blacklist: '否'
        }).then(data=>{
            console.log(data)
        }).catch( err =>{
            console.log(err);
        });
    },
    //删除
    deltesome(req, res) {
        userModel.destroy({
            where:{
                id:12
            }
        }).then( data=>{
            console.log(data)
        });
    },
    //查询
    querysome(req, res) {
        userModel.findAll({
            where:{
                name: 'duuliy',
            }
        }).then(data=>{
            res.send(data)
        }).catch( err =>{
            console.log(err);
        });
    },
    //修改
    upsome(req, res) {
        userModel.update({
            name: '飞天禽兽',
        },{
            where:{
                id:'2'
            }
        }).then(data=>{
            res.send(data)
        }).catch( err =>{
            console.log(err);
        });
    }
};




module.exports = filecontroller;