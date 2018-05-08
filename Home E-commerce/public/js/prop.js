/*创建人：余静婷
 创建时间：2017-11-16*/
var pageNum = 1;

//全选
$("#selectAll").on("click",function() {
    $("tbody tr td input").each(function(i, e) {
        if(e.checked) {
            e.checked = false;
        } else {
            e.checked = true;
        }
    });
});

//搜索
$("#search").on("click",function () {
    $.ajax({
        url:"/searchProp.do",
        data:$("#searchForm").serialize()+"&pageNum="+pageNum,
        dataType:"json",
        type:"get",
        success:(data)=>{
            if(data.result==1) {
                let str = view.propInfo(data.list);
                let pageStr = view.pageInfo(data.pageTotal);
                $(".propTable tbody").html(str);
                $(".ulBox").html(pageStr);
            } else {
                $(".propTable tbody").html("<div style='margin: 10px; width: 200px'>未找到商品信息</div>");
            }
        }
    });
});

//分页
$(".pagination").on("click",".next",function () {
    pageNum ++;
    var len = $(this).parent().children(".perNum").length;
    if(pageNum>len) {
        pageNum = len;
    }
    $("#search").click();
});

$(".pagination").on("click",".previous",function () {
    pageNum --;
    if(pageNum<1) {
        pageNum = 1;
    }
    $("#search").click();
});

$(".pagination").on("click",".perNum",function () {
    pageNum = parseInt($(this).find("a").html());
    $("#search").click();
});

//新增
$("#addProp").on("click",function () {
    $.ajax({
        url:"/addProp.do",
        type:"post",
        data:$(".addPropForm").serialize(),
        dataType:"json",
        success:(msg)=>{
            if(msg.result) {
                toastr.success("新增成功");
                $("#addPropModal").modal("hide");
            } else {
                toastr.error("新增失败");
            }
        }
    });
});

//更新
var updateId;
$(".propTable tbody").on("click",".updateBtn",function () {
    let tr = $(this).parent().parent().children();
    updateId = tr.eq(1).text();
    $(".updatePropForm input[name=g_p_name]").val(tr.eq(2).text());
    $(".updatePropForm select[name=g_p_prop]").val(tr.eq(3).attr("data-value"));
    $("#updatePropModal").modal("show");
});

$("#updateProp").on("click",function () {
   $.ajax({
       url:"/updateProp.do",
       type:"post",
       data:$(".updatePropForm").serialize()+"&g_p_id="+updateId,
       dataType:"json",
       success:(msg)=>{
           if(msg.result) {
               toastr.success("更新成功");
               $("#updatePropModal").modal("hide");
           } else {
               toastr.error("更新失败");
           }
       }
   });
});

//启用、禁用
$(".propTable tbody").on("click",".state",function (e) {
    let g_p_id = $(this).parent().parent().children().eq(1).text();
    let td = $(this).parent().parent().children().eq(6);
    let state;
    if($(e.target).hasClass("delState")) {
        state = 0;
    } else {
        state = 1;
    }

    $.ajax({
        url:"/updateProp.do",
        type:"post",
        data:{"state":state,"g_p_id":g_p_id},
        dataType:"json",
        success:(msg)=>{
            if(msg.result) {
                if(state) {
                    toastr.success("启用成功");
                    let str = '<button class="btn btn-sm btn-danger state delState">禁用</button>';
                    $(this).replaceWith(str);
                    td.html("启用");
                } else {
                    toastr.success("禁用成功");
                    let str = '<button class="btn btn-sm btn-primary state setState">启用</button>';
                    $(this).replaceWith(str);
                    td.html("禁用");
                }
            } else {
                toastr.error("设置失败");
            }
        }
    });
});


const view = {
    pageInfo(num){
        let str = ""
        for(let i=0; i<num; i++){
            str += '<li class="paginate_button perNum"><a href="javascript:">' + (i+1) + '</a></li>';
        }
        str = '<li class="paginate_button previous"> <a href="javascript:">上一页</a> </li>'+
            str +
            '<li class="paginate_button next"> <a href="javascript:">下一页</a> </li>';

        return str;
    },

    propInfo(data){
        let str = "";
        for(let i=0; i<data.length; i++) {
            let propStr;
            let propState;
            let stateStr;

            if(data[i].g_p_prop == 1) {
                propStr = "<td data-value='"+ 1 +"'>颜色</td>";
            } else {
                propStr = "<td data-value='"+ 2 +"'>尺寸</td>" ;
            }

            if(data[i].state == 1) {
                propState = "启用";
                stateStr = '<button class="btn btn-sm btn-danger state delState">' +
                                '禁用' +
                            '</button>';
            } else {
                propState = "禁用";
                stateStr = '<button class="btn btn-sm btn-primary state setState">' +
                                '启用' +
                            '</button>';
            }

            str += "<tr>" +
                        "<td><input type='checkbox'/></td>" +
                        "<td>" + data[i].g_p_id + "</td>" +
                        "<td>" + data[i].g_p_name + "</td>" +
                        propStr +
                        "<td>" + data[i].a_name + "</td>" +
                        "<td>" + new Date(data[i].createtime).toLocaleDateString() + "</td>" +
                        "<td>" + propState + "</td>" +
                        "<td>" +
                            "<button class='btn btn-sm btn-success updateBtn'>修改</button>   " +
                            stateStr +
                        "</td>" +
                   "</tr>"
        }

        return str;
    }
}
