//net.sokect  tcp套接字
//net.server。tcp服务器
//net.native c++层面的UDP套接字。



var http = require('http');
var server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('handled by child, pid is ' + process.pid + '\n');
});

server.on('connection',(tcp)=>{
            console.log('httpsever connection');
 })

//子进程收到父进程传递的句柄(即客户端与服务器的socket连接对象)ipc连接
process.on('message', function (m, tcp) {
    if (m === 'server') {
        //处理与客户端的连接
        tcp.on('connection', function (socket) {
            //交给http服务来处理
            server.emit('connection', tcp);
        });
    }
});