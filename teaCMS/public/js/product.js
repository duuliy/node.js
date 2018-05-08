/**
 * Created by ZXW on 2017/11/15.
 */
function getData(data){
    $("#content").html("");
    for(var key=0;key<data.length;key++){
        var pro_condition,pro_img_status,pro_img_condition,pro_text_condition;
        if(data[key].pro_condition==1){
            pro_condition = "上架"
        }else{
            pro_condition = "下架"
        }
        if(data[key].pro_img_status==1){
            pro_img_status = "商品展示使用"
        }else{
            pro_img_status = "商品详情页面使用"
        }
        if(data[key].pro_img_condition==0){
            pro_img_condition = "不使用"
        }else{
            pro_img_condition = "使用"
        }
        if(data[key].pro_text_condition==0){
            pro_text_condition = "不使用"
        }else{
            pro_text_condition = "使用"
        }
        $("#content").append("<tr> <td>商品编号</td><td>"+data[key].pro_id+"</td></tr>"+
            "<tr><td>商品类型</td><td>"+data[key].pro_type_name+"</td></tr>"+
            "<tr><td>商品名称</td><td>"+data[key].pro_name+"</td></tr>"+
            "<tr><td>商品库存量</td><td>"+data[key].pro_amount+"</td></tr>"+
            "<tr><td>商品单价</td><td>"+data[key].pro_price+"</td></tr>"+
            "<tr><td>商品折扣</td><td>"+data[key].pro_discount+"</td></tr>"+
            "<tr><td>商品规格</td><td>"+data[key].pro_size+"</td></tr>"+
            "<tr><td>商品成交量</td><td>"+data[key].pro_deal_amount+"</td></tr>"+
            "<tr><td>浏览次数</td><td>"+data[key].pro_look_amount+"</td></tr>"+
            "<tr><td>入库时间</td><td>"+data[key].pro_storetime+"</td></tr>"+
            "<tr><td>商品简介</td><td>"+data[key].pro_info+"</td></tr>"+
            "<tr><td>生存状态</td><td>"+pro_condition+"</td></tr>"+
            "<tr><td>商品图片</td><td><img src='"+data[key].pro_img_url+"' alt='' class='imagesize'/></td></tr>"+
            "<tr><td>商品图片状态</td ><td>"+pro_img_status+"</td></tr>"+
            "<tr><td>商品图片生存状态</td><td>"+pro_img_condition+"</td></tr>"+
            "<tr><td>商品文字描述内容</td><td>"+data[key].pro_text_discribe+"</td></tr>"+
            "<tr><td>商品图文生存状态</td><td>"+pro_text_condition+"</td></tr>"+
            "<tr>" +
            "<td><button class='edit' onclick='editData("+data[key].pro_id+")'>修改信息</button></td>" +
            "<td><button class='delete' onclick='deleteData("+data[key].pro_id+")'>删除</button></td>" +
            "</tr>"
        )
    }
}

var nowPage = 1,countPage;
function getAllData(){
    $.ajax({
        type:"post",
        data:{
            nowPagec:nowPage
        },
        url:"/getProductMess.do",
        success:function(data) {
            getData(data)
        }
    });
}
window.onload = getAllData;
function prevPage(){
    if(nowPage>=1){
        nowPage--;
        if(nowPage<=0){
            nowPage=1;
        }
        $("#counP").html("当前为"+nowPage+"/"+countPage+"页");
        getAllData();
    }
}
function nextPage(){
    nowPage++;
    if(nowPage>countPage){
        nowPage=countPage;
    }
    $("#counP").html("当前为"+nowPage+"/"+countPage+"页");
    getAllData();
}
$.ajax({
    type:"get",
    url:"/productNum.do",
    success:function(data){
        $("#productName").html("<option value='0'>商品名称</option>");
        $("#productNum").html("<option value='0'>商品编号</option>");
        for(var i = 0;i<data.length;i++){
            $("#productNum").append("<option value='"+i+1+"'>"+data[i].pro_id+"<option>");
            $("#productName").append("<option value='"+i+1+"'>"+data[i].pro_name+"<option>");
        }
    }
});

$.ajax({
    type:"get",
    url:"/productType.do",
    success:function(data){
        $("#productType").html("<option value='0'>商品种类</option>");
        for(var i = 0;i<data.length;i++){
            $("#productType").append("<option value='"+i+1+"'>"+data[i].pro_type_name+"<option>")
        }
    }
});
$(function(){
    totalPage();
});
function totalPage(){
    $.ajax({
        url:"getTotalPagePro.do",
        data:{
            productNum:$("#productNum option:selected").text(),
            productName:$("#productName option:selected").text(),
            productType:$("#productType option:selected").text(),
            nowPagec:nowPage
        },
        success:function(data){
            $("#li").html("");
            for(var i = 0 ;i<data;i++){
                $("#li").append("<span><a onclick='herf(this)'>"+(i+1)+"</a></span>")
            }
            countPage=data;
            if(data==0){
                $("#counP").html("当前为"+0+"/"+countPage+"页");
            }else{
                $("#counP").html("当前为"+nowPage+"/"+countPage+"页");
            }
        }
    })
}
function searchProduct(){
    nowPage=1;
    $.ajax({
        type:"post",
        url:"/searchProduct.do",
        data:{
            productNum:$("#productNum option:selected").text(),
            productName:$("#productName option:selected").text(),
            productType:$("#productType option:selected").text(),
            nowPagec:nowPage
        },
        success:function(data){
            $("#content").html("");
            console.log(data);
            getData(data);
            totalPage();
        }
    })
}
function herf(obj){
    console.log("111"+obj.innerText);
    nowPage= obj.innerText;
    $.ajax({
        type:"post",
        url:"/getProductMess.do",
        data:{
            nowPagec:nowPage
        },
        success:function(data) {
            console.log(data);
            getData(data);
            if(data==0){
                $("#counP").html("当前为"+0+"/"+countPage+"页");
            }else{
                $("#counP").html("当前为"+nowPage+"/"+countPage+"页");
            }
        }
    });
}

$("#addsure").on("click",function(){
    $.ajax({
        type:"post",
        url:"/addproduct.do",
        dataType:"json",
        data:{
            "proid":$("#proid").val().trim(),
            "protypeid":$("#protypeid").val().trim(),
            /*"protypename":$("#protypename").val().trim(),*/
            "proname":$("#proname").val().trim(),
            "proamout":$("#proamout").val().trim(),
            "proprice":$("#proprice").val().trim(),
            "prodiscount":$("#prodiscount").val().trim(),
            "prosize":$("#prosize").val().trim(),
            "prodealamout":$("#prodealamout").val().trim(),
            "prolookamout":$("#prolookamout").val().trim(),
            "prostoretime":$("#prostoretime").val().trim(),
            "proinfo":$("#proinfo").val().trim(),
            "procondition":$("#procondition").val().trim(),

            "proimgurl":$("#proimgurl").val().trim(),
            "proimgstatus": $("#proimgstatus").val().trim(),
            "proimgcondition":$("#proimgcondition").val().trim(),

            "protextdiscribe":$("#protextdiscribe").val().trim(),
            "protextcondition":$("#protextcondition").val().trim()
        },
        success:function(data) {
            if(data){
                console.log("增加商品成功!");
                window.location = "product.html";
            }
        }
    });
    $("#addModal").modal("hide");
});

var deleteIndex;
function deleteData(index){
    console.log("index:"+index);
    deleteIndex = index;
    $("#deleteModal").modal("show");
}

$("#deletesure").click(function() {
    //alert(deleteIndex);
    $.ajax({
        type: "post",
        url: "deleteproduct.do",
        dataType:"json",
        data:{"proid":deleteIndex},
        success:function(data){
            if(data){
                console.log("删除成功！");
                window.location = "product.html";
            }
        }
    });
     $("#deleteModal").modal("hide");
});

//修改信息的初始化加载
var editIndex;
function editData(index){
    editIndex = index;
    $("#editModal").modal("show");
    $.ajax({
        type: "post",
        url: "loadeditproduct.do",
        dataType:"json",
        data:{"editproid":editIndex},
        success:function(data){
            if(data){
                   $("#proid2").val(data[0].pro_id);
                   $("#protypeid2").val(data[0].pro_type_id);
                   $("#proname2").val(data[0].pro_name);
                   $("#proamout2").val(data[0].pro_amount);
                   $("#proprice2").val(data[0].pro_price);
                   $("#prodiscount2").val(data[0].pro_discount);
                   $("#prosize2").val(data[0].pro_size);
                   $("#prodealamout2").val(data[0].pro_deal_amount);
                   $("#prolookamout2").val(data[0].pro_look_amount);
                   $("#prostoretime2").val(data[0].pro_storetime);
                   $("#proinfo2").val(data[0].pro_info);
                   $("#procondition2").val(data[0].pro_condition);

                   $("#proimgurl2").val(data[0].pro_img_url);
                   $("#proimgstatus2").val(data[0].pro_img_status);
                   $("#proimgcondition2").val(data[0].pro_img_condition);

                   $("#protextdiscribe2").val(data[0].pro_text_discribe);
                   $("#protextcondition2").val(data[0].pro_text_condition);
            }
        }
    });
}
$("#editsure").click(function() {
    //alert(deleteIndex);
    $.ajax({
        type: "post",
        url: "editproduct.do",
        dataType:"json",
        data:{"editproid":editIndex,
            "proid":$("#proid2").val().trim(),
            "protypeid":$("#protypeid2").val().trim(),
            "proname":$("#proname2").val().trim(),
            "proamout":$("#proamout2").val().trim(),
            "proprice":$("#proprice2").val().trim(),
            "prodiscount":$("#prodiscount2").val().trim(),
            "prosize":$("#prosize2").val().trim(),
            "prodealamout":$("#prodealamout2").val().trim(),
            "prolookamout":$("#prolookamout2").val().trim(),
            "prostoretime":$("#prostoretime2").val().trim(),
            "proinfo":$("#proinfo2").val().trim(),
            "procondition":$("#procondition2").val().trim(),

            "proimgurl":$("#proimgurl2").val().trim(),
            "proimgstatus": $("#proimgstatus2").val().trim(),
            "proimgcondition":$("#proimgcondition2").val().trim(),

            "protextdiscribe":$("#protextdiscribe2").val().trim(),
            "protextcondition":$("#protextcondition2").val().trim()
        },
        success:function(data){
            if(data){
                console.log("修改成功！");
                window.location = "product.html";
            }
        }
    });
    $("#editModal").modal("hide");
});

