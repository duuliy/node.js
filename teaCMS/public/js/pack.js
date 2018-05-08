/**
 * Created by dell on 2017/11/15.
 */
//显示数据库包装信息
window.onload = function(){
    showPack();
    getTotalPage();
};
function showPack() {
    var mat_name = $("#getVal").val();
    $.ajax({
        type:"GET",
        url:"/showImg.do",
        data:{
            "pack_mat_name":mat_name,
            "currentPage":currentPage
        },
        success: function (data) {
            showDetail(data)
        }
    })
}
function showDetail(data){
    document.getElementById("myContent").innerHTML = "";
    for(var i=0;i<data.length;i++){
        if(data[i].pack_img_condition==1){
            document.getElementById("myContent").innerHTML+='<tr>'+
            '<td>'+data[i].pack_img_id+'</td>'+
            '<td>'+data[i].pack_mat_name+'</td>'+
            '<td>'+data[i].pack_img_name+'</td>'+
            '<td>'+data[i].pack_price+'</td>'+
            '<td>'+data[i].pack_img_url+'</td>'+
            '<td>'+'启用'+'</td>'+
            "<td>" +
            " <ul class='actions'>"+
            "<li><a type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#editModal' onclick='changeInfo(this)'>编辑</a>" +
            "<li class='last'><a type='button' class='btn btn-default btn-lg' data-toggle='modal' data-target='#deleteModal' onclick='deletePack(this)'>禁用</a>" +
            "</ul>"+
            "</td>" +
            '</tr>';
        }
        if(data[i].pack_img_condition==0){
            document.getElementById("myContent").innerHTML+='<tr>'+
            '<td>'+data[i].pack_img_id+'</td>'+
            '<td>'+data[i].pack_mat_name+'</td>'+
            '<td>'+data[i].pack_img_name+'</td>'+
            '<td>'+data[i].pack_price+'</td>'+
            '<td>'+data[i].pack_img_url+'</td>'+
            '<td>'+'禁用'+'</td>'+
            "<td>" +
            " <ul class='actions'>"+
            "<li><a type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#editModal' onclick='changeInfo(this)'>编辑</a>" +
            "<li class='last'><a type='button' class='btn btn-default btn-lg' data-toggle='modal' data-target='#deleteModal' onclick='deletePack(this)'>禁用</a>" +
            "</ul>"+
            "</td>" +
            '</tr>';
        }
    }
}

//新增
function addBtn(){
    var pack_mat_id = document.getElementById("pack_mat_id").value;
    var pack_img_name = document.getElementById("pack_img_name").value;
    var pack_price = document.getElementById("pack_price").value;
    var pack_img_url = document.getElementById("pack_img_url").value;
    var pack_img_condition = document.getElementById("pack_img_condition").value;
    $.ajax({
        type:"GET",
        url:"/newPack.do",
        data:{
            "pack_mat_id":pack_mat_id,
            "pack_img_name":pack_img_name,
            "pack_price":pack_price,
            "pack_img_url":pack_img_url,
            "pack_img_condition":pack_img_condition
        },
        success:function () {
            $("#addModal").modal('hide');
            document.getElementById("pack_mat_id").value = "";
            document.getElementById("pack_img_name").value = "";
            document.getElementById("pack_price").value = "";
            document.getElementById("pack_img_url").value = "";
            document.getElementById("pack_img_condition").value = "";
            showPack();
            getTotalPage()
        }
    })
}
//删除
var pack_id;
function deletePack(obj){
    pack_id = $(obj).parent().parent().parent().siblings().eq(0).text();
}
function confirmDelete(){
    $.ajax({
        type:"GET",
        url:"/delete.do?",
        data:{
            "pack_img_id":pack_id
        },
        success: function () {
            $("#deleteModal").modal('hide');
            showPack();
            getTotalPage()
        }
    })
}
//修改
var change_info_id;
function changeInfo(obj){
    change_info_id = $(obj).parent().parent().parent().siblings().eq(0).text();
    var change_info_name = $(obj).parent().parent().parent().siblings().eq(3).text();
    var change_info_price = $(obj).parent().parent().parent().siblings().eq(4).text();
    var change_info_url = $(obj).parent().parent().parent().siblings().eq(5).text();
    $("#pack_img_name1").val(change_info_name);
    $("#pack_price1").val(change_info_price);
    $("#pack_img_url1").val(change_info_url);
}
function confirmChange(){
    var pack_img_name = document.getElementById("pack_img_name1").value;
    var pack_price = document.getElementById("pack_price1").value;
    var pack_img_url = document.getElementById("pack_img_url1").value;
    $.ajax({
        type:"GET",
        url:"/changeInfo.do",
        data:{
            "pack_img_id1":change_info_id,
            "pack_img_name1":pack_img_name,
            "pack_price1":pack_price,
            "pack_img_url1":pack_img_url
        },
        success:function(){
            $("#editModal").modal('hide');
            showPack();
            getTotalPage()
        }
    })
}
//查询
function checkInfo(){
    var mat_name = $("#getVal").val();
    $.ajax({
        type:"GET",
        url:"/checkInfo.do",
        data:{
            "pack_mat_name":mat_name
        },
        success: function () {
            currentPage = 1;
            showPack();
            getTotalPage()
        }
    })
}

//分页
var currentPage = 1;
var maxPage;
function getTotalPage(){
    var numberBlock = document.getElementById("numberBlock");
    var nowPage = document.getElementById("nowPage");
    var mat_name = $("#getVal").val();
    $.ajax({
        type:"GET",
        url:"/getPackPage.do",
        data:{
            "pack_mat_name":mat_name
        },
        success: function (data) {
            nowPage.innerHTML ="";
            maxPage = data;
            nowPage.innerHTML = "当前第"+currentPage+"/"+data+"页";
            numberBlock.innerHTML = "";
            for(var i=1;i<=data;i++){
                numberBlock.innerHTML+="<span onclick='changePage("+i+")'>"+i+"</span>"
            }
        }
    })
}
//换页
$("#nextPage").click(function () {
    if(currentPage>=maxPage){
        currentPage=maxPage
    }else{
        currentPage+=1;
        getTotalPage()
    }
    showPack()
});
$("#prevPage").click(function () {

    if(currentPage==1){
        currentPage=1
    }else{
        currentPage-=1;
        getTotalPage()
    }
    showPack()
});
function changePage(obj){
    currentPage = obj;
    getTotalPage();
    showPack()
}
//上传
function upload(){
    var form = new FormData($(".imgForm")[0]);
    form.append("file",$("#upImg")[0].files[0]);
    var imgBox = document.getElementById("imgBox");
    $.ajax({
        type:"POST",
        url:"/uploadImg.do",
        cache: false,
        data:form,
        processData: false,
        contentType: false,
        success: function (data) {
            imgBox.src = data
            document.getElementById("pack_img_url").value = data
        }
    })
}