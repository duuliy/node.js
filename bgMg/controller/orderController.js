const orderModel = require("../dao/orderDao");


const orderController = {
    pageCount:5,
    getOrder(req,resp){
        let params=[];
        let list={};
        params.push(parseInt(req.params.pg-1)*orderController.pageCount);
        params.push(orderController.pageCount);
        orderModel.orderPage().then(total=>{
            let result=Math.ceil(total[0].a/orderController.pageCount);
            let url = req._parsedOriginalUrl.pathname.split("/");
            let pathUrl = parseInt(url[url.length-1]);
            orderModel.getOrder(params).then(data=> {
                resp.render("order", {list: data,totalPage:result,pathUrl:pathUrl});
            })
        })
    },
    changeOrder(req,resp){
        let order_id = req.query.order_id;
        let is_send = req.query.is_send;
        if(is_send==1){
            is_send=0
        }else{
            is_send=1
        }

        orderModel.changeUser([is_send,order_id]).then((data)=>{
            resp.send(data);
        }).catch((err)=>{
            console.log(err.message);
        })
    }
};

module.exports=orderController;