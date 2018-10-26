//集群多进程，相当于动态控制进程


//进程事件

//message   通讯事件

//error 进程无法复制，无法被杀死，无法发送消息时会触发

//exit子进程退出时触发事件，子进程正常退出，这个事的第一个参数为退出码 ，否为null。如果是通过kill()杀死的，会得到第二个参数，它表示杀死进程时的信号。 

//close在进程的输入输出中时退出触发，参数与exit相同。 

// disconnect：关闭关IPC通道。 


// process.on('message', function (m, tcp) {
//     if (m === 'server') {
//         tcp.on('connection', function (socket) {
//             server.emit('connection', socket);
//         });
//     }
// });

//自动重启

var fork = require('child_process').fork;
var cpus = require('os').cpus();

var server = require('net').createServer();
server.listen(1337);

var workers = {};
var createWorker = function () {
    var worker = fork(__dirname + '/worker.js');
    worker.on('exit', function () {
        console.log('Worker ' + worker.pid + ' exited.');
        delete workers[worker.pid];
        createWorker();
    }); // 句柄转发   
    worker.send('server', server);
    workers[worker.pid] = worker;
    console.log('Create worker. pid: ' + worker.pid);
};

for (var i = 0; i < cpus.length; i++) {
    createWorker();
}


// 进程自己退出时，让所有工作进程退出 
process.on('exit', function () {
    for (var pid in workers) {
        workers[pid].kill();
    }
});


//$ tskill id 杀死子进程