var fs = require('fs'); // 引入fs模块

// 打开文件
fs.open('./testwrite.txt', `w`, function(err, fd) {
    if (err) {
        throw err;
    }
    console.log('open file success.');
    var buffer = new Buffer('shiyanlou');
    // 读取文件
    fs.write(fd, buffer, 0, 6, 0, function(err, written, buffer) {
        if (err) {
            throw err;
        }

        console.log('write success.');

        // 打印出buffer中存入的数据
        var byteLength = buffer.byteLength;
        console.log(byteLength, buffer.slice(0, byteLength).toString());

        // 关闭文件
        fs.close(fd, function() {});
    });
});