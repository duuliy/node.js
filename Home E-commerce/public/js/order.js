function updateOrder() {
    var order_state=document.getElementById("query_order_state").value;
    var query_state=document.getElementById("query_state").value;
    var query_order_name=document.getElementById("query_order_name").value;
    myajax("get","updateOrder.do","order_state="+order_state+"&query_state="+query_state+"&query_order_name="+query_order_name,function () {
        window.location.href="order";
    }
)}

var mystatus = ["已取消","未付款","已付款","配送中","已签收","未评价","已完成"];

function selOrder() {
    var query_order_seluid=document.getElementById("query_order_seluid").value;
    var query_order_selstatus=document.getElementById("query_order_selstatus").value;
    console.log(query_order_seluid);
    console.log(query_order_selstatus);
    myajax("get","selOrder.do","seluid="+query_order_seluid+"&selstatus="+query_order_selstatus,function () {
        document.getElementById("list").innerHTML="";
        var data=JSON.parse(xhr.responseText);
        for(var i=0 in data){
            let str="";
            for(let j=0;j<mystatus.length; j++) {

                if(data[i].o_status==j) {
                    str+='<option value="'+j+'" selected>'+mystatus[j]+'</option>';
                } else {
                    str+='<option value="'+j+'">'+mystatus[j]+'</option>';
                }
            }

            document.getElementById("list").innerHTML='<form class="form-inline" id="form">'+
                '<div class="form-group magin_left" style="margin: 20px 20px 0 20px">'+
                '<label for="query_order_name">订单表id</label>'+
                '<input type="text" class="form-control" id="query_order_name" readonly  unselectable="on" value='+data[i].o_id+'>'+
                '</div>'+
                '<div class="form-group magin_left" style="margin: 20px 20px 0 20px">'+
                '<label for="query_order_ceg">用户表id</label>'+
                '<input type="text" class="form-control" id="query_order_ceg" readonly  unselectable="on" value='+data[i].u_id+'>'+
                '</div>'+
                '<div class="form-group magin_left" style="margin: 20px 20px 0 20px">'+
                '<label for="query_order_state">订单状态</label>'+
                '<select id="query_order_state" class="form-control">'+str+
                // '<option value="0">已取消</option>'+
                // '<option value="1">未付款</option>'+
                // '<option value="2" selected>已付款</option>'+
                // '<option value="3">配送中</option>'+
                // '<option value="4">已签收</option>'+
                // '<option value="5">未评价</option>'+
                // '<option value="6">已完成</option>'+
                '</select>'+
            '</div>'+
            '<div class="form-group magin_left" style="margin: 20px 20px 0 20px">'+
                '<label for="query_order_money">订单金额</label>'+
                '<input type="text" class="form-control" id="query_order_money" readonly  unselectable="on" value='+data[i].o_price+'>'+
                '</div>'+
                '<div class="form-group magin_left"  style="margin: 20px 20px 0 20px">'+
                '<label for="query_order_remark">订单备注</label>'+
                '<input type="text" class="form-control" id="query_order_remark" readonly  unselectable="on" value='+data[i].o_remark+'>'+
                '</div>'+
                '<div class="form-group magin_left"  style="margin: 20px 20px 0 20px">'+
                '<label for="query_order_addr">订单地址</label>'+
                '<input type="text" class="form-control" id="query_order_addr" readonly  unselectable="on" value='+data[i].addr_id+'>'+
                '</div>'+
                '<div class="form-group magin_left"  style="margin: 20px 20px 0 20px">'+
                '<label for="query_order_createtime">创建时间</label>'+
                '<input type="text" class="form-control" id="query_order_createtime" readonly  unselectable="on" value='+data[i].createtime+'>'+
                '</div>'+
                '<div class="form-group magin_left"  style="margin: 20px 20px 0 20px">'+
                '<label for="query_order_paytime">付款时间</label>'+
                '<input type="text" class="form-control" id="query_order_paytime" readonly  unselectable="on" value='+data[i].paytime+'>'+
                '</div>'+
                '<div class="form-group magin_left"  style="margin: 20px 20px 0 20px">'+
                '<label for="query_order_logis">物流单号</label>'+
                '<input type="text" class="form-control" id="query_order_logis" readonly  unselectable="on" value='+data[i].o_logis+'>'+
                '</div>'+
                '<div class="form-group magin_left" style="margin: 20px 20px 0 20px">'+
                '<label for="query_state">订单是否启用</label>'+
                '<select id="query_state" class="form-control">'+
                '<option value="1">启用</option>'+
                '<option value="0">禁止</option>'+
                '</select>'+
                '</div>'+
                '<div class="form-group magin_left" style="margin: 20px 20px 0 20px">'+
                '<label for="query_state"> <a href="orderGoods">订单商品详情</a></label>'+
                '<div class="btn btn-success" style="margin-left: 30px"  id="save">保存</div>'+
                '</div>'+
                '</form>';
        }
    })
}

$("#form").on('click','save',function () {
    updateOrder();
});