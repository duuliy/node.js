/**
 * Created by Administrator on 2017/11/14.
 */


//===============================================添加数据到页面==========================================
var currentPage = 1;    //当前页
var pageTotal = 0;         //总页数
var tea_img = "";     //上传图片路径
window.onload=function () {
    teaOnload();
    getPageTotal();
    nextPage();
    prevPage();

};


//=============================================加载数据=================================================
function teaOnload(){
    $.ajax({
        type:"GET",
        url:"/getTea.do",
        data:"currentPage="+currentPage,
        success: function (data) {
                var str = "";
                for(var i=0;i<data.length;i++) {
                   if(data[i].tea_condition==1){
                       str +=
                           "<tr class='ted'>" +
                           "<td>" + data[i].tea_id + "" +
                           "</td>" +
                           "<td>" + data[i].tea_category + "</td>" +
                           "<td>" + data[i].tea_text + "</td>" +
                           //"<td>" + data[i].tea_status + "</td>" +
                           "<td>" + data[i].tea_img + "</td>" +
                           "<td>" + '启动'+ "</td>" +
                           "<td>" +
                           "<i class='iconfont icon-xiugai' data-toggle='modal' data-target='#myModal-xiuGai' id='xiugai'><a type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#editModal'>编辑</a></i>" +
                           "<i class='iconfont icon-shanchu' id='delet'><a type='button' class='btn btn-default btn-lg' data-toggle='modal' data-target='#deleteModal' >删除</a></i>" +
                           "</td>" +
                           "</tr>"
                   }
                    if(data[i].tea_condition==0){
                        str +=
                            "<tr class='ted'>" +
                            "<td>" + data[i].tea_id + "" +
                            "</td>" +
                            "<td>" + data[i].tea_category + "</td>" +
                            "<td>" + data[i].tea_text + "</td>" +
                            //"<td>" + data[i].tea_status + "</td>" +
                            "<td>" + data[i].tea_img + "</td>" +
                            "<td>" + '禁用'+ "</td>" +
                            "<td>" +
                            "<i class='iconfont icon-xiugai' data-toggle='modal' data-target='#myModal-xiuGai' id='xiugai'><a type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#editModal'>编辑</a></i>" +
                            "<i class='iconfont icon-shanchu' id='delet'><a type='button' class='btn btn-default btn-lg' data-toggle='modal' data-target='#deleteModal' >删除</a></i>" +
                            "</td>" +
                            "</tr>"
                    }
                    $("#teaTd").html(str);
                }

        }

    })
}


//=====================================================增======================================
$("#addInsert").click(function () {
    $.ajax({
        type:"POST",
        url:"/addinsert.do",
        data:$("#addForm").serialize()+"&tea_img="+tea_img,
        success:function (data) {
            $("#addForm  input").val("");
            $(".myimg1").attr('src',"");
            $("#oldFile").replaceWith("<input  type='file'  name='img'/>");
            $("#addModal").modal('hide');
            teaOnload();
        }
    })
});



//==================================================删==============================================

$("#teaTd").on("click",".icon-shanchu",function () {
    var teaId=$(this).parent().parent().children().eq(0).text();
    $("#delePlant").click(function () {
        $.ajax({
            type:"POST",
            url:"/deleTea.do",
            data:"tea_id="+teaId,
            success:function (data) {
                console.log("删除成功");
                $("#deleteModal").modal('hide');
                teaOnload();

            }
        })
    });
});



//===============================================改=====================================
// 获取原始数据
$("#teaTd").on("click",".icon-xiugai",function () {
    var status=$(this).parent().parent().children().eq(2).text();
    var teaname=$(this).parent().parent().children().eq(1).text();
    //var tea=$(this).parent().parent().children().eq(3).text();
    var teaurl=$(this).parent().parent().children().eq(3).text();
    //$("#teaname2").val(tea);
    $("#teaurl").val(teaurl);
    $("#teazl").val(status);
    $("#teaname").val(teaname);
    $(".myimg0").attr('src',teaurl);
});



//点击保存修改
$("#saveUp").click(function () {
   $.ajax({
       type:"POST",
       url:"/updaTea.do",
       data:$('#updaTea').serialize(),
       success:function (data) {
          console.log(data);
          $("#editModal").modal('hide');
           teaOnload();
       }
   })
});



//==========================================查==============================================

function search() {
    currentPage=1;
    var searchCont= $(".searchInput").val();
    var searchCont2= $(".searchInput2").val();
    $.ajax({
        type:"POST",
        url:"/serrchTea.do",
        data:{"tea_category":searchCont,"tea_status":searchCont2,"currentPage":currentPage},
        success:function (data) {
            console.log(data);
            var str = "";
            if(data!="搜索失败"){
                for(var i=0;i<data.length;i++) {
                    console.log(data,"oo")
                    if(data[i].tea_condition==1){
                        str +=
                            "<tr class='ted'>" +
                            "<td>" + data[i].tea_id + "" +
                            //"<input type='checkbox' />" +
                            "</td>" +
                            "<td>" + data[i].tea_category + "</td>" +
                            "<td>" + data[i].tea_text + "</td>" +
                            //"<td>" + data[i].tea_status + "</td>" +
                            "<td>" + data[i].tea_img + "</td>" +
                            "<td>" + '启动'+ "</td>" +
                            "<td>" +
                            "<i class='iconfont icon-xiugai' data-toggle='modal' data-target='#myModal-xiuGai' id='xiugai'><a type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#editModal'>编辑</a></i>" +
                            "<i class='iconfont icon-shanchu' id='delet'><a type='button' class='btn btn-default btn-lg' data-toggle='modal' data-target='#deleteModal' >删除</a></i>" +
                            "</td>" +
                            "</tr>"
                    }
                    $("#teaTd").html(str);
                }
                $("#teaTd").html(str);
            }else {
                $("#teaTd").html("");
            }
            getPageTotal();
        }
    })
}

$("#serrch").click(function () {
    search();
});

//键盘搜索
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
        search();
    }
};

//================================================分页===============================================
//获取共分为几页
function getPageTotal() {
    var searchCont= $(".searchInput").val();
    var searchCont2= $(".searchInput2").val();
    var totalpage = document.getElementById("totalPage");
    var numberBlock = document.getElementById("numberBlock");
    $.ajax({
        type:"GET",
        url:"/getpage.do",
        data:{"tea_category":searchCont,"tea_status":searchCont2},
        success:function (data) {
            pageTotal = data;
            if(data==0){
                currentPage=0;
            }
            totalpage.innerHTML = currentPage+"/"+data;
            numberBlock.innerHTML="";
            for(var i=1;i<=data;i++){
                numberBlock.innerHTML += "<span class='blue'>"+i+"</sapn>"
            }
        }
    });
}
// 上下页
var total = document.getElementById("totalPage");
function nextPage(){
    currentPage++; //让当前页页面+1  //5
    if(currentPage>pageTotal){
        currentPage=pageTotal;
    }else{
        teaOnload();
        total.innerHTML = currentPage+"/"+pageTotal;
    }
}
function prevPage(){
    currentPage--;
    if(currentPage<=0){
        currentPage=1;
    }else{
        teaOnload();
        total.innerHTML = currentPage+"/"+pageTotal;
    }
}


// 点击每个小页跳转
$("#numberBlock").on("click","span",function () {
        if(pageTotal!=1){
            $(".blue").css("color","#4f4f4f");
            var text=$(this).text();
            $(this).css("color","blue");
            currentPage=text;
            teaOnload();
            total.innerHTML = currentPage+"/"+pageTotal;
        }
    });



//上传图片
$(".addFile1").click(function(){
    sendImg(0);
});
$(".addFile2").click(function(){
    sendImg(1);
});

function sendImg(x) {
    var form = new FormData($(".imgForm")[x]);
    form.append('file',document.querySelector('input[type=file]').files[0]);
    for (var [key, value] of form.entries()) {
        console.log(key, value);
    }
    $.ajax({
        type:"POST",
        url:"/sendImg.do",
        data:form,
        processData:false,
        contentType:false,
        success:function(data){
            $(".showimg .myimg"+x).attr('src',data);
            $("#teaurl").val(data);
            tea_img = data;
        }
    })
}


//获取搜索下拉框数据
$.ajax({
    type:"GET",
    url:"/getTeaname.do",
    success:function (data) {
        console.log(data,"jiazai")
        var str='<option value="">--请选择--</option>';
        //var str2='<option value="">--请选择--</option>';
        for (var i=0;i<data.length;i++){
            str+= "<option value='"+data[i].tea_category+"'>" + data[i].tea_category + "</option>"
            //str2+= "<option value='"+data[i].tea_status+"'>" + data[i].tea_status + "</option>"
        }
        $(".playName").html(str);
        $(".playName2").html(str2);


    }
});

console.log($("#allDele:checked"));


$("#allDele2").click(function () {
    if($("#allDele:checked")){
        $("#teaTd").html("");
    }
});

