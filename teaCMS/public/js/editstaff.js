/**
 * Created by ZXW on 2017/11/13.
 */
var adminidbefore = $("#adminid").val().trim();
$('#baocun').on("click", function () {
    var adminid = $("#adminid").val().trim();
    var roleid = $("#roleid").val().trim();
    var adminlogin = $("#adminlogin").val().trim();
    var adminpsw = $("#adminpsw").val().trim();
    var admincondition = $("#admincondition").val().trim();
    $.ajax({
        type: "POST",
        url: "updateeditstaff.do",
        data:{"adminid":adminid,"roleid":roleid,"adminlogin":adminlogin,"adminpsw":adminpsw,
        "admincondition":admincondition,"adminidbefore":adminidbefore},
        dataType: "json",
       success:function (data){
            if (data) {
                $('form').submit();
                alert("修改成功！");
                window.location = "person.html";
            }
        }
    })
});
