/**
 * Created by SDL on 2017/11/15 0015.
 */

var totalpage;
var currentpage = 1;
var query = "";
var data;

window.onload = getPageTotal();

function getPageTotal(){
    Ajax("get","/applyGetPageTotal.do","currentpage="+currentpage+"&"+query,function() {
        let result = xhr.responseText;
        let a = JSON.parse(result);
        console.log(a);
        totalpage = a.data;
        console.log(totalpage);
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
    Ajax("get","applyQueryActivity.do","currentpage="+currentpage+"&"+query,function(){
        let result = JSON.parse(xhr.responseText);
        let condition = "";
        data = result.data;
        for(let i = 0 ; i < data.length ; i++){
            if(data[i].apply_condition === 1){
                condition = "未过期";
            }else{
                condition = "已过期";
            }
            str +=  "<tr class='ted'>" +
                "<td>" + data[i].apply_id + "" +
                "</td>" +
                "<td>" + data[i].act_detail + "</td>" +
                "<td>" + data[i].user_name+"</td>" +
                "<td>" + data[i].apply_ticket + "</td>" +
                "<td>" + data[i].apply_count + "</td>" +
                "<td>" + condition + "</td>" +
                "<td>" +
                "<ul class='actions'>"+
                "<li class='last'><a type='button' class='btn btn-default btn-lg' data-toggle='modal' data-target='#deleteModal' onclick='getDeletePos("+data[i].apply_id+")'>更改</a></li>" +
                "</ul>"+
                "</td>" +
                "</tr>";
        }
        $("tbody").html(str);
    })
}


function changePage(index){
    console.log("index:"+index);
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

function getDeletePos(index){
    console.log("pos:"+index);
    deletePos = index;
    console.log(index);
}

function deleteData(){
    Ajax("get","/applyDeleteActivity.do","id="+deletePos,function() {
        let result = xhr.responseText;
        let a = JSON.parse(result);
        getPageTotal();
        getData();
    });
}

$("#search").click(function(){
    query = $("#queryForm").serialize();
    getData();
    getPageTotal();
});

$("#deleteBtn").click(function(){
    deleteData();
    $("#deleteModal").modal("hide");
});