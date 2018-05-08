/**
 * Created by Administrator on 2017/11/14.
 */
var id
function updatemyGuig1(obj){
    id=$(obj).parent().parent().find("td:eq(0)").text();
}
function updateGg(){
    var size=$("#size").val();
    var guiGid=$("#guiGid").attr("placeholder");
    console.log(size);
    console.log(guiGid);
    $.ajax({
        type:"post",
        url:"standardsUpdate2",
        dataType:"json",
        data:{
            "guiGid":guiGid,
            "size":size
        },
        success:function(data){
          if(data) {
              location.href = "/standards.do";
          }
        }
    });
}
function updateGg2(){
    location.href="/standards"
}

//=================================================add
function addGg(){
    var size=$("#size").val();
    console.log(size);
    $.ajax({
        type:"post",
        url:"standardsadd",
        dataType:"json",
        data:{
            "size":size
        },
        success:function(data){
            if(data){
                location.href="/standards.do"
            }
        }
    });
}