


//net.sokect  tcp套接字
//net.server。tcp服务器
//net.native c++层面的UDP套接字。


//ipc 管道通讯
var cp = require('child_process');
process.on('message',function(m){
 console.log(m);
})
process.send({"message":"hello I am child"})