/**
 * Created by ZXW on 2017/11/16 0016.
 */

var nowPage = 1;
var detailAry = [];
window.onload = getData();
//获取数据
function getData(){
    $.ajax({
        type:"post",
        data:{
            nowPagec:nowPage
        },
        url:"/getProductMess.do",
        success:function(data) {
            showData(data);
        }
    });
}

function showData(data){
    var pro_condition;
    var str = "";
    $("tbody").html(str);
    for(var key=0;key<data.length;key++){
        detailAry[key] = ""+data[key].pro_text;
        console.log("*****"+data[key].pro_text);
        console.log(detailAry[key]);
        if(data[key].pro_condition == 1){
            pro_condition = "上架"
        }else {
            pro_condition = "下架"
        }

        str += "<tr class='ted'>" +
            "<td>" + data[key].pro_id + "</td>" +
            "<td>" + data[key].pro_name + "</td>" +
            "<td>" + data[key].pro_type_name +"</td>" +
            "<td>" + data[key].pro_amount + "</td>" +
            "<td>" + data[key].pro_price + "</td>" +
            "<td>" + pro_condition + "</td>" +
            "<td><ul class='actions'>"+
            "<span><a type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#editModal' onclick='getEditPos(" +
            ""+data[key].pro_id+",\""+data[key].pro_type_name+"\",\""+data[key].pro_name+"\",\""+data[key].pro_amount+"\",\""+data[key].pro_price+"\"" +
            ",\""+data[key].pro_discount+"\",\""+data[key].pro_size+"\",\""+data[key].pro_deal_amount+"\",\""+data[key].pro_look_amount+"\"" +
            ",\""+data[key].pro_storetime+"\",\""+data[key].pro_info+"\",\""+data[key].pro_type_condition+"\","+key+")'>详情</a></span>" +
            "</ul></td>" +
            "</tr>";
    }
    $("tbody").html(str);
}

//参数传递有问题

function prevPage(){
    if(countPage!=1){
        if(nowPage>=1){
            nowPage--;
            if(nowPage<=0){
                nowPage=1;
            }
            $("#counP").html("当前为"+nowPage+"/"+countPage+"页");
            zz();
        }
    }
}
function nextPage(){
    if(countPage!=1){
        nowPage++;
        if(nowPage>countPage){
            nowPage=countPage;
        }
        $("#counP").html("当前为"+nowPage+"/"+countPage+"页");
        zz();
    }
}

$.ajax({
    type:"get",
    url:"/productNum.do",
    success:function(data){
        $("#productName").html("<option value='0'>商品名称</option>");
        $("#productNum").html("<option value='0'>商品编号</option>");
        for(var i = 0;i<data.length;i++){
            $("#productNum").append("<option value='"+(i+1)+"'>"+data[i].pro_id+"<option>");
            $("#productName").append("<option value='"+(i+1)+"'>"+data[i].pro_name+"<option>");
        }
    }
});

$.ajax({
    type:"get",
    url:"/productType.do",
    success:function(data){
        $("#productType").html("<option value='0'>商品种类</option>");
        for(let i = 0;i<data.length;i++){
            $("#productType").append("<option value='"+(i+1)+"'>"+data[i].pro_type_name+"<option>");
            $("#protypename").append("<option value='"+(i+1)+"'>"+data[i].pro_type_name+"<option>");
            let str = "<option value='"+(i+1)+"'>"+data[i].pro_type_name+"<option>";
        }
    }
});

$(function(){
    totalPage()
});

function totalPage(){
    $.ajax({
        url:"getTotalPagePro.do",
        data:{
            productNum:$("#productNum option:selected").text(),
            productName:$("#productName option:selected").text(),
            productType:$("#productType option:selected").text(),
            nowPagec:nowPage
        },
        success:function(data){
            $("#li").html("");
            for(var i = 0 ;i<data;i++){
                document.getElementById("li").innerHTML+="<span><a onclick='herf(this)' class='pageNum'>"+(i+1)+"</a></span>";
                //$("<li><a onclick='herf(this)' class='pageNum'>"+(i+1)+"</a></li>").insertBefore($(".nextPage"));
            }
            countPage=data;
            $(".pagination a").mouseenter(function(){$(this).css("cursor","pointer")});
            if(data==0){
                $("#counP").html("当前为"+0+"/"+countPage+"页");
            }else{
                $("#counP").html("当前为"+nowPage+"/"+countPage+"页");
            }
        }
    })
}
function herf(obj){
    nowPage= obj.innerText;
    $.ajax({
        type:"post",
        url:"/getProductMess.do",
        data:{
            nowPagec:nowPage
        },
        success:function(data) {
            console.log(data);
            showData(data);
            if(data==0){
                $("#counP").html("当前为"+0+"/"+countPage+"页");
            }else{
                $("#counP").html("当前为"+nowPage+"/"+countPage+"页");
            }
        }
    });
}

//查
function searchProduct(){
    nowPage=1;
    zz();
}

function zz(){
    $.ajax({
        type:"post",
        url:"/searchProduct.do",
        data:{
            productNum:$("#productNum option:selected").text(),
            productName:$("#productName option:selected").text(),
            productType:$("#productType option:selected").text(),
            nowPagec:nowPage
        },
        success:function(data){
            $("#content").html("");
            showData(data);
            totalPage();
        }
    })
}

//获取详细信息
function getDetail(id){

}

//添加详细信息
$("#addDetailInfo").click(function(){
    let str = "";
    str = '<div class="addDetail"> ' +
        '<form class="detailInfoForm"> ' +
        '<span>详细信息描述： </span><textarea  rows="4" class="protextdiscribe" name="protextdiscribe"></textarea><br/> ' +
        '<span>是否显示：</span> ' +
        '<select name="protextcondition" class="protextcondition"> ' +
        '<option value="1">显示</option> ' +
        '<option value="0">不显示</option> ' +
        '</select><br> ' +
        '</form> ' +
        '<form class="detailImgPart" name="detailImg" onsubmit="return false;"> ' +
        '<input type="file" name="imgFile" class="detailImgFile"> ' +
        '<button class="btn btn-lg btn-flat default new-product detailImgUpload">上传</button> ' +
        '</form> ' +
        '<div> ' +
        '<img src="img/1.jpg" alt="" class="detailInfoImg"> ' +
        '</div> ' +
        '<button class="btn btn-lg btn-flat white new-product pull-right" onclick="deleteDetail(this)">删除</button> ' +
        '</div>';
    $(str).appendTo($(".addModel"));
});

//for zz begin
function deleteDetail(node){
    $(node).parents($(".addDetail"))[0].remove();
}
function getEditPos(a,b,c,d,e,f,g,h,i,j,k,l,key){
    console.log("^^^^");
    console.log(detailAry[key]);
    $("#proid2").val(a);
    $("#protypeid2").val(b);
    $("#proname2").val(c);
    $("#proamout2").val(d);
    $("#proprice2").val(e);
    $("#prodiscount2").val(f);
    $("#prosize2").val(g);
    $("#prodealamout2").val(h);
    $("#prolookamout2").val(i);
    $("#prostoretime2").val(j);
    $("#proinfo2").val(k);
    $("#procondition2").val(l);
    editor2.html(detailAry[key]);
    productImg(a);
    //productText(a);
}
function productImg(imgID){
    $.ajax({
        url:"/productImg.do",
        type:"post",
        data:{
            proImgId:imgID
        },
        success:function(data){
            $(".fsimg3").attr('src',data[0].pro_img1);
            $(".routes3").html(data[0].pro_img1);
            $(".fsimg4").attr('src',data[0].pro_img2);
            $(".routes4").html(data[0].pro_img2);
            $(".fsimg5").attr('src',data[0].pro_img3);
            $(".routes5").html(data[0].pro_img3);
        }
    })
}
/*function imgstatus(my,id){
    var zz;
    var name;
    if($(my).html()=="已启用"){
        zz=0;
        name="已禁用";
    }else if($(my).html()=="已禁用"){
        zz=1;
        name="已启用";
    }
    $.ajax({
        url:"/imgStatus.do",
        type:"post",
        data:{
            status:zz,
            id:id
        },
        success:function(data){
            $(my).html(name);
        }
    })
}*/
/*function productText(textID){
    $.ajax({
        url:"/productText.do",
        type:"post",
        data:{
            proTextID:textID
        },
        success:function(data){
            var zz;
            document.getElementsByClassName("myProText")[0].innerHTML="";
            for (var z=0;z<data.length;z++){
                if(data[z].pro_text_condition==1){
                    zz="已启用";
                }else if(data[z].pro_text_condition==0){
                    zz="已禁用";
                }
                document.getElementsByClassName("myProText")[0].innerHTML+="" +
                    "<img src='"+data[z].pro_text_img+"' alt='你的浏览器查阅不了这张图片'/>" +
                    "<p>"+data[z].pro_text_discribe+"<p>";
                document.getElementsByClassName("myProText")[0].innerHTML+="<button type='button' onclick='textstatus(this,"+data[z].pro_text_id+")'>"+zz+"</button>";
            }
        }
    })
}*/
/*function textstatus(my,id){
    var zz;
    var name;
    if($(my).html()=="已启用"){
        zz=0;
        name="已禁用";
    }else if($(my).html()=="已禁用"){
        zz=1;
        name="已启用";
    }
    $.ajax({
        url:"/textStatus.do",
        type:"post",
        data:{
            status:zz,
            id:id
        },
        success:function(data){
            $(my).html(name);
        }
    })
}*/

//确认修改信息（+富文本）
$("#editsure").on("click",function(){
    //基本信息修改
    $.ajax({
        url:"/editpro.do",
        type:"post",
        data:{
            proid2:$("#proid2").val(),
            protypeid2:$("#protypeid2").val(),
            proname2:$("#proname2").val(),
            proamout2:$("#proamout2").val(),
            proprice2:$("#proprice2").val(),
            prodiscount2:$("#prodiscount2").val(),
            prosize2:$("#prosize2").val(),
            prodealamout2:$("#prodealamout2").val(),
            prolookamout2:$("#prolookamout2").val(),
            prostoretime2:$("#prostoretime2").val(),
            proinfo2:$("#proinfo2").val(),
            procondition2:$("#procondition2").val(),
            updateDetailEditor:$("#updateDetailEditor").val(),
        },
        success:function(data){
            getData();
        }
    });
    //图片修改
    $.ajax({
        url:"/addproimg.do",
        type:"post",
        data:{
            proid:$("#proid2").val(),
            proimg0:$(".routes3").html(),
            proimg1:$(".routes4").html(),
            proimg2:$(".routes5").html()
        },
        success:function(data){
            console.log(data);
        }
    });
});

function getaddtext(a,b){
    $(".textidname").html(b);
}

//for zz end

//新增
$("#addsure").click(function () {
    let baseData = $(".detailInfo").serialize();
    console.log("*******");
    console.log($("#addDetailEditor").val());
    //基本表info请求
    $.ajax({
        type:"post",
        url:"/addProductBase.do",
        data:baseData+"&detailText="+$("#addDetailEditor").val(),
        success:function(data){
            console.log(data);
            $("#addDetailEditor").val("");
            $(".detailInfo input").val("");
        }
    });
    //图片表img请求
    $.ajax({
        url:"/addshowimg.do",
        type:"post",
        data:{
            name:$("#proname").val(),
            price:$("#proprice").val(),
            showimg0:$(".routes0").html(),
            showimg1:$(".routes1").html(),
            showimg2:$(".routes2").html()
        },
        success:function(data){
            console.log(data);
        }
    });
    //富文本
});

//详细图片上传
($(".detailImgUpload0")).click(function(){
    detailImg(0);
});
($(".detailImgUpload1")).click(function(){
    detailImg(1);
});
($(".detailImgUpload2")).click(function(){
    detailImg(2);
});
($(".detailImgUpload3")).click(function(){
    detailImg(3);
});
($(".detailImgUpload4")).click(function(){
    detailImg(4);
});
($(".detailImgUpload5")).click(function(){
    detailImg(5);
});

function detailImg(a){
    let form = new FormData($(".detailImgPart"+a)[0]);
    form.append('file',document.querySelector('.detailImgFile'+a).files[0]);
    if(document.querySelector('.detailImgFile'+a).files[0].name!=""){
        $.ajax({
            url:"/fsProImg.do",
            type:"POST",
            data:form,
            processData:false,
            contentType:false,
            success:function(data){
                $(".fsimg"+a).attr('src',data);
                $(".routes"+a).html(data);
            }
        })
    }
}


//富文本  create by SDL

var editor1,editor2;
//存储富文本字符串
var detailText = "";
KindEditor.ready(function(K) {
    editor1 = K.create('#addDetailEditor', {
        width:"100%",
        height:"300px",
        allowImageUpload : true, //支持图片上传
        uploadJson: '/uploadImgEditor.do',   //图片上传时向服务提交的地址
        afterBlur:function(){this.sync();},
        items : [
            'fontname', 'fontsize', 'forecolor', 'hilitecolor', 'bold', 'italic',
            'underline', 'removeformat', 'justifyleft', 'justifycenter', 'justifyright','insertorderedlist', 'insertunorderedlist', 'emoticons', 'image', 'link']
    });
});

KindEditor.ready(function(K) {
    editor2 = K.create('#updateDetailEditor', {
        width:"100%",
        height:"300px",
        allowImageUpload : true, //支持图片上传
        uploadJson: '/uploadImgEditor.do',   //图片上传时向服务提交的地址
        afterBlur:function(){this.sync();},
        items : [
            'fontname', 'fontsize', 'forecolor', 'hilitecolor', 'bold', 'italic',
            'underline', 'removeformat', 'justifyleft', 'justifycenter', 'justifyright','insertorderedlist', 'insertunorderedlist', 'emoticons', 'image', 'link']
    });
});