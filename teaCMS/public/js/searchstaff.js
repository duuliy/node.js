/**
 * Created by ZXW on 2017/11/14.
 */
/**
 * Created by ZXW on 2017/11/13.
 */
var checkbox = document.getElementsByClassName("choose");
$(checkbox[0]).on("click",function () {
    if (checkbox[0].checked == true) {
        for (var i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = true;
        }
    } else {
        for (var j = 0; j < checkbox.length; j++) {
            checkbox[j].checked = false;
        }
    }
});

$(function(){
    if($("table tbody .choose").length==0){
        $("#nomestips").text("无相关查询信息!");
    }
});
//$(function(){
//    showstaff();
//    setTimeout(getPageTotal,100);
//});

//function showstaff(){
//    $.ajax({
//        type:"GET",
//        url:"getstaff.do",
//        dataType:"json",
//        data: {"currentPage":currentPage},
//        success:function(data){
//            $("tbody").html("");
//            for (var i = 0; i < data.length; i++) {
//                var str = "<tr>" +
//                    "<td><input type='checkbox' class='choose'></td>" +
//                    "<td>" + data[i].admin_id + "</td>" +
//                    "<td>" + data[i].role_name + "</td>" +
//                    "<td>" + data[i].role_porwer + "</td>" +
//                    "<td>" + data[i].admin_login + "</td>" +
//                    "<td>" + data[i].admin_psw + "</td>" +
//                    "<td>"+
//                    "<button class='edit'>修改</button>"+
//                    "<button class='delete'>删除</button>"+
//                    "</td>" +
//                    "</tr>";
//
//                $("tbody").append(str);
//            }
//        }
//    });
//}


//增
$(".add").on("click",function(){
    window.location = "addstaff.html";
});
//删单个
$("table").on("click", ".delete", function () {
    var thisID = parseInt($(this).parent().parent().children("td").eq(1).html());
    if (confirm("确认删除?") == true) {
        $.ajax({
            type: "POST",
            url: "deletestaff.do",
            dataType: "json",
            data: {"thisid": thisID},
            success: function (data) {
                window.location = "person.html";
            }
        })
    }
});
//批量删除人员
$(".deletes").on("click", function () {
    var deleteidgroup = [];
    for (var i = 1; i < checkbox.length; i++) {
        if (checkbox[i].checked == true) {
            var thisID = parseInt($(".choose").eq(i).parent().parent().children("td").eq(1).html());
            deleteidgroup.push(thisID);
        }
    }
    //alert(deleteidgroup);
    if(confirm("确认删除?")==true){
        $.ajax({
            type:"POST",
            url:"delStaffGroup.do",
            dataType:"json",
            data:{"deleteidgroup":deleteidgroup},
            traditional:true,
            success:(data)=>{
                if(data){
                    window.location = "person.html";
                }
            }
        })
    }
});


//查找为空时返回到原来的显示所有界面
$("#search").on("click",function(){
    var rolequanxian=$("#rolequanxian").val().trim();
    if(rolequanxian==""){
        window.location = "person.html";
    }
});

//改
$("table").on("click",".edit",function(){
    var id=parseInt($(this).parent().parent().children().eq(1).text());
    location.href = "showeditstaff.do?id="+id;
});



