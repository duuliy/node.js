/**
 * Created by Administrator on 2017/11/14 0014.
 */

document.onkeydown = function(e) {
    var e = window.event || arguments[0];
    if (e.keyCode == 13) {
        searchOrder();
    }
};
var nowPage = 1,countPage;
function getAllData(){
    $.ajax({
        type:"post",
        url:"/getCustomMess.do",
        data:{
            nowPagec:nowPage
        },
        success:function(data) {
            getData(data)
        }
    });
}
function getData(data){
    $("#tbody").html("");
    console.log(data);
    for(var i = 0 ; i <data.length;i++){
        $("#tbody").append("<tr><td>"+data[i].user_id+"</td>" +
            "<td>"+data[i].user_name+"</td>" +
            "<td>"+data[i].user_sex+"</td>" +
            "<td>"+data[i].user_birth+"</td>" +
            "<td>"+data[i].user_tel+"</td>" +
            "<td>"+data[i].mycount+"</td>" +
            "</tr>")
    }

}
$(function(){
    getAllData();
});
function searchOrder(){
    console.log(1111);
    console.log($("#userNum").val());
    nowPage=1;
    $.ajax({
        type:"post",
        url:"/searchCustom.do",
        data:{
            username:$("#username").val(),
            userNum:$("#userNum").val(),
            user_tel:$("#user_tel").val(),
            nowPagec:nowPage
        },
        success:function(data){
            getData(data);
            totalPage();
        }
    })
}
window.onload = totalPage;
function totalPage(){
    $.ajax({
        url:"getTotalPageCustom.do",
        data:{
            username:$("#username").val(),
            userNum:$("#userNum").val(),
            user_tel:$("#user_tel").val(),
            nowPage:nowPage
        },
        success:function(data){
            countPage=data;
            $("#li").html("");
            for(var i = 0 ;i<data;i++){
                $("#li").append("<span><a onclick='herf(this)'>"+(i+1)+"</a></span>")
            }
            if(data==0){
                $("#counP").html("总共"+0+"/"+countPage+"页");
            }else{
                $("#counP").html("总共"+nowPage+"/"+countPage+"页");
            }
        }
    })
}
function prevPage(){
    if(nowPage>1){
        nowPage--;
        if(nowPage<0){
            nowPage=1;
        }
        $("#counP").html("当前为"+nowPage+"/"+countPage+"页");
        getAllData();
    }
}
function nextPage(){
    if(countPage!=1){
        nowPage++;
        if(nowPage>countPage){
            nowPage=countPage;
        }
        $("#counP").html("当前为"+nowPage+"/"+countPage+"页");
        getAllData();
    }
}

function herf(obj){
    nowPage= obj.innerText;
    if(countPage!=1){
        $.ajax({
            type:"post",
            url:"/getCustomMess.do",
            data:{
                nowPagec:nowPage
            },
            success:function(data) {
                if(data==0){
                    $("#counP").html("当前为"+0+"/"+countPage+"页");
                }else{
                    $("#counP").html("当前为"+nowPage+"/"+countPage+"页");
                }
                getData(data)
            }
        });
    }
}

/*
$.ajax({
    type:"post",
    url:"/searchMessC.do",
    success:function(data){
        $("#username").html("<option value='0'>会员名</option>");
        $("#userNum").html("<option value='0'>会员编号</option>");
        $("#user_tel").html("<option value='0'>电话号码</option>");
        for(var i = 0;i<data.length;i++){
            $("#username").append("<option value='"+i+1+"'>"+data[i].user_name+"<option>");
            $("#userNum").append("<option value='"+i+1+"'>"+data[i].user_id+"<option>");
            $("#user_tel").append("<option value='"+i+1+"'>"+data[i].user_tel+"<option>")
        }
    }
});*/
