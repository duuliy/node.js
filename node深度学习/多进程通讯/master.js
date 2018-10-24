//线程间不像进程之间那样存在很大的独立性，一个进程的多个线程共享进程内部的很多资源，线程间可以互写对方的堆栈，
//而不同的进程则无法对其他进程的地址空间进行写操作。因此，在实现多线程编程中，应设计合理的同步通信机制，避免数据冲突的现象发生。

//每次fork都是独立全新的进程，有独立全新的v8,每次至少要30毫秒和10mb内存。


const fork = require('child_process').fork;   //复制进程
const cpus = require('os').cpus();  //系统多核CPU数量  一般多少核就是多少进程


process.on('message', function (m) {   console.log('CHILD got message:', m); }); 
 
process.send({foo: 'bar'}); 


for (let i = 0; i < cpus.length; i++) {
    fork('./worker.js');
}

//spawn() 启动一个子进程执行命令   进程类型 ：任意

//exec() 启动一个子进程执行命令，他有一个回调函数获得子进程的状况，而spawn没有。。 进程类型 ：任意

//execFile()启动一个子进程执行可执行文件。  进程类型 ：任意

//fork()与spawn()类似，不同在于它创建Node的子进程只需要执行JavaScript文件模块 。 创建之后，子进程与父之间将会建立IPC通道，父子之间能通过message和send()传递消息\

//IPC只能在node经常之前通讯，除非其他进程也约定了这个IPC通道

 
