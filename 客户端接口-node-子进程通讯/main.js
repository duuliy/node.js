



//这里的小bug:启动node之后，重新开的命令窗口来看，千万不要继续用ide的命令窗口看


var cp = require('child_process');
var child1 = cp.fork('child.js');
var child2 = cp.fork('child.js')
var server = require('net').createServer();
server.listen(1337, function () {
    //父进程将接收到的请求分发给子进程
    child1.send('server', server);
    child2.send('server', server); // 关  
    server.close();
});


//  用户请求接口，接口走主程序main.js然后通过ipc分发到child子程序，然后子程序处理结束后，通过http返回到客户端用户。。