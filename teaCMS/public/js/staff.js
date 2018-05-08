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
var currentPage = 1;
var pageTotal = 0;
$(function(){
    showstaff();
    setTimeout(getPageTotal,100);
});
function  getData(data){
    if(data.length>0){
        $("tbody").html("");

        for (var i = 0; i < data.length; i++) {
            if(data[i].role_porwer==1){
                data[i].role_porwer="管理员权限"
            }else{
                data[i].role_porwer="超级管理员权限"
            }
            if(data[i].admin_condition==1){
                data[i].admin_condition="使用"
            }else {
                data[i].admin_condition="注销"
            }
            //"<td><input type='checkbox' class='choose'></td>" +
            var str = "<tr>" +
                "<td>" + data[i].admin_id + "</td>" +
                "<td>" + data[i].role_name + "</td>" +
                "<td>" + data[i].role_porwer + "</td>" +
                "<td>" + data[i].admin_login + "</td>" +
                "<td>" + data[i].admin_condition + "</td>" +
                "<td>" +
                "<button class='btn btn-primary btn-lg' data-toggle='modal' onclick='getRow("+data[i].admin_id+")' data-target='#editModal' style='margin-right: 5px'>编辑</button>" +
                "<button class='btn btn-default btn-lg' data-toggle='modal' onclick='getRow("+data[i].admin_id+")' data-target='#deleteModal'>删除</button>"+
               //<a type='button'  data-target='#editModal'>编辑</a></i>" +
              //<a type='button'  data-target='#deleteModal' onclick='deleteData("+data[i].newtea_id+")'>删除</a></i>" +
                "</td>" +
                "</tr>";
            $("tbody").append(str);
        }
    }if(data.length==0){
        $("tbody").html("查询为空!");
    }
}
function showstaff(){
    $.ajax({
        type:"GET",
        url:"getstaffmag.do",
        dataType:"json",
        data: {
            "currentPage":currentPage,
            "search":$("#search").val().trim()
        },
        success:function(data){
            getData(data);
        }
    });
}

$("#searchsure").on("click",function(){
    currentPage=1;
    getPageTotal();
});
$("#searchsure").on("click",function(){
    currentPage=1;
    showstaff();
});
function getPageTotal(){
    var totalpage = document.getElementById("totalpage");
    $.ajax({
        type:"GET",
        url:"getstaffPageTotalmag.do",
        dataType:"json",
        data:{
            "search2":$("#search").val().trim()
        },
        success:function(data){
            if(data==0){
                totalpage.innerHTML = data;
            }if(data>0){
                totalpage.innerHTML = 1+"/"+data;
            }
            pageTotal = data;
            $('#yema').html("");
            if(data>=1){
                for(var i=1;i<=data;i++){
                    $('#yema').append( "<span><a href='#' class='yema'>"+i+"</a></span>");
                }
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
    for(let i=0;i<yema.length;i++){
        yema[i].onclick = function () {
            currentPage = i+1;
            showstaff();
            totalpage.innerHTML = currentPage + "/" + pageTotal;
        };
    }
}
//增
//$(".add").on("click",function(){
//    //window.location = "addstaff.html";
//});
var index;
function addStaff(){
    $.ajax({
        type:"post",
        url:"/addstaff.do",
        data:{
            roleid:$("#roleid").val(),
            adminlogin:$("#adminlogin").val(),
            adminpsw:$("#adminpsw").val()
        },
        success:function(data){
            //showstaff();
            window.location = "person.html";

        }
    })
}
function  updateStaff(){
    $.ajax({
        type:"post",
        url:"/updateeditstaff.do",
        //data:$("#updateFrom").serialize(),
        data:{
            //"adminid":$("#adminid").val().trim(),
            "roleid":$("#role_id").val().trim(),
            "adminlogin":$("#admin_login").val().trim(),
            "adminpsw":$("#admin_psw").val().trim(),
            "admincondition":$("#admin_condition").val().trim(),
            "adminidbefore":index
        },
        success:function(data){
            console.log("success");
            showstaff();
        }
    })
}

function  getRow(num){
    index= num;
    $.ajax({
        type:"get",
        url:"/showeditstaff.do",
        data:{
            admin_id:index
        },
        success:function(data){
            //$("#role_id").val(data[0].role_id);
            $("#admin_login").val(data[0].admin_login);
            $("#admin_psw").val(data[0].admin_psw);
            //$("#admin_condition").val(data[0].admin_condition)
        }
    })
}

function  deleteStaff(){
    $.ajax({
        type: "POST",
        url: "deletestaff.do",
        dataType: "json",
        data: {"thisid":index},
        success: function (data) {
            console.log(" in success ");
            showstaff();
        }
    })
}

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
                showstaff();
            }
        })
    }
});

$.ajax({
    type:"GET",
    url:"getroleporwerchoose.do",
    dataType:"json",
    success:function(data){
        for (var i = 0; i < data.length; i++) {
            if(data[i].role_porwer==1){
                data[i].role_porwer="管理员权限"
            }else{
                data[i].role_porwer="超级管理员权限"
            }
            var str =
                "<option>"+data[i].role_porwer+"</option>";
            $("#search").append(str);
        }
    }
});
$.ajax({
    type:"GET",
    url:"getaddroleidchoose.do",
    dataType:"json",
    success:function(data){
        for (var i = 0; i < data.length; i++) {
            if(data[i].role_id==1){
                data[i].role_id="管理员"
            }else{
                data[i].role_id="超级管理员"
            }
            var str =
                "<option>"+data[i].role_id+"</option>";
            $("#roleid").append(str);
        }
    }
});
$.ajax({
    type:"GET",
    url:"getroleidchoose.do",
    dataType:"json",
    success:function(data){
        for (var i = 0; i < data.length; i++) {
            if(data[i].role_id==1){
                data[i].role_id="管理员"
            }else{
                data[i].role_id="超级管理员"
            }
            var str =
                "<option>"+data[i].role_id+"</option>";
            $("#role_id").append(str);
        }
    }
});


