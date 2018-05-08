

function updatecolor(obj){
    colorid=$(obj).parent().prev().prev().text();
}

function quedcolor(){
    console.log("1111")
    var colid=$("#colid").attr("placeholder");
    var name=$("#color").val();

    console.log("biah"+colid);
    console.log("yanse"+name);
    $.ajax({
        type:"post",
        url:"/colorupdatetwo.do",
        dataType:"json",
        data:{
             "name":name,
             "colid":colid
        },
        success:function(data){
            location.href="/color"
        }
    })
}