
// Node.js在10.5之前是没有多线程支持的，要使用多线程需要使用C++扩展模块来支持。从v10.5开始，
// Node.js添加了线程的支持模块worker_threads，其实现类似于浏览器中的。在v10.x中只是试验版本，
// 需要加--experimental-worker参数才能启用 。到了v12.xworker_threads模块成为了稳定版。


// #! node --experimental-worker
const { Worker, isMainThread } = require( 'worker_threads' );
let num = 100;
if ( isMainThread ) {
  num = 200;
  console.log( 'main thread pid:', process.pid, 'num=' + num );
  new Worker( __filename );
} else {
  console.log( 'worker thread pid:', process.pid, 'num=' + num );
}


// main thread pid: 846 num=200
// worker thread pid: 846 num=100


// 主线程和worker线程的PID相同，而且主线程和worker线程不能直接共享变量值。



// Node.js线程间发送消息是通过MessageChannel和MessagePort进行通讯的，MessageChannel是一个异步双向通信通道，
// 包含port1、port2两个MessagePort类型对象。MessagePort是一个通信的一个端，通过postMessage()和on(message)来发送与接收消息。
// 在创建Worker时会自动创建一个MessageChannel。



// #! node --experimental-worker
const { Worker, isMainThread, parentPort } = require( 'worker_threads' );
if ( isMainThread ) {
  console.log( '== main thread pid:', process.pid );
  const worker = new Worker( __filename );
  worker.postMessage( 'hello' );
  const sharedUint8Array = new Uint8Array( new SharedArrayBuffer( 4 ) );
  worker.postMessage( sharedUint8Array );
  console.log( '== parent thread:', sharedUint8Array );
  worker.on( 'message', ( m ) => {
    if ( m === 'ok' ) {
      console.log( '== parent thread:', sharedUint8Array );
    }
  } );
} else {
  console.log( '-- worker thread pid:', process.pid );
  parentPort.on( 'message', ( m ) => {
    console.log( '-- receive message from main thread:', m );
    if ( m instanceof Uint8Array ) {
      m[ 0 ] = 1;
      m[ 2 ] = 100;
      parentPort.postMessage( 'ok' );
      console.log( '-- changed data:', m )
    }
  } )
}


// == main thread pid: 5758
// == parent thread: Uint8Array [ 0, 0, 0, 0 ]
// -- worker thread pid: 5758
// -- receive message from main thread: hello
// == parent thread: Uint8Array [ 1, 0, 100, 0 ]
// -- receive message from main thread: Uint8Array [ 0, 0, 0, 0 ]
// -- changed data: Uint8Array [ 1, 0, 100, 0 ]