//cluster.schedulingPolicy   node负载均衡 在6.0之后默认开启  称之为Round-Robin
//开启方法：cluster.schedulingPolicy = cluster.SCHED_RR; 关闭：cluster.schedulingPolicy = cluster.SCHED_NONE;
//或者在环境变量中设置：NODE_CLUSTER_SCHED_POLICY='rr'；   NODE_CLUSTER_SCHED_POLICY='none'
//cluster常用事件：fork  online listening  exit  setup

// cluster.js 

// var cluster = require('cluster');

// cluster.setupMaster({      //用于修改默认'fork' 行为。一旦调用，将会按照cluster.settings进行设置。
//     exec: "./app.js"
// });

// var cpus = require('os').cpus();
// for (var i = 0; i < cpus.length; i++) {
//     cluster.fork();
// }



var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;



if (cluster.isMaster) { // 当该进程是主进程时，返回 true
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', function (worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else { // Workers can share any TCP connection 
    // In this case its a HTTP server  
    //多进程可以同端口
    http.createServer(function (req, res) {
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(8000);
}

//cluster.isWorker原理：
// cluster.isWorker = ('NODE_UNIQUE_ID' in process.env);
// cluster.isMaster = (cluster.isWorker === false);
