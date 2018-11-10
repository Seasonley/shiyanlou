var fs = require('fs'); // 引入fs模块

// 使用toString()
fs.readFile('./text.txt', function(err, data) {
    // 读取文件失败/错误
    if (err) {
        throw err;
    }
    // 读取文件成功
    console.log('toString: ', data.toString());
});

// 设置编码格式
fs.readFile('./text.txt', 'utf-8', function(err, data) {
    // 读取文件失败/错误
    if (err) {
        throw err;
    }
    // 读取文件成功
    console.log('utf-8: ', data);
});