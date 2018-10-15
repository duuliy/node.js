//Buffer是一个像Array的对象，它要用于操作字节。
//处理流，二进制
var str = "入出node.js";
var buf = new Buffer(str, 'utf-8');
console.log(buf); // => <Buffer e6 b7 b1 e5 85 a5 e6 b5 85 e5 87 ba 6e 6f 64 65 2e 6a 73>


//Buffer 类的实例类似于整数数组，但 Buffer 的大小是固定的、且在 V8 堆外分配物理内存。 Buffer 的大小在被创建时确定，且无法调整。
//Buffer 类在 Node.js 中是一个全局变量，因此无需使用 require('buffer').Buffer。
//缓冲区Buffer 是暂时存放输入输出数据的一段内存
//js语言自身只有字符串数据类型，没有二进制数据类型，而处理TCP和文件流的时候，必须处理二进制数据
//nodejs提供了一个Buffer对象来提供对二进制数据的操作
//是表示固定内存分配的全局对象，也就是说要放到缓存区中的字节数据需要提前确定
//Buffer好比由一个八位字节组成的数组，可以有效的在javascript中存储二进制数据
//Node进程中直接加载了，无需requre()进来。
//Buffer典型的javascript与c++结合的模块。
//它是16进制的2位数，0到255的数值。


//# 定义buffer的三种方式




//第一种方式 new Buffer(size) size 是多少个字节，类似于数组中的length
var buffer = new Buffer(1);//buffer的长度是1 ，长度固定之后不可以改变


//第二种方式 数组创建 new buffer(Array);
 var bufferArr = new Buffer([1,2,3]);

//第三种方法 字符串创建 new Buffer(str,[encoding]);
var bufferStr = new Buffer('刘'); //一个汉字是三个字节

//字符串转换成Buffer 
var bufStr = new Buffer('刘诗雨');
console.log(bufStr);
//<Buffer e5 88 98 e8 af 97 e9 9b a8>


//Buffer转字符串

bufStr.toString('utf8');
console.log(
bufStr.toString('utf8')
);
//刘诗雨


//1.合并Buffer Buffer.concat(list[, totalLength])


//2. 复制 buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])

//3.判断是否是Buffer.isBuffer

//4.获取字节的长度 Buffer.byteLength

//5.下表赋值：var buf = new Buffer(100);  buf[10] = 100;    console.log(buf[10]); // => 100 
//原生的赋值的小于0，就逐次加256，到一个0到255之的数。如果值大于255，就逐次减到256，到到0~255区内的数。若是小数，小数部分省略。


//slab是一种内存管理机制，是一块申请好的固定大小的内存区域。它有三种状态：
//full：完全分配状态。
//partial:部分分配状态。
//empty:没有分配状态。
  


//Node以8 KB为区分Buffer是大对象还是小对象 
Buffer.poolSize = 8 * 1024

//方法总结
buf.equals(otherBuffer)   // 比较

Buffer.from(array)   //  用于申请内存，并将内容写入刚刚申请的内存中

buf.copy(target[ targetStart[ sourceStart[ sourceEnd]]])    // 拷贝

buf.indexOf(value[ byteOffset][ encoding])    // 查找

buf.write(string[ offset[ length]][ encoding])   // 写

buf.fill(value[ offset[ end]][encoding])   // 填充

buf.toString([encoding[ start[ end]]])   //转成字符串

buf.toJSON()   //转成JSon

//buf.values()、buf.keys()、buf.entries()   //遍历值 键  键值


buf.slice([start[ end]])   //截取
