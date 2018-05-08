/**
 * Created by Administrator on 2017/11/15 0015.
 */

document.onkeydown = function(e) {
    var e = window.event || arguments[0];
    if (e.keyCode == 13) {
        searchRole();
    }
}

    var nowPage = 1,totalPage;
$(function(){
    getAllData();
});
function getData(data){
    $("#content").html("");
    for(var i = 0;i<data.length;i++){
        if(data[i].role_condition==0){
            role_condition="注销"
        }else{
            role_condition="使用"
        }
        if(data[i].role_porwer==1){
            role_porwer="管理员权限"
        }else{
            role_porwer="超级管理员权限"
        }
        $("#content").append("<tr><td>"+data[i].role_id+"</td>" +
            "<td>"+data[i].role_name+"</td>" +
            "<td>"+role_porwer+"</td>" +
            "<td>"+role_condition+"</td>" +
            "<td> <span><a type='button'  onclick='getRow("+data[i].role_id+")' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#editModal'>编辑</a></span>"+
            " <span><a type='button'  class='btn ' onclick='getRow("+data[i].role_id+")' data-toggle='modal' data-target='#deleteModal'>删除</a></span></td>"+
            "</tr>")
    }
}
function getAllData(){
    $.ajax({
        type:"get",
        url:"/getRole.do",
        data:{
            nowPagec:nowPage
        },
        success:function(data){
            getData(data);
        }
    });
}

window.onload= getTotalPage;
function getTotalPage(){
    $.ajax({
        type:"get",
        url:"/getAllPageRole.do",
        data:{
            roleName:$("#roleName option:selected").text(),
            nowPagec:nowPage
        },
        success:function(data){
            //console.log(data);
            totalPage = data;
            $("#pageFoot").html("");
            if(data==0){
                $("#localPage").html("总共"+0+"/"+totalPage+"页");
            }else{
                $("#localPage").html("总共"+nowPage+"/"+totalPage+"页");
            }
            for(var i = 0 ;i<data;i++){
                $("#pageFoot").append("<span><a onclick='herf(this)'>"+(i+1)+"</a></span>")
            }

        }
    })
}
function prevPage(){
    if(nowPage>1){
        nowPage--;
        if(nowPage<1){
            nowPage=1;
        }
        $("#localPage").html("当前为"+nowPage+"/"+totalPage+"页");
        getAllData();
    }
}
function nextPage(){
    if(totalPage!=1){
        nowPage++;
        if(nowPage>=totalPage){
            nowPage=totalPage;
        }
        $("#localPage").html("当前为"+nowPage+"/"+totalPage+"页");
        getAllData();
    }
}
function herf(obj){
    nowPage= obj.innerText;
    if(totalPage>1){
        $.ajax({
            type:"get",
            url:"/getRole.do",
            data:{
                nowPagec:nowPage
            },
            success:function(data) {
                if(data==0){
                    $("#localPage").html("当前为"+0+"/"+totalPage+"页");
                }else{
                    $("#localPage").html("当前为"+nowPage+"/"+totalPage+"页");
                }
                getData(data);
            }
        });
    }
}
function searchRole(){
    nowPage=1;
    $.ajax({
        type:"get",
        url:"/searchRole.do",
        data:{
            roleName:$("#roleName option:selected").text(),
            nowPagec:nowPage
        },
        success:function(data){
            getData(data);
            getTotalPage();
        }
    })
}
$.ajax({
    type:"get",
    url:"/getRoleName.do",
    success:function(data){
        $("#roleName").html("<option value='0'>角色名称</option>");
        for(var i = 0;i<data.length;i++){
            $("#roleName").append("<option value='"+(i+1)+"'>"+data[i].role_name+"</option>")
        }
    }
});
function nowRole(){
    $.ajax({
        type:"post",
        url:"/newRole.do",
        data:{
            role_name:$("#role_name").val(),
            role_porwer:$("#role_porwer option:selected").text(),
            role_type:$("#role_type option:selected").text()
        },
        success:function(data){
            getAllData();
            getTotalPage();
            $("#newRole input").val("");
        }


    });
}
var row_index;
function deleteRole(){
      $.ajax({
          url:"/deleteRole.do",
          data:{
              role_id:row_index
          },
          success:function(data){
              getAllData();
          }
      })
}

function getRow(index){
    console.log(index);
    row_index = index;
    $.ajax({
        type:"get",
        url:"/getNowMess.do",
        data:{
            role_id:index
        },
        success:function(data){
            $("#role_nameup").val(data[0].role_name);
            if(data[0].role_porwer==1){
                $("#role_porwerup").html("<option value='0'>管理员权限</option><option value='1'>超级管理员权限</option>")
            }else{
                $("#role_porwerup").html("<option value='0'>超级管理员权限</option><option value='1'>管理员权限</option>")
            }
            if(data[0].role_condition==0){
                $("#role_typeup").html("<option value='0'>注销</option><option value='1'>使用</option>")
            }else{
                $("#role_typeup").html("<option value='0'>使用</option><option value='1'>注销</option>")
            }

        }
    })

}
function updateRole(){
    $.ajax({
        type:"get",
        url:"/updateRole.do",
        data:{
            role_id:row_index,
            role_name:$("#role_nameup").val(),
            role_porwer:$("#role_porwerup option:selected").text(),
            role_type:$("#role_typeup option:selected").text()
        },
        success:function(data){
            getAllData();
        }
    })
}
