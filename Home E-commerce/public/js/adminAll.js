//张云峰

var id;
//搜索
$('#getAdmin').click(function () {
    getAdmin();
});


//修改状态
$(document).on('click','.stateBtn', function () {
    var data = ('id='+$(this).parent().parent().children().eq(1).text()) + '&state=' + $(this).attr('state');
    setState(data,$(this));
});


//修改按钮
$(document).on('click','.setBtn', function () {
    id = 'id='+$(this).parent().parent().children().eq(1).text();
    var ele = $('.setForm').find('input');
    setAdmin(id,ele);
});


//修改保存
$('#set_tag .prese').click(function () {
    let dataStr = id + '&' +  $('.setForm').serialize();
    addAdmin(dataStr,$('#set_tag'),$('.setForm input[name=phone]'))
});


//新增保存
$('#add_tag .prese').click(function () {
    addAdmin($('.addForm').serialize(),$('#add_tag'),$('.addForm input[name=phone]'));
});


function getAdmin(){
    $.ajax({
        type:"post",
        dataType:"json",
        url:"/getAdmin.do",
        data:$('form').eq(0).serialize(),
        success:(data)=>{
            if(data.flag==1){
                var str = '';
                for(var i=0;i<data.message.length;i++){
                    str += '<tr>'+
                        '<th><input type="checkbox"></th>'+
                        '<td>'+data.message[i].a_id+'</td>'+
                        '<td>'+data.message[i].a_name+'</td>'+
                        '<td>'+data.message[i].a_tel+'</td>'+
                        '<td>'+new Date(data.message[i].createtime).toLocaleDateString()+'</td>'+
                        '<td>'+data.message[i].create+'</td>';

                    if(data.message[i].state==1){
                        str +=  '<td>启用</td>'+
                                '<td>'+
                                '<button class="btn btn-sm btn-success setBtn" data-toggle="modal" data-target="#set_tag">修改</button>'+
                                '<button class="btn btn-sm btn-danger stateBtn" state="0">禁用</button>'+
                                '</td>'+
                                '</tr>'
                    }else{
                        str +=  '<td>禁用</td>'+
                                '<td>'+
                                '<button class="btn btn-sm btn-success setBtn" data-toggle="modal" data-target="#set_tag">修改</button>'+
                                '<button class="btn btn-sm btn-primary stateBtn" state="1">启用</button>'+
                                '</td>'+
                                '</tr>'

                    }
                }
                $('tbody').html(str);
            }else if(data.flag==-1){
                $('tbody').html(data.message);
            }
        }
    })
}
function setAdmin(id,ele){
    $.ajax({
        type:"post",
        dataType:"json",
        url:"/setAdmin.do",
        data:id,
        success:(data)=>{
            if(data.flag==1){
                var dataArr = [];
                for(var i=0;i<data.message.length;i++){
                    for(var key in data.message[i]){
                        if(key=="a_name"||key=="a_pwd"||key=="a_tel"){
                            dataArr.push(data.message[i][key]);
                        }
                    }
                }
                for(var i=0;i<ele.length;i++){
                    ele[i].value=dataArr[i];
                }
            }
        }
    })
}
function addAdmin(parameter,scs,err){
    $.ajax({
        type:"post",
        dataType:"json",
        url:"/addAdmin.do",
        data:parameter,
        success:(data)=>{
            if(data.flag==1){
                scs.modal('hide');
                getAdmin();
            }else if(data.flag==-1){
                err.attr('placeholder',data.message).val('');
            }
        }
    })
}
function setState(id,ele){
    $.ajax({
        type:"post",
        url:"/setState.do",
        dataType:"json",
        data:id,
        success:data=>{
            if(data.flag==1){
                if(data.message==1){
                    ele.attr('state','0').removeClass('btn-primary').addClass('btn-danger').html('禁用');
                    ele.parent().prev().html('启用')
                }else{
                    ele.attr('state','1').removeClass('btn-danger').addClass('btn-primary').html('启用')
                    ele.parent().prev().html('禁用')
                }
            }
        }
    })
}

