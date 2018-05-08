/**
 * Created by Administrator on 2017/11/17.
 */
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


//=============================================加载数据ok=================================================
function teaOnload(){
    $.ajax({
        type:"GET",
        url:"/getMuseum.do",
        data:"currentPage="+currentPage,
        success: function (data) {
            var str = "";
            for(var i=0;i<data.length;i++) {
                if(data[i].doc_condition==1){
                    str +=
                        "<tr>" +
                        "<td>" + data[i].doc_id + "" +
                        "</td>" +
                        "<td>" + data[i].pro_name + "</td>" +
                        "<td>" + data[i].doc_title + "</td>" +
                        "<td>" + data[i].doc_publisher + "</td>" +
                        "<td>" + data[i].doc_time + "</td>" +
                        "<td>" + data[i].doc_content + "</td>" +
                        "<td>" + data[i].doc_url + "</td>" +
                        "<td>" +'启动' + "</td>" +
                        "<td id='caozuo'>" +
                        "<i class='iconfont icon-xiugai' data-toggle='modal' data-target='#myModal-xiuGai' id='xiugai'><a type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#editModal'>编辑</a></i>" +
                        "<i class='iconfont icon-shanchu' id='delet'><a type='button' class='btn btn-default btn-lg' data-toggle='modal' data-target='#deleteModal' >删除</a></i>" +
                        "</td>" +
                        "</tr>"
                    }
                if(data[i].doc_condition==0){
                    str +=
                        "<tr>" +
                        "<td>" + data[i].doc_id + "" +
                        "</td>" +
                        "<td>" + data[i].pro_name + "</td>" +
                        "<td>" + data[i].doc_title + "</td>" +
                        "<td>" + data[i].doc_publisher + "</td>" +
                        "<td>" + data[i].doc_time + "</td>" +
                        "<td>" + data[i].doc_content + "</td>" +
                        "<td>" + data[i].doc_url + "</td>" +
                        "<td>" +'禁用' + "</td>" +
                        "<td>" +
                        "<i class='iconfont icon-xiugai' data-toggle='modal' data-target='#myModal-xiuGai' id='xiugai'><a type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#editModal'>编辑</a></i>" +
                        "<i class='iconfont icon-shanchu' id='delet'><a type='button' class='btn btn-default btn-lg' data-toggle='modal' data-target='#deleteModal' >删除</a></i>" +
                        "</td>" +
                        "</tr>"
                }
                $("#teaTd").html(str);
                $("#caozuo").css("width","300px")
                }



        }

    })
}


//=====================================================增ok======================================
$("#addInsert").click(function () {
    $.ajax({
        type:"POST",
        url:"/addMuseum.do",
        data:$("#addForm").serialize()+"&doc_url="+tea_img,
        success:function (data) {
            $("#addForm  input").val("");
            $(".myimg1").attr('src',"");
            $("#oldFile").replaceWith("<input  type='file'  name='img'/>");
            $("#addModal").modal('hide');
            teaOnload();
        }
    })
});



//==================================================删ok==============================================

$("#teaTd").on("click",".icon-shanchu",function () {
    var teaId=$(this).parent().parent().children().eq(0).text();
    $("#delePlant").click(function () {
        $.ajax({
            type:"POST",
            url:"/deleMuseum.do",
            data:"doc_id="+teaId,
            success:function (data) {
                console.log("删除成功");
                $("#deleteModal").modal('hide');
                teaOnload();

            }
        })
    });
});



//===============================================改ok=====================================
// 获取原始数据
$("#teaTd").on("click",".icon-xiugai",function () {
    var doc_id=$(this).parent().parent().children().eq(0).text();
    var teaname=$(this).parent().parent().children().eq(1).text();
    var status=$(this).parent().parent().children().eq(2).text();
    var tea=$(this).parent().parent().children().eq(3).text();
    var teaurl=$(this).parent().parent().children().eq(4).text();
    var muconten=$(this).parent().parent().children().eq(5).text();
    var museumurl=$(this).parent().parent().children().eq(6).text();

    $("#teaname2").val(tea);
    $("#teaurl").val(teaurl);
    $("#teazl").val(status);
    $("#teaname").val(teaname);
    $(".myimg0").attr('src',museumurl);
    $("#mucon").val(muconten);
    $("#muurl").val(museumurl);


//点击保存修改
    $("#saveUp").click(function () {
        console.log($('#updaTea').serialize())
        $.ajax({
            type:"POST",
            url:"/updaMuseum.do",
            data:$('#updaTea').serialize()+"&doc_id="+doc_id,
            success:function (data) {
                $("#editModal").modal('hide');
                teaOnload();
            }
        })
    });

});



//==========================================查ok==============================================
function search() {
    currentPage=1;
    var searchCont= $(".searchInput").val();
    var searchCont2= $(".searchInput2").val();
    $.ajax({
        type:"POST",
        url:"/serrchMuseum.do",
        data:{"pro_id":searchCont,"doc_publisher":searchCont2,"currentPage":currentPage},
        success: function (data) {
            currentPage=1;
            var str = "";
            if(data!=="搜索失败"){
                for(var i=0;i<data.length;i++) {
                    console.log(data)
                    console.log(data[i].doc_condition,"状态")
                    str +=
                        "<tr>" +
                        "<td>" + data[i].doc_id + "" +
                        "</td>" +
                        "<td>" + data[i].pro_name + "</td>" +
                        "<td>" + data[i].doc_title + "</td>" +
                        "<td>" + data[i].doc_publisher + "</td>" +
                        "<td>" + data[i].doc_time + "</td>" +
                        "<td>" + data[i].doc_content + "</td>" +
                        "<td>" + data[i].doc_url + "</td>" +
                        "<td>" +'启动' + "</td>" +
                        "<td>" +
                        "<i class='iconfont icon-xiugai' data-toggle='modal' data-target='#myModal-xiuGai' id='xiugai'><a type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#editModal'>编辑</a></i>" +
                        "<i class='iconfont icon-shanchu' id='delet'><a type='button' class='btn btn-default btn-lg' data-toggle='modal' data-target='#deleteModal' >删除</a></i>" +
                        "</td>" +
                        "</tr>"
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


//================================================分页ok===============================================
//获取共分为几页
function getPageTotal() {
    var searchCont= $(".searchInput").val();
    var searchCont2= $(".searchInput2").val();
    var totalpage = document.getElementById("totalPage");
    var numberBlock = document.getElementById("numberBlock");
    $.ajax({
        type:"GET",
        url:"/getMuseumPage.do",
        data:{"pro_name":searchCont,"doc_publisher":searchCont2},
        success:function (data) {
            console.log("getPageTotal:"+data);
            pageTotal = data;
            if(data==0){
                totalpage.innerHTML =0+"/"+data;
            }else {
                totalpage.innerHTML = currentPage+"/"+data;
            }
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
    $(".blue").css("color","#4f4f4f");
    var text=$(this).text();
    $(this).css("color","blue");
    currentPage=text;
    teaOnload();
    total.innerHTML = currentPage+"/"+pageTotal;
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
            $("#muurl").val(data);
            tea_img = data;
        }
    })
}



//搜索下拉框数据
$.ajax({
    type:"GET",
    url:"/getPlayname.do",
    success:function (data) {
        var str='<option value="">--请选择--</option>';
        var str2='<option value="">--请选择--</option>';
        for (var i=0;i<data[0].length;i++){
            str+= "<option value='"+data[0][i].pro_id+"'>" + data[0][i].pro_name + "</option>"
        }
        for (var j=0;j<data[1].length;j++){
            str2+= "<option value='"+data[1][j].admin_login+"'>" + data[1][j].admin_login + "</option>"
        }
        $(".playName").html(str);
        $(".playName2").html(str2);
    }
});