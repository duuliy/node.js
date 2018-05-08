/**
 * Created by Administrator on 2017/11/14.
 */

//选择图片，马上预览
function xmTanUploadImg(obj,id) {
    var file = obj.files[0];

    console.log(obj);console.log(file);
    console.log("file.size = " + file.size);  //file.size 单位为byte

    var reader = new FileReader();

    //读取文件过程方法
    reader.onloadstart = function (e) {
        console.log("开始读取....");
    }
    reader.onprogress = function (e) {
        console.log("正在读取中....");
    }
    reader.onabort = function (e) {
        console.log("中断读取....");
    }
    reader.onerror = function (e) {
        console.log("读取异常....");
    }
    reader.onload = function (e) {
        console.log("成功读取....");

        var img = document.getElementById(id);
        img.src = e.target.result;
        //或者 img.src = this.result;  //e.target == this
    }

    reader.readAsDataURL(file)
}
//添加设计师
function addDesigner(){
    var curentid;
    var name=$("#addInputName").val();
    var introduce=$("#addInputIntroduce").val();
    var mypath=Math.ceil((Math.random())*10000);
    var product=$("#addInputProduct").val();
    var date=new Date();
    var createTime=date.toLocaleDateString();
    //var file=$("#addInputFile")[0].files[0];
    var formData = new FormData($( "#myform" )[0]);
    var imgName=formData.get("myfile").name ;
    var p=new Promise((resolv,reject)=>{
        $.ajax({
            type:"post",
            url:"/addDesigner",
            data:{name:name,mypath:mypath,introduce:introduce,product:product,
                createTime:createTime},
            success:function(data){
                curentid=data.insertId;
                resolv(resolv)
            }
        })
    })
    p.then((resolv)=>{
        $.ajax({
            url:"/createfile",
            type:"post",
            data:{filename:curentid},
            success:function(data)
            {
                //var formdate=new FormData($("#myform")[0])
                console.log(formData)
                //formdate.append("myfile",$("#addInputFile")[0].files[0])
                //var file=$("#addInputFile")[0].files[0];
                //formData.append("myfile",file)
                console.log(formData.get("myfile"))
                //console.log($("#addInputFile")[0].files[0])
                $.ajax({
                    url:"/upload",
                    type:'post',
                    data:formData,
                    cache:false,
                    contentType: false,
                    processData: false,
                    success:function(data){
                        resolv(resolv)
                        console.log("上传成功")
                    },
                    error:function(){
                        console.log("与服务器通信发生错误")
                    }

                })

            }
        })
    })
    p.then((resolv)=>{
        $.ajax({
            url:"/updatePathname",
            type:"post",
            data:{curentid:curentid,imgName:imgName},
            success(data){
                query();
            }
        })
    })

    $("#myModal input").each(function(){
        $(this).val("")
    })
    $("#myModal textarea").each(function(){
        $(this).val("")
    })
    $('#myModal').modal('hide');
    $("#addImg").attr("src","../img/timg.jpg")
}

function AllDesignerList(){
    $.ajax({
        type:"get",
        url:"/AllDesignerList",
        success:function(data){
            //console.log(data)
            dataList(data);
        }
    })
}
let page,curentpage;
function query(page=1){
    curentpage=page;
    var dname=$("#searchName").val();
    var dpeople=$("#searchPerson").val();
    var querydetail={dname:dname,dpeople:dpeople,page:page};
    $.ajax({
        url:"/querydesigner",
        type:"post",
        data:{querydetail:querydetail},
        success:show
    })
    return false;
}
//展示数据
function show(designerData){
    if(designerData.data.length>0){
        dataList(designerData.data);
        let pages=Math.ceil(designerData.total/5);
        allpage=pages
        console.log("我是allpage：",allpage)

        $("#ulBox").html("")
        if(pages>1)
        {
            $("#ulBox").append('<li class="paginate_button previous"> <a  onclick="pre()">上一页</a>  <li class="paginate_button next" id="next"> <a  onclick="next()">下一页</a> ')
        }
        for(var i=0;i<pages;i++)
        {
            $("#next").before('<li class="paginate_button"> <a onclick="query('+(i+1)+')" class="ball">'+(i+1)+'</a> ')
        }
        $("#ulBox").find(".ball").eq(page-1).css({"background":"#337ab7","color":"white"})
        console.log( $("#ulBox").find(".ball").eq(page-1))

    }else{
        //$("#dataTables-example").html("  <tr> <th>标签ID</th> <th>标签名</th> " +
        //    "<th>所属类别</th> <th>创建时间</th> <th>创建人</th> <th>标签状态</th> " +
        //    "<th>操作</th> </tr>")
        //$("#dataTables-example").append("没有数据哦")
    }
}

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

//数据显示
function dataList(data){
    $("tbody").html("");
    console.log("我是显示的data",data)
    if(data.length>0){
        for(var i=0;i<data.length;i++){
            var date=new Date(data[i].createtime);
            var createtime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            var str1,str2;
            if(data[i].state==0){
                str1= "<td class='text-center' id=designerState"+data[i].d_id+">禁用</td>";
                str2=  "<button data-id="+data[i].d_id+" type='button' class='btn btn-primary' " +
                    "onclick='deleteDesigner(this)' id=mbutton"+data[i].d_id+">启用</button>";
            }else{
                str1= "<td class='text-center' id=designerState"+data[i].d_id+">启用</td>";
                str2=  "<button data-id="+data[i].d_id+" type='button' class='btn btn-danger' " +
                        "onclick='deleteDesigner(this)' id=mbutton"+data[i].d_id+">禁用</button>";
            }
            document.getElementById("content").innerHTML+=
                    "<tr>"+
                    "<td class='text-center'>"+data[i].d_id+"</td>"+
                    "<td class='text-center'>"+data[i].d_name+"</td>"+
                    "<td class='text-center'><img src="+data[i].d_img+" alt=''/></td>"+
                    "<td class='text-center'>"+data[i].d_case+"</td>"+
                    "<td class='text-center'>"+data[i].d_detail+"</td>"+
                    "<td class='text-center'>"+createtime+"</td>"+
                    "<td class='text-center'>"+data[i].a_name+"</td>"+
                    str1+
                    "<td class='text-center'>" +
                    "<button data-id="+data[i].d_id+" type='button' class='btn btn-success' " +
                    "data-toggle='modal' data-target='#myModal2' onclick='getOneList(this)'>修改</button>&nbsp;"+
                    str2+
                    "</td>"+
                    "</tr>"
        }
    }else{
        $("tbody").html("<tr><td colspan='12'>未查询到相关数据！</td></tr>");
    }
}

//获取所有设计师数据
window.onload=function (){
    getAllDesigner();
}

function getAllDesigner(){
    //$.ajax({
    //    type:"get",
    //    url:"/getAllDesigner",
    //    success:function(data){
    //        //console.log(data)
    //    }
    //})
    query();
}

//修改设计师数据
var id;
function getOneList(obj){
    id=obj.getAttribute("data-id");
    $.ajax({
        type:"get",
        url:"/getOneList",
        data:{
            id:id
        },
        success:function(data){
            $("#modifyInputName").val(data[0].d_name);
            $("#modifyInputIntroduce").val(data[0].d_case);
            $("#modifyInputProduct").val(data[0].d_detail);
            $("#modifyImg")[0].src=(data[0].d_img);
        }
    })
    document.getElementById("modifyfile").value="";
}
function modifyDesigner(){
    var name=$("#modifyInputName").val();
    var introduce=$("#modifyInputIntroduce").val();
    var product=$("#modifyInputProduct").val();
    var date=new Date();
    var createTime=date.toLocaleDateString();
    //console.log("表单为",$( "#updateid" )[0])
    var formdata,imgName;
    //$("#modifyfile").change(function(){
         formdata = new FormData($( "#updateid" )[0]);
         imgName=formdata.get("myfile").name;
    //})
    //var formData = new FormData($( "#myform" )[0]);
    //var imgName=formData.get("myfile").name ;
    //console.log("我是修改的imgName")
    //console.log(imgName)
    //console.log( document.getElementById("modifyfile").value)
    //console.log(formdata.get("myfile"))
    $.ajax({
        type:"post",
        url:"/modifyDesigner",
        data:{id:id,name:name,introduce:introduce,product:product,
            createTime:createTime,imgName:imgName},
        success:function(data){
            $.ajax({
                type: "post",
                url: "/modifyfile",
                data:formdata,
                cache:false,
                contentType: false,
                processData: false,
                success:function(data){
                    query();
                }
            })
        }
    })
    $('#myModal2').modal('hide');

    //$("#modifyfile").val("");

}

//删除设计师
function deleteDesigner(obj){
    id=obj.getAttribute("data-id");
    console.log(id)
    $.ajax({
        type:"get",
        url:"/getOneList",
        data:{
            id:id
        },
        success:function(data){
            if(data[0].state==0){
               $.ajax({
                   type:"get",
                    url:"/deleteDesigner",
                    data:{
                        id:id,state:1
                    },
                    success:function(data){
                        $("#designerState"+id).html("启用");
                        $("#mbutton"+id).html("禁用").removeClass("btn-primary").addClass("btn-danger");
                    }
                })
            }else{
                $.ajax({
                    type:"get",
                    url:"/deleteDesigner",
                    data:{
                        id:id,state:0
                    },
                    success:function(data){
                        $("#designerState"+id).html("禁用");
                        $("#mbutton"+id).html("启用").removeClass("btn-danger").addClass("btn-primary");
                    }
                })
            }
        }
    })
}
//查询设计师
function searchDesigner(){
    var searchName=$("#searchName").val();
    var searchPerson=$("#searchPerson").val();
    $.ajax({
        type:"get",
        url:"/searchDesigner",
        data:{
            searchName:searchName,
            searchPerson:searchPerson
        },
        success:function(data){
            dataList(data);
        }
    })

}

