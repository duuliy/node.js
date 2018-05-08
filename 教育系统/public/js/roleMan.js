/**
 * Created by admin on 2017/9/30.
 */

//ajax显示数据

var request = new XMLHttpRequest();
request.open("get", "roleMan.do", true);
request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
        var data = JSON.parse(request.responseText);
        arr(data);
    }
};
request.send(null);

//页面显示数据
function arr(data) {
    var role = -1;
    for (var i = 0; i < data.length; i++) {
        var str = '<tr class="interline">' +
            '<td class="line"></td>' +
            '<td class="line"></td>' +
            '<td class="line"></td>' +
            '<td class="line"></td>' +
            '<td><a href="roleManchild.html?id='+data[i].roleNo+'"><button type="button" class="revise">修改</button></a>' +
            '<button type="button" class="del">删除</button>' +
            '</td>' +
            '</tr>';
        if (data.length > 1) {
            $("#tbody").append(str);
        } else {
            $("#tbody").html(str);
        }
        $.each(data[i], function (key) {
            role++;
            $(".line")[role].innerText = data[i][key];
        })
    }
}

// //点击获取修改数据的值
// $(document).on("click", ".revise", function () {
//     var roleNo = $(this).parent().parent().children(":eq(0)").text();
//     var put = $(this).parent().parent().children(":eq(1)").text();
//     var der = $(this).parent().parent().children(":eq(2)").text();
//     var ders = $(this).parent().parent().children(":eq(3)").text();
//     window.location.href = "roleManchild.html?id=" + roleNo + "&put=" + put + "&der=" + der + "&ders=" + ders;
// })

//删除角色信息
$(document).on("click", ".del", function () {
    if (confirm("确认删除吗?")) {
        $(this).parent().parent().remove();
        var put = $(this).parent().parent().children(":eq(0)").text();
        var request = new XMLHttpRequest();
        request.open("get", "deleterole.do?put=" + put, true);
        request.send(null);
    }
});

//查询信息
$(".Search").click(function () {       //给查询按钮设置单击事件
    var num = $("#perNo").val(),
        name = $("#perName").val();
    var request = new XMLHttpRequest();
    document.getElementById("tbody").innerHTML="";
    request.open("get", "seach.do?roleNo=" + num + "&roleName=" + name);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var data = JSON.parse(request.responseText);
            arr(data);
        }
    };
    request.send(null);

});



