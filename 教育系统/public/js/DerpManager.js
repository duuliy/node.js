
var request = new XMLHttpRequest();
request.open("get", "depMan.do", true);
request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
        var data = JSON.parse(request.responseText);
        Data(data);
    }
};
request.send(null);


var s = -1;
var liebiao = 0;
/*默认显示的数据*/
var depArr = window.top.depArr;
var peopleArr=window.top.peopleArr;

function Data(data){
    for (var i = 0; i < data.length; i++) {
        liebiao++;
        var str = '<tr class="query">' +
            '<td><input type="checkbox" class="items"></td>' +
            '<td class="ct">'+data[i].depNo+'</td>' +
            '<td class="ct">'+data[i].depName+'</td>' +
            '<td class="ct">'+data[i].roleDes+'</td>' +
            '<td class="ct">'+data[i].depNum+'</td>' +
            '<td class="ct">'+data[i].depBz+'</td>' +
            '<td><button type="button" class="Ope">修改&nbsp;&nbsp;</button>' +
            '<button type="button" class="Del">删除</button></td>' +
            '</tr>';
        if(data.length>1){
            $("#tfoot").append(str);
        }else{
            $("#tfoot").html(str);
        }
        var strs="<option>"+data[i].depName+"</option>";//等待人员管理
        $(".gangwei").append(strs)
    }
}

/*修改数据*/
var Operate = $(".Ope");
    /*单击修改获取修改数据的值*/
    $(document).on("click", ".Ope", function () {
        var id = $(this).parent().parent().children(":eq(1)").text();
        var bm = $(this).parent().parent().children(":eq(2)").text();
        var zhuguan = $(this).parent().parent().children(":eq(3)").text();
        var bz = $(this).parent().parent().children(":eq(5)").text();

        window.location.href = "addDerpartment.html?id=" + id + "&bm=" + bm + "&zhuguan=" + zhuguan + "&bz=" + bz;
});

/*删除信息*/
$(document).on("click", ".Del", function () {
    if (confirm("确认删除吗？")) {
        var id = $(this).parent().parent().children(":eq(1)").text();
        $(this).parent().parent().remove();
        var request = new XMLHttpRequest();
        request.open("get", "deletedep.do?id=" + id, true);
        request.send(null);
    }
});

/*新增信息*/
$("#addDerpartmentbtn").click(function () {
    window.location.href = "addDerpartment.html";
});
/*全选*/
$(".allcheck").click(function () {
    if ($(this).prop("checked")) {
        $(".items").prop("checked", true);
        $(".items").attr("checked", true);

    } else {
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
});
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
                for (var i = 0; i < depArr.length; i++) {//遍历数组
                    if (id == depArr[i].depNo) {
                        depArr.splice(i, 1);//删除数组中对应选中的复选框的对象
                    }
                }
            }
        });
    }
});
/*查询信息*/
$("#search").click(function () {//给查询按钮设单击事件
    var name = $(".name").val();//获取查询信息框的值
    var count = 0;//计数后面判断数组中没有此人，

    var request = new XMLHttpRequest();
    request.open("get", "seachdep.do?depName=" + name);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var data =JSON.parse( request.responseText);
            Data(data);
        }
    };
    request.send(null);
});