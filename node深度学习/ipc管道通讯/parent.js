
//ipc 管道通讯
var cp = require('child_process');
//只有使用fork才可以使用message事件和send()方法
var n = cp.fork('./child.js');
n.on('message',function(m){   //接收子进程消息
  console.log(m);
})

n.send({"message":"hello"});  //发送到子进程
