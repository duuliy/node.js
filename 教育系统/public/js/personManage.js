/**
 * Created by Mr.袁 on 2017/9/28.
 */




var s = -1;
var liebiao = 0;


var currentPage = 1;
var pageTotal = 0;
/*默认显示的数据*/
window.onload=function(){
    // aa();
    getAllStudent(); //xhr
    getPageTotal(); //xhr ->
};

// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function () {
//
//     if (xhr.readyState == 4 && xhr.status == 200) {
//         // var data = JSON.parse(request.responseText);
//         alert("sdaas")
//         Data();
//
//     }
// }
// xhr.open("get", "PeopleMan.do", true);
// xhr.send(null);

// function aa() {
//     myAjax("get","/seachPeople.do","currentPage="+currentPage,Data,false)
// }


function getAllStudent() {
    myAjax("get","/seachPeople.do","currentPage="+currentPage,Data,false)
}

function Data(){

    var data = JSON.parse(xhr.responseText);
    $("#tfoot").html("");
    for (var i = 0; i < data.length; i++) {
        liebiao++;
        var str = '<tr class="query">' +
            '<td><input type="checkbox" class="items"></td>' +
            "<td class='ct' id=' + liebiao + '>"+data[i].peopleNo+"</td>" +
            '<td class="ct">'+data[i].depName+'</td>' +
            '<td class="ct">'+data[i].peopleName+'</td>' +
            '<td class="ct">'+data[i].peopleAcount+'</td>' +
            '<td class="ct">'+data[i].peoplePhone+'</td>' +
            '<td class="ct">'+data[i].peopleQQ+'</td>' +
            '<td class="ct">'+data[i].peopleEmail+'</td>' +
            '<td class="ct">'+data[i].roleName+'</td>' +
            '<td><button type="button" class="Ope">修改</button>' +
            '<button type="button" class="Del">删除</button></td>' +
            '</tr>';
        $("#tfoot").append(str);
        var strs="<option>"+data[i].depName+"</option>";//等待人员管理
        $(".gangwei").append(strs)
    }
}
/*岗位角色*/
/*修改数据*/
var Operate = $(".Ope");
    /*单击修改获取修改数据的值*/
    $(document).on("click", ".Ope", function () {
        var id = $(this).parent().parent().children(":eq(1)").text();
        var bm = $(this).parent().parent().children(":eq(2)").text();
        var xm = $(this).parent().parent().children(":eq(3)").text();
        var zh = $(this).parent().parent().children(":eq(4)").text();
        var phone = $(this).parent().parent().children(":eq(5)").text();
        var qq = $(this).parent().parent().children(":eq(6)").text();
        var email = $(this).parent().parent().children(":eq(7)").text();
        var jiaose = $(this).parent().parent().children(":eq(8)").text();
        window.location.href = "addPersonal.html?id=" + id + "&bm=" + bm + "&xm=" + xm + "&zh=" + zh + "&phone=" + phone
            + "&qq=" + qq + "&email=" + email + "&jiaose=" + jiaose;
});

/*删除信息*/
$(document).on("click", ".Del", function () {
    if (confirm("确认删除吗？")) {
        var id = $(this).parent().parent().children(":eq(1)").text();
        $(this).parent().parent().remove();
        var request = new XMLHttpRequest();
        request.open("get", "deletePeople.do?id=" + id, true);
        request.send(null);
    }
});
/*新增信息*/
$("#new_people").click(function () {
    window.location.href = "addPersonal.html";
});
/*查询信息*/
$("#search").click(function () {//给查询按钮设单击事件
$("#tfoot").html("");
    var name = $(".name").val(),//获取查询信息框的值
        phone = $(".phone").val(),
        line = $(".line").val();
    var request = new XMLHttpRequest();
    request.open("get", "seachPeople.do?peopleName=" + name + "&peoplePhone=" + phone+"&peopleQQ="+line);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var data = JSON.parse(request.responseText);
            Data(data);
        }
    };
    request.send(null);
});
/*全选*/
$(".allcheck").click(function () {
    if ($(this).prop("checked")) {
        $(".items").prop("checked", true);
        $(".items").attr("checked", true);
    }else{
        $(".items").prop("checked", false);
        $(".items").attr("checked", false);
    }
});
$(document).on("click",".items",function () {
    if ($(this).prop("checked")) {
        $(this).prop("checked", true);
        $(this).attr("checked", true);
        if ($(".items[checked]").length == $(".items").length) {
            $(".allcheck").prop("checked", true);
        }
    } else {
        $(this).prop("checked", false);
        $(this).attr("checked", false);
        $(".allcheck").prop("checked", false);
    }
})
/*删除多个*/
$("#Dels").click(function () {
    if (($(".items[checked]").length == 0)) {//判断是否有选中的复选框
        alert("请选择需要删除的项");
        return false;
    }
    if (confirm("确认要删除吗？")) {
        $(".items").each(function () {//遍历复选框
            if (($(this).attr("checked"))) {//判断复选框是否选中，选中就执行
                $(this).parent().parent().remove();//获取当前选中复选框的父元素进行移出
                var id = $(this).parent().siblings(":eq(0)").text();//获取id值
                // for (var i = 0; i < peopleArr.length; i++) {//遍历数组
                //     if (id == peopleArr[i].peopleNo) {
                //         peopleArr.splice(i, 1);//删除数组中对应选中的复选框的对象
                //     }
                // }
                var request = new XMLHttpRequest();
                request.open("get", "deletePeople.do?id=" + id, true);
                request.send(null);

            }
        });
    }
});



function nextPage(){
    var totalpage = document.getElementById("totalpage");
    currentPage++ //让当前页页面+1  //5
    if(currentPage>pageTotal){
        alert("这是最后一页");
        currentPage=pageTotal;
    }else{
        getAllStudent();
        // $("#tfoot").html("");
        totalpage.innerHTML = currentPage+"/"+pageTotal;
    }
}

function prevPage(){
    var totalpage = document.getElementById("totalpage");
    currentPage--;
    if(currentPage<=0){
        currentPage=1;
    }else{
        getAllStudent();
        // $("#tfoot").html("");
        totalpage.innerHTML = currentPage+"/"+pageTotal;
    }
}



/*1.总页数
 * -- 每页显示多少条
 * -- 总共有多少条数据*/

/*2.每页显示对应的数据
 * -- 当前在第几页*/
function getPageTotal(){
    var totalpage = document.getElementById("totalpage");
    var numberBlock = document.getElementById("numberBlock");
    myAjax("get","/getPageTotal.do","",function(){
        // console.log(xhr.responseText);
        var data = JSON.parse(xhr.responseText);
        pageTotal = data;
        totalpage.innerHTML = currentPage+"/"+data;
//            console.log(data[0].totalcount)
        //生成页码
        //作业: 点击页码要显示对应的数据
        for(var i=1;i<=data;i++){
            numberBlock.innerHTML += "<a class='btnn' href='javascript:'>"+i+"</a>"
        }
    },false)
}

// $(".btnn").click(function () {
//     $(this)
//     console.log($(this)+1)
// })

$(document).on("click",".btnn",function(){
    var gg= $(this).html();
    var currentPage=gg;
    myAjax("get","/seachPeople.do","currentPage="+currentPage,Data,false)
});
