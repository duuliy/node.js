/**
 * Created by Administrator on 2017/11/15 0015.
 */
//查找用户是否存在
function findUser(){
    $.ajax({
        type:"get",
        url:"/findUser.do",
        data:{
            username:$("#username").val()
        },
        success:function(data){
            if(data=="账号不存在"){
                $("#userEx").html("账号不存在,请重新输入")
            }else{
                $("#userEx").html("请输入密码")
            }
        }
    })
}
function reWrite(){
    $("#userEx").html("请输入验证码")
}
window.onload = getCode;
//验证用户
function checkUser(){
    $.ajax({
        type:"post",
        url:"/checkUser.do",
        data:{
            username:$("#username").val(),
            password:$("#password").val(),
            code:$("#code").val()
        },
        success:function(data){
            console.log(data.length);
            console.log(data);
            if(data=="登录出错，请重新登录"||data=="验证码错误"){
                $("#userEx").html(data);
            }else{
                location.href='person.html'
            }
        }
    })
}
//光标聚焦时，清空数据
function cleanMess(){

}
//获取图片验证码
function getCode(){
    console.log(" in code");
    $.ajax({
        type:"get",
        url:"/getCode.do",
        success:function(data){
            console.log(data);
            getContext(data)
        }
    })
}
//将图片验证码，使用canvas画布转成图片
function getContext(code){
    let drawing = document.getElementById("codeImg");
    if(drawing.getContext){
        let context = drawing.getContext("2d");
        context.font = "bold 70px Arial";
        context.textAlign = "center";
        context.textBaseline = "top";
        context.fillText(code,130,70);
    }
}
//换图片验证码
$(".changeCode").click(function(){
    let drawing = document.getElementById("codeImg");
    if(drawing.getContext) {
        let context = drawing.getContext("2d");
        context.clearRect(0, 0, 1000, 300);
    }
    getCode();
});