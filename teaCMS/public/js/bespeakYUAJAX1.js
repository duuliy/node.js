

var deleteIndex;

function deleteData(index){
    deleteIndex=index;
    $("#deleteModal").modal("hide");
}



//自加载======================================================
    function showstaff(){
        console.log("22222"+$("#sousuo").val().trim());
        $.ajax({
            type:"get",
            url:"getstaff.do",
            data:{
                "sousuo":$("#searchbox").val().trim(),
                "currentPage":currentPage
            },
            success:function (data){
                $("#tb").html("");
                var newtea_condition;
                var conditionBtn = "";
                for(var i=0;i<data.length;i++){
                    if(data[i].newtea_condition==1){
                        newtea_condition="上架";
                        conditionBtn = "下架";
                    }else{
                        newtea_condition="下架";
                        conditionBtn = "上架";
                    }
                    var str=
                        "<tr>" +
                        "<td>"+data[i].newtea_id+"</td>"+
                        "<td>"+data[i].newtea_name+"</td>"+
                        "<td>"+data[i].newtea_price+"</td>"+
                        "<td>"+data[i].soldday+"</td>"+
                        "<td>"+newtea_condition+"</td>"+
                        "<td>" +
                        "<i class='iconfont icon-xiugai' data-toggle='modal' data-target='#myModal-xiuGai' id='xiugai'><a type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#editModal' onclick='getRow("+data[i].newtea_id+")'>编辑</a></i>" +
                        "<i class='iconfont icon-shanchu' id='delet'><a type='button' class='btn btn-default btn-lg' data-toggle='modal' data-target='#deleteModal' onclick='deleteData("+data[i].newtea_id+")'>"+conditionBtn+"</a></i>" +
                        "</td>" +
                        "</tr>";
                    $("#tb").append(str);

                }
            }
        });
    };
//修改==========================================================
$("tbody").on("click","#xiugai",function(){
    var data1=$(this).parent().parent().children().eq(0).text();
    $.ajax({
        type:"post",
        url:"/bespeakYU2.do",
        data:"newtea_id="+data1,
        success:function (data){
            //$("#newtea_id .span5").val(data[0].newtea_id);
            $("#newteaName .span5").val(data[0].newtea_name);
            $("#newteaPrice .span5").val(data[0].newtea_price);
            $("#newteaTime .span5").val(data[0].soldday);
            if(data[0].newtea_condition==1){
                $("#newtea").html("<option value='0'>上架</option><option value='1'>下架</option>")
            }else{
                $("#newtea").html("<option value='0'>下架</option><option value='1'>上架</option>")
            }
        }
    })
});
var num;
function getRow(index){
    num = index;
    console.log(num);
}
$("#bianji").on("click",function(){
    //var id =  $("#newtea_id .span5").val();
    var name=$("#newteaName .span5").val();
    var Price= $("#newteaPrice .span5").val();
    var time=$("#newteaTime .span5").val();
    var zhuangtai= $("#newtea option:selected").text();
    $.ajax({
            type:"post",
            url:"/bespeakYU3.do",
            data:{
                teaid:num,
                teaname:name,
                teaPrice: Price,
                teatime:time,
                teazhuang:zhuangtai
            },
            success:function (data){
                console.log(data);
                showstaff();
            }

        },
        $("#editModal").modal("hide")
    );
});
//删除
$("#delete").on("click",function(){
    $.ajax({
        type:"post",
        url:"/bespeakYU4.do",
        //data:"newtea_id="+data1,
        data:{"newtea_id":deleteIndex},
        success:function(data){
            console.log("shanchu");
            showstaff();
        }
    });

    $("#deleteModal").modal("hide");
});
//新增
$("#add").on("click",function(){
    $.ajax({
        type:"post",
        url:"/bespeakYU5.do",
        data:$("#addform").serialize(),
        success:function(data){
            console.log("xinzeng");
            showstaff();
            $("#addform>div>input").html("")
        }
    });
    $("#addModal").modal("hide")

});

//搜索
/*$("#sousuo").on("click",function(){
    var newteaname = $("#searchbox").val();
    $.ajax({
        type:"post",
        url:"/bespeakYU6.do",
        data:{
            name:newteaname
        },
        success:function(data){
            $("#tb").html("");
            for(var i=0;i<data.length;i++){
                var str=
                    "<tr>" +
                    "<td>"+data[i].newtea_id+"</td>"+
                    "<td>"+data[i].newtea_name+"</td>"+
                    "<td>"+data[i].newtea_price+"</td>"+
                    "<td>"+data[i].soldday+"</td>"+
                    "<td>"+data[i].newtea_condition+"</td>"+
                    "<td>" +
                    "<i class='iconfont icon-xiugai' data-toggle='modal' data-target='#myModal-xiuGai' id='xiugai'><a type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#editModal'>编辑</a></i>" +
                    "<i class='iconfont icon-shanchu' id='delet'><a type='button' class='btn btn-default btn-lg' data-toggle='modal' data-target='#deleteModal' onclick='deleteData("+data[i].newtea_id+")'>删除</a></i>" +
                    "</td>" +
                    "</tr>";
                $("#tb").append(str);
            }

        }
    })
});*/

$("#sousuo").on("click",function() {
    currentPage=1;
    showstaff();
});
$("#sousuo").on("click",function() {
    currentPage=1;
    getPageTotal();
});

//function tolal(){
//    //分页
//    $.ajax({
//        type:"get",
//        url:"/bespeakYU7.do?danqian="+danqian,
//        data:{},
//        //dataType:"json",
//        success:function(data){
//            $("#zongYe").append("<span>"+data+"</span>")
//
//
//        }
//    },true)
//}
//
//var danqian=1

var currentPage = 1;
var pageTotal = 0;
$(function(){
    showstaff();
    setTimeout(getPageTotal,100);
});


function getPageTotal(){
    var totalpage = document.getElementById("totalpage");
    $.ajax({
        type:"GET",
        url:"getstaffPageTotal.do",
        dataType:"json",
        data:{
            "sousuo2":$("#searchbox").val().trim()
        },
        success:function(data){
            totalpage.innerHTML = currentPage+"/"+data;
            pageTotal = data;
            $('#yema').html("");
            for(var i=1;i<=data;i++){
                $('#yema').append( "<li><a href='#' class='yema'>"+i+"</a></li>");
            }
        }
    });
}

function prevPage(){
    var totalpage = document.getElementById("totalpage");
    currentPage--;
    if(currentPage<=0){
        currentPage=1;
    }else{
        showstaff();
        totalpage.innerHTML = currentPage+"/"+pageTotal;
    }
}
function nextPage(){
    var totalpage = document.getElementById("totalpage");
    currentPage++;
    if(currentPage>pageTotal){
        currentPage=pageTotal;
    }else{
        showstaff();
        totalpage.innerHTML = currentPage+"/"+pageTotal;
    }
}
setInterval(yemago,110);
function yemago() {
    var totalpage = document.getElementById("totalpage");
    var yema = document.getElementsByClassName("yema");
    for (let i = 0; i < yema.length; i++) {
        yema[i].onclick = function () {
            currentPage = i + 1;
            showstaff();
            totalpage.innerHTML = currentPage + "/" + pageTotal;
        };
    }
}

