/**
 * Created by a on 2017/11/14.
 */
/**
 * Created by a on 2017/10/25.
 */
var xhr;
if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest()
}else{
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
function myAjax(method,url,params,callback,avsn){
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            callback()
        }
    }
    if(method=="get"){
        xhr.open(method,url+"?"+params,avsn);
        xhr.send(null)
    }else if(method=="post"){
        xhr.open(method,url,avsn);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(params)
    }
}