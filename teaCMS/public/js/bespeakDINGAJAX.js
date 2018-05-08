
var deleteIndex;

function deleteData(index){
    deleteIndex=index;
    $("#deleteModal").modal("hide");
}
//自加载======================================================
function showstaff() {
    $.ajax({
        type:"get",
        url:"getstaff1.do",
        data:{
            "sousuo":$("#searchbox").val().trim(),
            "currentPage":currentPage
        },
        success: function (data) {
            $("#tb").html("");
            var booking_condition;

            for (var i = 0; i < data.length; i++) {
                if(data[i].booking_condition==0){
                    booking_condition="取消"
                }else{
                    booking_condition="进行中"
                }
                var str =
                    "<tr>" +
                    "<td>" + data[i].booking_id + "</td>" +
                    "<td>"+data[i].user_name+"</td>"+
                    "<td>" + data[i].newtea_name + "</td>" +
                    "<td>" + data[i].booking_ispay + "</td>" +
                    "<td>" + data[i]. booking_tel  + "</td>" +
                    "<td>" + data[i].booking_amount + "</td>" +
                    "<td>" + booking_condition  + "</td>" +
                    //"<td>" + "</td>" +
                    "</tr>";
                $("#tb").append(str);

            }
        }
    });
}

//修改=====================================================
$("tbody").on("click","#xiugai",function(){
    var data1=$(this).parent().parent().children().eq(0).text();
    /*点击修改图标把原来的数据添加到修改栏中*/
    $.ajax({
        type:"post",
        url:"/bespeakDING2.do",
        data:{
            booking_id:data1
        },
        success:function (data){

            $("#booking_id .span5").val(data[0].booking_id);
            $("#user_id .span5").val(data[0].user_id);
            $("#newtea_id .span5").val(data[0].newtea_id);
            $("#booking_ispay .span5").val(data[0].booking_ispay);
            $("#booking_tel .span5").val(data[0].booking_tel);
            $("#booking_amount .span5").val(data[0].booking_amount);
            $("#booking_condition .span5").val(data[0].booking_condition);
        }
    })
});
$("#bianji").on("click",function(){
    var bookingid=$("#booking_id .span5").val();
    var user=$("#user_id .span5").val();
    var newteaid=$("#newtea_id .span5").val();
    var bookingispay=$("#booking_ispay .span5").val();
    var bookingtel= $("#booking_tel .span5").val();
    var bookingamount=$("#booking_amount .span5").val();
    var bookingcondition= $("#booking_condition .span5").val();
    $.ajax({
            type:"post",
            url:"/bespeakDING3.do",
            data:{
                bookingid:bookingid,
                user:user,
                newteaid: newteaid,
                bookingispay:bookingispay,
                bookingtel:bookingtel,
                bookingamount:bookingamount,
                bookingcondition:bookingcondition
            },
            success:function (data){
                showstaff();
            }

        },
        $("#editModal").modal("hide")

    );
});
//================================================

//新增
$("#addDing").on("click",function(){
    $.ajax({
        type:"post",
        url:"/bespeakDING5.do",
        data:$("#addform").serialize(),
        success:function(data){
            showstaff();
        }

    });
    $("#addModal").modal("hide")
});
//删除

$("#delete").on("click",function(){
    $.ajax({
        type:"post",
        url:"/bespeakDING4.do",
        //data:"newtea_id="+data1,
        data:{"booking_id":deleteIndex},
        success:function(data){
            console.log("shanchu");
            showstaff();
        }
    });

    $("#deleteModal").modal("hide");
});
//==========================================
$("#sousuo").on("click",function() {
    currentPage=1;
    showstaff();
});
$("#sousuo").on("click",function() {
    currentPage=1;
    getPageTotal();
});
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
        url:"getstaffPageTotal1.do",
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
    //alert(yema.length);
    for (let i = 0; i < yema.length; i++) {
        yema[i].onclick = function () {
            currentPage = i + 1;
            showstaff();
            totalpage.innerHTML = currentPage + "/" + pageTotal;
        };
    }
}