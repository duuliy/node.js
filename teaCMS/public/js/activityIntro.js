/**
 * Created by SDL on 2017/11/14 0014.
 */
window.onload = getPageTotal();
var totalpage;
var currentpage = 1;
var query = "";
var deletePos;
var newStatus;
var editPos;
var data;

function getPageTotal(){
    Ajax("get","/act_getPageTotal.do","currentpage="+currentpage+"&"+query,function() {
        let result = xhr.responseText;
        let a = JSON.parse(result);
        totalpage = a.data;
        page(totalpage);
        getData();
    });
}

function page(totalpage){
    let str = "<li><span class='proPage' onclick='prePage()'>&#8249;</span></li>";
    for(let i = 0 ; i < totalpage ; i++){
        str += "<li><span class='pageNum' onclick='changePage("+(i+1)+")'>"+ (i+1) +"</span></li>";
    }
    str += "<li><span class='nextPage' onclick='nextPage()'>&#8250;</span></li>";
    $(".pagination ul").html(str);
    $(".pagination span").mouseenter(function(){$(this).css("cursor","pointer")});
}

function getData(){
    let str = "";
    Ajax("get","queryActivity.do","currentpage="+currentpage+"&"+query,function(){
        let result = JSON.parse(xhr.responseText);
        data = result.data;
        for(let i = 0 ; i < data.length ; i++){
            var status;
            if(data[i].act_condition==1){
                status="已开启";
            }else {
                status="已关闭";
            }
            str +=  "<tr class='ted'>" +
                "<td>" + data[i].act_id + "" +
                "<input type='checkbox' />" +
                "</td>" +
                "<td>" + data[i].act_detail + "</td>" +
                "<td>" + data[i].act_date+"</td>" +
                "<td>" + data[i].act_place + "</td>" +
                "<td>" + data[i].act_personcount + "</td>" +
                "<td>" + status + "</td>" +
                "<td>" +
                    " <ul class='actions'>"+
                "<li><a type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#editModal' onclick='getEditPos("+i+","+data[i].act_id+")'>编辑</a></li>" +
                "<li class='last'><a type='button' class='btn btn-default btn-lg' data-toggle='modal' data-target='#deleteModal' onclick='getDeletePos("+data[i].act_id+","+data[i].act_condition+")'>更改</a></li>" +
                    "</ul>"+
                "</td>" +
                "</tr>";
        }
        $("tbody").html(str);
    });
}

function changePage(index){
    currentpage = index;
    getData();
}

function prePage(){
    if(currentpage === 1){
        getData();
    }else{
        currentpage--;
        getData();
    }
}

function nextPage(){
    if(currentpage === totalpage){
        getData();
    }else{
        currentpage++;
        getData();
    }
}

function getEditPos(index,id){
    editPos = id;
    $("#editForm .editDetail").val(data[index].act_detail);
    $("#editForm .editDate").attr('value',data[index].act_date);
    $("#editForm .editPlace").val(data[index].act_place);
    $("#editForm .editCount").val(data[index].act_personcount);
}

function getDeletePos(index,mystu){
    console.log("pos:"+index);
    if(mystu==1){
        newStatus=0;
    }else{
        newStatus=1;
    }
    deletePos = index;
}

function deleteData(){
    Ajax("get","/deleteActivity.do","id="+deletePos+"&status="+newStatus,function() {
        let result = xhr.responseText;
        let a = JSON.parse(result);
        console.log(a);
        getData();
    });
}

function editDate(){
    let data= $("#editForm").serialize();
    Ajax("get","/updateActivity.do",data+"&id="+editPos,function() {
        let result = xhr.responseText;
        let a = JSON.parse(result);
        console.log(a);
        getData();
    });
}

$("#search").click(function(){
    query = $("#queryForm").serialize();
    currentpage=1;
    getData();
    getPageTotal();
});

$("#addBtn").click(function(){
    let params = $("#addForm").serialize();
    Ajax("get","addActivity.do",params,function(){
        let result = JSON.parse(xhr.responseText);
        console.log(result);
        $("#addModal").modal('hide');
        getData();
    })
});

$("#deleteBtn").click(function(){
    console.log("确认删除");
    deleteData();
    $("#deleteModal").modal("hide");
});

$("#saveEditBtnBtn").click(function(){
    console.log("确认修改");
    editDate();
    $("#editModal").modal("hide");
});