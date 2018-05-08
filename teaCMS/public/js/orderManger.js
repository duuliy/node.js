/**
 * Created by Administrator on 2017/11/14 0014.
 */
//详情数据
var params = [];
var params1;
document.onkeydown = function(e) {
    var e = window.event || arguments[0];
    if (e.keyCode == 13) {
        searchOrder();
    }
};
//页面数据的展示
function getLitieData(data){
    $("#content").html("");
    for(var key=0;key<data.length;key++) {
        var order_pay, order_condition, order_bill, order_status;
        if (data[key].order_pay == 1) {
            order_pay = "已完成"
        } else {
            order_pay = "未支付"
        }
        if (data[key].order_status == 0) {
            order_status = "未发货"
        } else {
            order_status = "已发货"
        }
        $("#content").append("<tr><td>"+data[key].order_id+"</td>" +
        "<td>"+data[key].user_name+"</td>" +
        "<td>"+data[key].order_time.substring(0,10)+"</td>" +
        "<td>"+order_pay+"</td>" +
        "<td>"+order_status+"</td>" +
        "<td onclick='getRow("+data[key].order_id+")'><button data-toggle='modal' class='btn btn-primary btn-lg' data-target='#detialModal' onclick='getMore("+data[key].order_id+")'>详情</button>" +
        "<button class='btn btn-default btn-lg' data-toggle='modal' data-target='#updateMess'>修改</button></td>" +
        "</tr>")
    }

}


var  rowNum ;
function getRow(index){
    rowNum = index;
}
//查看详情
function getMore(index){
    rowNum = index;
    console.log("row",rowNum);
    $.ajax({
        type:"post",
        url:"/getProImg.do",
        data:{
            order_id:rowNum
        },
        success:function(data){
            console.log(" in data ");
            console.log(data);
            getData(params[0],rowNum);
            getProMess(data,rowNum);

        }
    })
}

//详情里面的商品信息
function getProMess(data,num){
    for(var i = 0;i<data.length;i++){
        if(data[i].order_id==num){
            $("#detailMess").append("<p>" +
                "<p><span>商品名 :</span><span>"+data[i].pro_name+"</span></p>" +
                "<p><span>商品规格 :</span><span>"+data[i].pro_size+"</span></p>" +
                "</p>"
            )
        }
    }
}
function getData(data,num){
    $("#detailMess").html("");
    console.log("data",data.length);
    for(var key=0;key<data.length;key++){
        console.log("order_id",data[key].order_id);
        if(data[key].order_id==num){
            var order_pay,order_condition,order_bill,order_status;
            if(data[key].order_pay==1){
                order_pay = "已完成"
            }else{
                order_pay = "未支付"
            }
            if(data[key].order_condition==1){
                order_condition = "存活"
            }else{
                order_condition = "死亡"
            }
            if(data[key].order_bill==0){
                order_bill = "不开发票"
            }else{
                order_bill = "开发票"
            }
            if(data[key].order_status==0){
                order_status = "未发货"
            }else{
                order_status = "已发货"
            }
            $("#detailMess").append("<p> <span>订单号:</span><span>"+data[key].order_id+"</span></p>"+
                "<p><span>用户名:</span><span>"+data[key].user_name+"</span></p>"+
                "<p><span>发货时间:</span><span>"+data[key].order_send_time.substring(0,10)+"</span></p>"+
                "<p><span>下单时间:</span><span>"+data[key].order_time.substring(0,10)+"</span></p>"+
                "<p><span>留言:</span><span>"+data[key].order_message+"</span></p>"+
                "<p><span>送货方式:</span><span>"+data[key].order_postmethod+"</span></p>"+
                "<p><span>支付方式:</span><span>"+data[key].order_paymethod+"</span></p>"+
                "<p><span>收货人姓名:</span><span>"+data[key].order_receivername+"</span></p>"+
                "<p><span>是否开发票:</span><span>"+order_bill+"</span></p>"+
                "<p><span>收货地址:</span><span>"+data[key].order_addr+"</span></p>"+
                "<p><span>支付状态:</span><span>"+order_pay+"</span></p>"+
                "<p><span>收发货状态:</span><span>"+order_status+"</span></span></p>"+
                "<p><span>订单总价:</span><span>"+data[key].order_price+"</span></p>"+
                "<p><span>生存状态:</span><span>"+order_condition+"</span></p>"+
                "<p><span>备注:</span><span>"+data[key].order_remark+"</span></p>"+
                "<p><span>包装图案:</span><span><img src='"+data[key].pack_img_url+"' alt=''/></span></p>"
            )
        }

    }
}
var nowPage = 1,countPage;
//页面加载时获取所有数据
function getAllData(){
    $.ajax({
        type:"post",
        data:{
            nowPagec:nowPage
        },
        url:"/getOrderMess.do",
        success:function(data) {
            getLitieData(data);
            params = [];
            params1 =data;
            params.push(params1);
        }
    });
}
$(function(){
    getAllData();
});
//搜索订单
function searchOrder(){
    nowPage=1;
    zz();
};

function zz(){
    $.ajax({
        type:"post",
        url:"/searchOrder.do",
        data:{
            username:$("#username").val(),
            orderNum:$("#orderNum").val(),
            nowPagec:nowPage
        },
        success:function(data){
            $("#content").html("");
            getLitieData(data);
            totalPage();
            params = [];
            params1 =data;
            params.push(params1);
        }
    })
}

window.onload = totalPage;
//总页数
function totalPage(){
    $.ajax({
        url:"getTotalPage.do",
        data:{
            username:$("#username").val(),
            orderNum:$("#orderNum").val(),
            nowPage:nowPage
        },
        success:function(data){
            $("#li").html("");
            var mount=data+1;
            if(mount>4){
                mount = nowPage+4;
            }
            var mypage = nowPage;
            if(mount>countPage){
                mount=countPage+1;
                mypage=countPage-3;
                if(mypage<1){
                    mypage=1;
                    mount=5
                }
                if(data<5){
                    mypage=1;
                    mount=data+1;
                }
            }
            for(var i = mypage ;i<mount;i++){
                $("#li").append("<span><a onclick='herf(this)'>"+i+"</a></span>")
            }
            countPage=data;
            if(data==0){
                countPage=1;
                $("#counP").html("当前为0/0页");
            }else{
                $("#counP").html("当前为"+nowPage+"/"+countPage+"页");
            }
        }
    })
}
//上一页
function prevPage(){
    if(nowPage>1){
        nowPage--;
        if(nowPage<0){
            nowPage=1;
        }
        $("#counP").html("当前为"+nowPage+"/"+countPage+"页");
        zz();
        totalPage();
    }
}
//下一页
function nextPage(){
    if(countPage!=1){
        nowPage++;
        if(nowPage>countPage){
            nowPage=countPage;
        }
        $("#counP").html("当前为"+nowPage+"/"+countPage+"页");
        zz();
        totalPage();
    }
}
//更改收发货状态
function saveSendThing(){
    var sendSave = $("#updateMessS option:selected").text();
    var  order_statusV = $("#updateMessS").attr("value");
    var order_status;
    if(sendSave=="未发货"){
        order_status=0;
    }
    else{
        order_status=1;
    }
    $.ajax({
        type:"get",
        url:"/saveSendThing.do",
        data:{
            order_status:order_status,
            order_idS:rowNum
        },
        success:function(data){
            $("#succMess").html(data);
            getAllData();
        }
    })

}
//链接跳转
function herf(obj){
    if(countPage!=1){
        nowPage= obj.innerText;
        zz();
        totalPage();
        $("#counP").html("当前为"+nowPage+"/"+countPage+"页");
    }
}