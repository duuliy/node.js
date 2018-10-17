$node >process.memoryUsage();
{rss:1344443544,heapTotal:54555444,heapUsed:2821496}.
heapTotal:已申请堆内存。 heapUsed:堆内存使用情况。

//增加内存的方法:node -—ax-old-space-size=1700 test.js 或者把old变成new


//系统内存

// console.log(os.totalmem())  总内存

// console.log(os.freemem())  未使用内存
