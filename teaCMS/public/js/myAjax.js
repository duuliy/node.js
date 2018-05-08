var xhr;
if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
}else{
    xhr = new ActiveXObject("microsoft.XMLHTTP");
}
function Ajax(method,url,params,callback){
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            callback()
        }
    };
    if(method=="get"){
        xhr.open(method,url+"?"+params);
        xhr.send(null);
    }
    if(method=="post"){
        xhr.open(method,url);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(params);
    }

}



