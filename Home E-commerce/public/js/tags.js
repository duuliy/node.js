/**
 * Created by Administrator on 11/14/2017.
 */
let currentId;
let queryok=false;
let isupdate=false
let curentpage=1;
let allpage;

function updateTag(id){
    isupdate=true;
    currentId=id;
    queryok=false;
    let querydetail={id:id}
    $.ajax({
        url:"/queryTag",
        type:"post",
        data:{querydetail:querydetail},
        success(data)
        {
            console.log("修改",data)
            $("#update_tagname").val(data.data[0].t_name)
            //$("#update_ceg").children("option[value='"+data.data[0].t_g_id+"']")[0].selected=true;
            $("#update_statechebox").find("input[value='"+data.data[0].state+"']")[0].checked=true;
        }

    })




    $('#update_tag').modal('show')

}
query()
//查询
function query(page=1){
    curentpage=page
    var qname=$("#query_tag_name").val();
    var qceg=$("#query_tag_ceg").val();
    var cpeople=$("#query_create_people").val()
    var qstate=$("#query_tag_state").val()
    var querydetail={qname:qname,qceg:qceg,cpeople:cpeople,qstate:qstate,page:page}
    console.log("标签名 ",qname,"所属类别",qceg,
        "创建人",cpeople,"标签状态",qstate)
    $.ajax({
        url:"/queryTag",
        type:"post",
        data:{querydetail:querydetail},
        success:show

    })
    return false;
}
//展示数据
function show(tagsdata){
    if(tagsdata.data.length>0){
        $("#dataTables-example").html("  <tr> <th>标签ID</th> <th>标签名</th> " +
            "<th>所属类别</th> <th>创建时间</th> <th>创建人</th> <th>标签状态</th> " +
            "<th>操作</th> </tr>")
        for(var i=0;i<tagsdata.data.length;i++)
        {
            let g_name_cole="";
            let state_cole="";
            let upstate="";
            if(tagsdata.data[i].g_name==null)
            {
                g_name_cole+="<td>一级类别</td>"
            }else{
                g_name_cole+="<td>"+tagsdata.data[i].g_name+"</td>"
            }
            if(tagsdata.data[i].state==1)
            {
                state_cole="<td>启用</td>"
                upstate="<button class='btn btn-sm btn-danger' onclick='enduse("+tagsdata.data[i].t_id+")'>禁用</button>"
            }else{
                state_cole="<td>禁用</td>"
                upstate="<button class='btn btn-sm btn-primary' onclick='startuse("+tagsdata.data[i].t_id+")'>启用</button>"
            }
            var createdate=new Date(tagsdata.data[i].createtime)
            $("#dataTables-example").append(
            "<tr data-id='"+tagsdata.data[i].t_id+"'>"+
        "<td>"+tagsdata.data[i].t_id+"</td>"+
        "<td>"+tagsdata.data[i].t_name+"</td>"+
            g_name_cole+
               "<td class='center'>"+createdate.getFullYear()+"/"+
            (createdate.getMonth()+1)+"/"+createdate.getDate()+"</td>"+
           " <td class='center'>"+tagsdata.data[i].a_name+"</td>"+
            state_cole+"<td> <button class='btn btn-sm btn-success' onclick='updateTag("+tagsdata.data[i].t_id+")'>修改</button>"+
            upstate+"</td> </tr>"
            )
        }

        let pages=Math.ceil(tagsdata.total/5);
        allpage=pages
        $("#ulBox").html("")
        if(pages>1)
        {
            $("#ulBox").append('<li class="paginate_button previous"> <a  onclick="pre()">上一页</a> </li> <li class="paginate_button next" id="next"> <a  onclick="next()">下一页</a> </li>')
        }
        for(var i=0;i<pages;i++)
        {
            $("#next").before('<li class="paginate_button"> <a onclick="query('+(i+1)+')" class="ball">'+(i+1)+'</a> </li>')
        }
        $("#ulBox").find(".ball").eq(curentpage-1).css({"background":"#337ab7","color":"white"})
        console.log(curentpage)
        console.log( $("#ulBox").find(".ball").eq(curentpage-1))



    }else{
        $("#dataTables-example").html("  <tr> <th>标签ID</th> <th>标签名</th> " +
            "<th>所属类别</th> <th>创建时间</th> <th>创建人</th> <th>标签状态</th> " +
            "<th>操作</th> </tr>")
        $("#dataTables-example").append("没有数据哦")
    }
}
//验证所属类型
$(".tagcegvalidate").blur((e)=>{
    console.log($(e.target).val()=="请选择所属类别")
    if($(e.target).val()=="请选择所属类别")
    {
        $(e.target).parents(".form-group").next().css({"display":"block"})
        console.log( $(this).parents(".form-group").next())
        $(e.target).parents(".form-group").next().find("label").html("请选择类别")
        queryok=false;
    }else{
        $(e.target).parents(".form-group").next().css({"display":"none"})
        queryok=true;
    }

})
//验证标签名称
$(".tagnamevalidate").blur((e)=>{
           if($(e.target).val()=="")
           {
               $(e.target).parents(".form-group").next().css({"display":"block"})
               console.log( $(this).parents(".form-group").next())
               $(e.target).parents(".form-group").next().find("label").html("标签名称不能为空")
               queryok=false;
           }else if(!/^[\u4e00-\u9fa5][\u4e00-\u9fa5a-zA-Z\d]+$/.test($(e.target).val()))
           {
               $(e.target).parents(".form-group").next().css({"display":"block"})
               console.log( $(this).parents(".form-group").next())
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
function next()
{
    curentpage++;
    if(allpage<curentpage)
    {
        curentpage=allpage
    }
    query(curentpage)
    return false;
}
function pre()
{
    curentpage--;
    if(curentpage<1)
    {
        curentpage=1;
    }

    query(curentpage)
    return false;
}
function add(){
    isupdate=false;
    queryok=false;
}
//新增保存
function addsave(obj)
{
    var parents=$(obj).parents("#add_tag")
    queryok=true;
    //验证
   validate(parents).then((queryok)=>{
       console.log("验证的值为",queryok)
       if(queryok)
       {
           var addtag={};
           var tagname=$("#add_tag_name").val();
           addtag.tagname=tagname
           var gid=$("#add_ceg").val();
           addtag.gid=gid;
           var checbox=parents.find(".checkboxbox");
           for(var i=0;i<checbox.length;i++)
           {
               if(checbox.eq(i)[0].checked)
               {
                   addtag.state=checbox.eq(i).val()
                   break;
               }
           }
           $.ajax({
               url:"/addTag",
               type:"post",
               data:{addtag:addtag},
               success(tagsdata){
                   console.log(tagsdata)

                   let g_name_cole="";
                   let state_cole="";
                   let upstate="";
                   if(tagsdata[0].g_name==null)
                   {
                       g_name_cole+="<td>一级类别</td>"
                   }else{
                       g_name_cole+="<td>"+tagsdata[0].g_name+"</td>"
                   }
                   if(tagsdata[0].state==1)
                   {
                       state_cole="<td>启用</td>"
                       upstate="<button class='btn btn-sm btn-danger' onclick='enduse("+tagsdata[0].t_id+")'>禁用</button>"
                   }else{
                       state_cole="<td>禁用</td>"
                       upstate="<button class='btn btn-sm btn-primary' onclick='startuse("+tagsdata[0].t_id+")'>启用</button>"
                   }
                   var createdate=new Date(tagsdata[0].createtime)
                   $("#dataTables-example").append(
                       "<tr data-id='"+tagsdata[0].t_id+"'>"+
                       "<td>"+tagsdata[0].t_id+"</td>"+
                       "<td>"+tagsdata[0].t_name+"</td>"+
                       g_name_cole+
                       "<td class='center'>"+createdate.getFullYear()+"/"+
                       (createdate.getMonth()+1)+"/"+createdate.getDate()+"</td>"+
                       " <td class='center'>"+tagsdata[0].a_name+"</td>"+
                       state_cole+"<td> <button class='btn btn-sm btn-success' onclick='updateTag("+tagsdata[0].t_id+")'>修改</button>"+
                       upstate+"</td> </tr>"
                   )


               }
           })
           $('#add_tag').modal('hide')
           //$("#add_tag").hide();
       }else{
           $('#add_tag').modal('show')
           //$("#add_tag").show();
       }
   })



}
//修改保存
function updatesave(obj){
    var parents=$(obj).parents("#update_tag")
    queryok=true;
    //验证
    validate(parents).then((queryok)=>{
        if(queryok)
        {
            var uptagtag={};
            uptagtag.t_id=currentId
            var tagname=$("#update_tagname").val();
            uptagtag.tagname=tagname
            var gid=$("#update_ceg").val();
            uptagtag.gid=gid;
            var checbox=parents.find(".checkboxbox");
            for(var i=0;i<checbox.length;i++)
            {
                if(checbox.eq(i)[0].checked)
                {
                    uptagtag.state=checbox.eq(i).val()
                    break;
                }
            }
            $.ajax({
                url:"/updateTag",
                type:"post",
                dataType:"json",
                data:{uptagtag:uptagtag},
                success(data){
                    console.log("修改的数据为", $("tr[data-id='"+currentId+"']"))
                    $("tr[data-id='"+currentId+"']").find("td").eq(1).html(data[0].t_name)
                    $("tr[data-id='"+currentId+"']").find("td").eq(2).html(data[0].g_name)
                    if(data[0].state==1)
                    {
                        $("tr[data-id='"+currentId+"']").find("td").eq(5).html("启用")
                        $("tr[data-id='"+currentId+"']").find("button").eq(1).html("禁用")
                        $("tr[data-id='"+currentId+"']").find("button").eq(1).attr("class","btn btn-sm btn-danger")
                        $("tr[data-id='"+currentId+"']").find("button").eq(1).attr("onclick","enduse("+currentId+")")

                    }else{
                        $("tr[data-id='"+currentId+"']").find("td").eq(5).html("禁用")
                        $("tr[data-id='"+currentId+"']").find("button").eq(1).html("启用")
                        $("tr[data-id='"+currentId+"']").find("button").eq(1).attr("class","btn btn-sm btn-primary")
                        $("tr[data-id='"+currentId+"']").find("button").eq(1).attr("onclick","startuse("+currentId+")")

                    }


                }
            })


            $("#update_tag").modal("hide")
        }else{

            $("#update_tag").modal("show")
        }
    })


}

//保存时总的验证
function validate(parent)
{

   return new Promise((resolve,reject)=>{
           if(parent.find(".tagnamevalidate").val()=="")
           {
               console.log("验证标签名")
               parent.find(".tagnamevalidate").parents(".form-group").next().css({"display":"block"})

               parent.find(".tagnamevalidate").parents(".form-group").next().find("label").html("标签名称不能为空")
               queryok=false;
           }else if(!/^[\u4e00-\u9fa5][\u4e00-\u9fa5a-zA-Z\d]+$/.test(parent.find(".tagnamevalidate").val()))
           { console.log("验证标签名")
               parent.find(".tagnamevalidate").parents(".form-group").next().css({"display":"block"})

               parent.find(".tagnamevalidate").parents(".form-group").next().find("label").html("标签名必须为中文开头")
               queryok=false;
           }
           if( parent.find(".tagcegvalidate").val()=="请选择所属类别")
           {
               console.log("验证所属类别")
               parent.find(".tagcegvalidate").parents(".form-group").next().css({"display":"block"})
               parent.find(".tagcegvalidate").parents(".form-group").next().find("label").html("请选择类别")
               queryok=false;
           }
           let checbox=0;
           for(var i=0;i<parent.find(".checkboxbox").length;i++)
           {
               console.log("checkboxbox",parent.find(".checkboxbox").eq(i)[0].checked)
               if(parent.find(".checkboxbox").eq(i)[0].checked==false)
               {
                   checbox++;
               }
           }
           if(checbox==2)
           {
               console.log("验证check")
               parent.find(".checkbox").parents(".form-group").next().css({"display":"block"})
               parent.find(".checkbox").parents(".form-group").next().find("label").html("请选择状态")
               queryok=false;

           }else{
               parent.find(".checkbox").parents(".form-group").next().css({"display":"none"})
           }
           console.log("queryok",queryok)
           resolve(queryok)

       })



}
//验证ajax
function validtateajax(parent)
{
    return new Promise((resolve,reject)=>{
        $.ajax(
            {
                url:"/validatecun",
                type:"post",
                data:{tagname:parent.find(".tagnamevalidate").val()},
                success(data){
                    if(parseInt(data)==1)
                    {
                        console.log("查询是否存在")
                        parent.find(".tagnamevalidate").parents(".form-group").next().css({"display":"block"})
                        parent.find(".tagnamevalidate").parents(".form-group").next().find("label").html("标签名已经存在，请重新输入")
                        resolve()
                    }else{
                        parent.find(".tagnamevalidate").parents(".form-group").next().css({"display":"none"})
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
        url:"/startandendUse",
        type:"post",
        data:{tagid:updateUse.id,isqi:updateUse.isqi},
        success(data){
            if(data=="ok")
            {
                $("tr[data-id='"+updateUse.id+"']").find("td").eq(5).html(updateUse.usehtml);
                $("tr[data-id='"+updateUse.id+"']").find("button").eq(1).html(updateUse.usebuttonhtml);
                $("tr[data-id='"+updateUse.id+"']").find("button").eq(1).attr({"class":updateUse.useClass,"onclick":updateUse.onclickvalue+updateUse.id+")"})

            }else{
                alert("发生错误",data)
            }
            console.log(data)
        }
    })
}
