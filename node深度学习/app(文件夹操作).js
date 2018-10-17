const http = require('http');
const fs = require('fs');

//因为默认flag='w'是写，会清空文件，想要追加，可以传递一个flag参数，如下。
//flag传值，r代表读取文件，w代表写文件，a代表追加。

// fs.writeFile('./newdir/test3.txt', '这是改过的测试3', {
//     'flag': 'a'
// }, function (err) {
//     if (err) {
//         throw err;
//     }

//     console.log('Saved.');

//     // 写入成功后读取测试
//     fs.readFile('./newdir/test2.txt', 'utf-8', function (err, data) {
//         if (err) {
//             throw err;
//         }
//         console.log(data.toString());
//     });

// });

//创建文件夹   默认权限[0o777]
// fs.mkdir('./newdir',[0o777], function(err) {
//     if (err) {
//         throw err;
//     }
//     console.log('make dir success.');
// });

//读文件夹 值为数组
// fs.readdir('./newdir', function(err, files) {
//     if (err) {
//         throw err;
//     }
//     // files是一个数组
//     // 每个元素是此目录下的文件或文件夹的名称
//     console.log(files);

// });

//删除文件与fs.unlinkSync(同步)  unlink(异步)
// fs.unlink('./newdir/test2.txt', function(err) {
//     if (err) {
//         console.log(err);
//         return false;
//     }
//     console.log("unlink success");
// });

//删除空文件夹 fs.rmdirSync()同步
// fs.rmdir('./newdir', function(err) {
//     if (err) {
//         console.log(err);
//         return false;
//     }
//     console.log("rmdir success");
// });

// 检查文件是否存在于当前目录。  返回空则是存在  否则报错
// fs.access('./n', fs.constants.F_OK, (err) => {
//     console.log(`${err ? '不存在' : '存在'}`);
// });

// 检查文件是否可读。
// fs.access('./newdir/test2.txt', fs.constants.R_OK, (err) => {
//     console.log(`${err ? '不可读' : '可读'}`);
// });

// 检查文件是否可写。
// fs.access('./newdir/test2.txt', fs.constants.W_OK, (err) => {
//     console.log(` ${err ? '不可写' : '可写'}`);
// });

// 检查文件是否存在于当前目录，且是否可写。
// fs.access('./newdir/test25.txt', fs.constants.F_OK | fs.constants.W_OK, (err) => {
//     if (err) {
//       console.error(
//         `${err.code === 'ENOENT' ? '不存在' : '只可读'}`);
//     } else {
//       console.log(` 存在，且可写`);
//     }
// });

//递归删除非空文件夹 因为没有直接删除的方法 所以要递归删除文件后再删除文件夹
//fs.exists(path, callback)  参数只有布尔值 没有err  所以弃用  但是同步的existsSync没有问题 不会弃用

// stats.isDirectory() 如果 fs.Stats 对象表示一个文件系统目录，则返回 true    
function deleteFolderRecursive(path) {
    console.log('调用了')
    if(fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file) {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                console.log('递归')
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
                console.log('删文件')
            }
        });
        fs.rmdirSync(path);
        console.log('删文件夹')
    }
};

deleteFolderRecursive('./newdir')

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');