/**
 * Created by jcdn on 2017/11/14.
 * 创建人：熊为鑫
 * 角色管理
 */
let currentId;
let queryok=false;
let isupdate=false;
let conutFenye=1;
let allpage;
//查询
roleQuery();
function roleQuery(fenye=1){
    conutFenye=fenye;
    //var role_name = document.getElementById("role_name").value;
    var role_name = $("#role_name").val();
    //var role_script = $("#role_script").val();
    var role_state = $("#role_state").val();
    var querydetail={role_name:role_name,role_state:role_state,conutFenye:conutFenye};
    console.log('哈哈',querydetail);
    console.log("角色名 ",role_name, "标签状态",role_state);
    $.ajax({
        url:"/queryRole",
        type:"get",
        data:{querydetail:querydetail},
        success:suces
    })
}
//上一页、下一页
function next()
{
    conutFenye++;
    if(allpage<conutFenye)
    {
        conutFenye=allpage
    }
    roleQuery(conutFenye);
    return false;
}
function pre()
{
    conutFenye--;
    if(conutFenye<1)
    {
        conutFenye=1;
    }
    roleQuery(conutFenye);
    return false;
}
function suces(ddata){
    //var data = JSON.parse(xhr.responseText);
    list=ddata.data
    if(list.length>0){
        $("#dataRole-table").html(
            "<table>"+
            "<tr>"+
            "<th>角色标识</th>"+
            "<th>角色名称</th>"+
            "<th>角色权限描述</th>"+
            "<th>角色备注信息</th>"+
            "<th>创建时间</th>"+
            "<th>创建人</th>"+
            "<th>角色状态</th>"+
            "<th>操作</th>"+
            "</tr>"+
            "<table>");
        for(var i=0;i<list.length;i++)
        {
            let state_cole="";
            let upstate="";
            if(list[i].state==1)
            {
                state_cole="<td>启用</td>";
                upstate="<button class='btn btn-sm btn-danger' onclick='enduse("+list[i].r_id+")'>禁用</button>"
            }else{
                state_cole="<td>禁用</td>";
                upstate="<button class='btn btn-sm btn-primary' onclick='startuse("+list[i].r_id+")'>启用</button>"
            }
            $("#dataRole-table").append(
                "<tr data-id='"+list[i].r_id+"'>"+
                "<td>"+list[i].r_id+"</td>"+
                "<td>"+list[i].r_name+"</td>"+
                "<td>"+list[i].r_jur+"</td>"+
                "<td>"+list[i].r_remark+"</td>"+
                "<td>"+new Date(list[i].createtime).toLocaleDateString()+"</td>"+
                " <td class='center'>"+list[i].a_name+"</td>"+
                //" <td class='center'>"+list[i].state+"</td>"+
                state_cole+"<td> <button class='btn btn-sm btn-success' data-toggle='modal'  onclick='insert_Role("+list[i].r_id+")'>修改</button>"+
                upstate+"</td> </tr>"
            )
        }
        //分页
        let pages=Math.ceil(ddata.total/5);
      //console.log(pages)
        allpage=pages;
        $("#preUl").html("");
        if(pages>1)
        {
            //console.log("有页数");
            $("#preUl").append('<li class="paginate_button previous"> <a  onclick="pre()">上一页</a> </li> <li class="paginate_button next" id="next"> <a  onclick="next()">下一页</a> </li>')
        }
        for(var i=0;i<pages;i++)
        {
            $("#next").before('<li class="paginate_button"><a onclick="roleQuery('+(i+1)+')" class="ball">'+(i+1)+'</a></li>')
        }
        $("#preUl").find(".ball").eq(conutFenye-1).css({"background":"#337ab7","color":"white"});
        //console.log( $("#preUl").find(".ball").eq(conutFenye-1))
    }else{
        $("#dataRole-table").html("<tr>"+
            "<th>角色标识</th>"+
            "<th>角色名称</th>"+
            "<th>角色权限描述</th>"+
            "<th>角色备注信息</th>"+
            "<th>创建时间</th>"+
            "<th>创建人</th>"+
            "<th>角色状态</th>"+
            "<th>操作</th>"+
            "</tr>")
        $("#dataRole-table").append("没有查询到数据")
    }
}
//验证标签名称
$(".role_name").blur((e)=>{
    if($(e.target).val()=="")
    {
        $(e.target).parents(".form-group").next().css({"display":"block"})
        //console.log( $(this).parents(".form-group").next())
        $(e.target).parents(".form-group").next().find("label").html("标签名称不能为空")
        queryok=false;
    }else if(!/^[\u4e00-\u9fa5][\u4e00-\u9fa5a-zA-Z\d]+$/.test($(e.target).val()))
    {
        $(e.target).parents(".form-group").next().css({"display":"block"})
        //console.log( $(this).parents(".form-group").next())
        $(e.target).parents(".form-group").next().find("label").html("标签名必须为中文开头")
        queryok=false;
    }else{
        $(e.target).parents(".form-group").next().css({"display":"none"})
    }
    var datatr={tagname:$(e.target).val()}
    if(isupdate)
    {
        datatr.currentId=currentId;
    }
    $.ajax(
        {
            url:"/validatecun",
            type:"post",
            data:datatr,
            success(data){
                let conti=true;
                if(parseInt(data)==1)
                {
                    conti=false;
                    $(e.target).parents(".form-group").next().css({"display":"block"})
                    $(e.target).parents(".form-group").next().find("label").html("标签名已经存在，请重新输入")
                }
            }
        }
    )
})
//新增
function roleAdd(){
    isupdate=false;
    queryok=false;
}
function addRolesave(obj) {
    var parents = $(obj).parents("#add_role");
    queryok = true;
    //验证
    //validate(parents).then((queryok)=> {
    //    console.log("验证的值为", queryok)
    //    if (queryok) {
            var addtag = {};
            var tagname = $("#add_rolename").val();
            addtag.tagname = tagname;
            //console.log("标签吗",tagname)
            var gid = $("#add_rolescript").val();
            addtag.gid = gid;
            var rmark = $("#add_roleremark").val();
            addtag.rmark = rmark;
            var checbox = parents.find(".checkboxbox");
            for (var i = 0; i < checbox.length; i++) {
                if (checbox.eq(i)[0].checked) {
                    addtag.state = checbox.eq(i).val();
                    //console.log("当前的状态", addtag.state)
                    break;
                }
            }
            $.ajax({
                url: "/addRole",
                type: "post",
                data: {addtag: addtag},
                success(list){
                    //console.log(list);
                    let state_cole="";
                    let upstate="";
                    if(list[0].rstate==1)
                    {
                        state_cole="<td>启用</td>";
                        upstate="<button class='btn btn-sm btn-danger' onclick='enduse("+list[0].r_id+")'>禁用</button>"
                    }else{
                        state_cole="<td>禁用</td>";
                        upstate="<button class='btn btn-sm btn-primary' onclick='startuse("+list[0].r_id+")'>启用</button>"
                    }
                    $("#dataRole-table").append(
                        "<tr data-id='"+list[0].r_id+"'>"+
                        "<td>"+list[0].r_id+"</td>"+
                        "<td>"+list[0].r_name+"</td>"+
                        "<td>"+list[0].r_jur+"</td>"+
                        "<td>"+list[0].r_remark+"</td>"+
                        "<td>"+new Date(list[0].createtime).toLocaleDateString()+"</td>"+
                        " <td class='center'>"+list[0].a_name+"</td>"+
                        //" <td class='center'>"+list[i].state+"</td>"+
                        state_cole+"<td> <button class='btn btn-sm btn-success' data-toggle='modal'  onclick='insert_Role("+list[0].r_id+")'>修改</button>"+
                        upstate+"</td> </tr>"
                    )
                }
            })
            $('#add_role').modal('hide');
    //    } else {
    //        $('#add_role').modal('show')
    //    }
    //})
}
function insert_Role(id){
    isupdate=true;
    currentId=id;
    queryok=false;
    let querydetail={id:id};
    $.ajax({
        url:"/queryRole",
        type:"get",
        data:{querydetail:{id:id}},
        success(data)
        {
            //console.log("根据id查询到的数据为",data)
            $("#insert_name").val(data[0].r_name);
            $("#insert_script").val(data[0].r_jur );
            $("#insert_remark").val(data[0].r_remark );
            $("#update_statechebox").find("input[value='"+data[0].state+"']")[0].checked=true;
        }
    });
    $('#insert_rolemodele').modal('show')
}
//修改
function insertSave(obj){
    //console.log(11111);
    var parents=$(obj).parents("#insert_rolemodele");
    queryok=true;
    //验证
            var uptagtag={};
            uptagtag.r_id=currentId;
            var tagname=$("#insert_name").val();//角色名
            uptagtag.tagname=tagname
            //console.log("角色名",tagname)
            var script=$("#insert_script").val();//权限名
            uptagtag.script=script;
            var remark=$("#insert_remark").val()//备注
            uptagtag.remark=remark;
            var checbox=parents.find(".checkboxbox");//启用禁用
            for(var i=0;i<checbox.length;i++)
            {
                if(checbox.eq(i)[0].checked)
                {
                    uptagtag.state=checbox.eq(i).val();
                    break;
                }
            }
            $.ajax({
                url:"/InsertupRole",
                type:"post",
                dataType:"json",
                data:{uptagtag:uptagtag},
                success(data){
                    //console.log("修改的数据为", $("tr[data-id='"+currentId+"']"));
                    $("tr[data-id='"+currentId+"']").find("td").eq(1).html(data[0].r_name);
                    $("tr[data-id='"+currentId+"']").find("td").eq(2).html(data[0].r_jur);
                    $("tr[data-id='"+currentId+"']").find("td").eq(3).html(data[0].r_remark);
                    $("tr[data-id='"+currentId+"']").find("td").eq(6).html(data[0].state);
                    if(data[0].state==1)
                    {
                        $("tr[data-id='"+currentId+"']").find("td").eq(6).html("启用")
                        $("tr[data-id='"+currentId+"']").find("button").eq(1).html("禁用")
                        $("tr[data-id='"+currentId+"']").find("button").eq(1).attr("class","btn btn-sm btn-danger")
                        $("tr[data-id='"+currentId+"']").find("button").eq(1).attr("onclick","enduse("+currentId+")")
                    }else{
                        $("tr[data-id='"+currentId+"']").find("td").eq(6).html("禁用")
                        $("tr[data-id='"+currentId+"']").find("button").eq(1).html("启用")
                        $("tr[data-id='"+currentId+"']").find("button").eq(1).attr("class","btn btn-sm btn-primary")
                        $("tr[data-id='"+currentId+"']").find("button").eq(1).attr("onclick","startuse("+currentId+")")
                    }
                }
            })
            $('#insert_rolemodele').modal('hide')
}

//验证ajax
function validtateajax(parent)
{
    return new Promise((resolve,reject)=>{
        $.ajax(
            {
                url:"/valiRolecun",
                type:"post",
                data:{tagname:parent.find(".role_name").val()},
                success(data){
                    if(parseInt(data)==1)
                    {
                        //console.log("查询是否存在");
                        parent.find(".role_name").parents(".form-group").next().css({"display":"block"});
                        parent.find(".role_name").parents(".form-group").next().find("label").html("角色名已经存在，请重新输入")
                        resolve()
                    }else{
                        parent.find(".role_name").parents(".form-group").next().css({"display":"none"});
                        resolve()
                    }
                }
            }
        )
    })
}

//启用
function startuse(id)
{
    var updateUse={id:id,isqi:1,usehtml:"启用",usebuttonhtml:"禁用",useClass:"btn btn-sm btn-danger",onclickvalue:"enduse("}
    sendstartuse(updateUse)

}
function enduse(id)
{
    var updateUse={id:id,isqi:0,usehtml:"禁用",usebuttonhtml:"启用",useClass:"btn btn-sm btn-primary",onclickvalue:"startuse("}
    sendstartuse(updateUse)
}

function sendstartuse(updateUse)
{
    $.ajax({
        url:"/opendownUse",
        type:"post",
        data:{tagid:updateUse.id,isqi:updateUse.isqi},
        success(data){
            if(data=="ok")
            {
                $("tr[data-id='"+updateUse.id+"']").find("td").eq(6).html(updateUse.usehtml);
                $("tr[data-id='"+updateUse.id+"']").find("button").eq(1).html(updateUse.usebuttonhtml);
                $("tr[data-id='"+updateUse.id+"']").find("button").eq(1).attr({"class":updateUse.useClass,"onclick":updateUse.onclickvalue+updateUse.id+")"})

            }else{
                alert("发生错误",data)
            }
            //console.log(data)
        }
    })
}
