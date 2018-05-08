/**
 * Created by Administrator on 2017/11/19 0019.
 */
function getCheckNum(){
    $.ajax({
        type:"post",
        url:"/getCheckNum.do",
        data:{
            phone:$("#phone").val()
        },
        success:function(data){
            console.log(data);
            $("#messS").html(data);
        }
    })
}


function sureS(){
    var oddPassword = $("#checkCode").val();
    var newPassword = $("#NewPassword").val();
    if(oddPassword==newPassword){
        $("#something").html("");
       $("#sureC").on("click",function(){
           $.ajax({
               type:"post",
               url:"/findPassword.do",
               data:{
                   newPassword:$("#NewPassword").val(),
                   bossId:$("#bossId").val(),
                   checkNum:$("#checkNum").val(),
                   phone:$("#phone").val()
               },
               success:function(data){
                   console.log(data);
                   if(data=="修改成功"){
                       setTimeout(function(){
                           location.href='login.html'
                       },3000)
                   }
               }
           })
       })
    }else{
        $("#something").html("两次密码不相同，请重新输入")
    }
}