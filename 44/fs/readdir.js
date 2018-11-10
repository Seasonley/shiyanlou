var fs = require('fs'); // 引入fs模块

fs.readdir('./newdir', function(err, files) {
    if (err) {
        throw err;
    }
    // files是一个数组
    // 每个元素是此目录下的文件或文件夹的名称
    console.log(files);
});