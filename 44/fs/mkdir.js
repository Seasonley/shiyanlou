var fs = require('fs'); // 引入fs模块

// 创建 newdir 目录
fs.mkdir('./newdir', function(err) {
    if (err) {
        throw err;
    }
    console.log('make dir success.');
});