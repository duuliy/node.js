/*创建人：张云峰*/

//验证
$(".loginForm input[type='text']").blur(function(){
    var user = $(this).val();
    submit('username='+user,$(this),'账号不存在');
});
$('.loginBtn').click(function () {
    submit($('form').serialize(),$(".loginForm input[type='password']"),'密码错误')
});
$(window).keydown(function (e) {
    ((window.event||e).keyCode==13)&&submit($('form').serialize(),$(".loginForm input[type='password']"),'密码错误')
});
$('.input').focus(function () {
    $(this).next().html('');
});
//ajax提交
function submit(parameter,ele,err){
    var results;
    $.ajax({
        type:"post",
        url:"/login.do",
        data:parameter,
        dataType:"json",
        success:data=>{
            if(data.flag==1){
                results = parameter.indexOf('&');
                if(results!=-1){
                    location.href='index';
                }
            }else if(data.flag==-1){
                ele.next().html(err);
                ele.keydown(function () {
                    ele.next().html('')
                })
            }
        }
    })
}

