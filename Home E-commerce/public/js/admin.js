$('.setInfoBtn').click(function () {
    $('.viewInfo').addClass('hideInfo');
    $('.setInfo').removeClass('hideInfo');
});

$('.iBtn').click(function () {
    $('.setInfo').addClass('hideInfo');
    $('.viewInfo').removeClass('hideInfo');
});


$('.adminFile').change(function () {
    var img = $('.userImg img');
    var input = $('.adminFile').prop('files');
    var file = new FileReader;
    file.addEventListener('load', function () {
        img.attr('src',file.result)
    });
    file.readAsDataURL(input[0]);
});

$('.pwdInput').blur(function () {
    var pwd = 'pwd=' + $(this).val();
    getPwd(pwd)
});


//修改保存按钮
$('.PresBtn').click(function () {
    var formData = $('.setInfo').serialize();
    var input = $('.adminFile').prop('files');
    var fileData = new FormData();
    formData = formData + '&file=uploadimg/adminimg/' + input[0].name;
    fileData.append('file',input[0]);
    upfile(fileData);
    setInfo(formData);
});

function getPwd(parmas){
    $.ajax({
        url: '/getPwd.do',
        type: 'POST',
        data: parmas,
        dataType:"json",
        success:function (data){
            if(data.flag==-1){
                $('.PresBtn').attr('disabled','disabled');
                $('.pwdInput').val('').attr('placeholder','密码错误');
            }else{
                $('.PresBtn').removeAttr('disabled');
            }
        }
    })
}

function setInfo(formData){
    $.ajax({
        url: '/setInfo.do',
        type: 'POST',
        data: formData,
        dataType:"json",
        success:function (data){
            if(data.flag==1){
                $('.userImg').attr('src',data.message[0].a_headimg);
                $('.username').html(data.message[0].a_name);
                $('.phone').html(data.message[0].a_tel);
            }
        }
    })
}
function upfile(fileData){
    $.ajax({
        url: '/upfile.do',
        type: 'POST',
        data: fileData,
        cache: false,
        processData: false,
        contentType: false
    })
}

