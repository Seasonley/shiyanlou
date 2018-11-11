// test_cluster.js

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length; // 获取CPU内核数

// master是主进程
// 此处判断是否为master进程
// 是则根据CPU内核数创建worker进程
if (cluster.isMaster) {
    // worker是运行节点
    // 根据CPU数量启动worker
    // Fork workers
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    Object.keys(cluster.workers).forEach(function(id) {
        console.log('I am running with ID : ' + cluster.workers[id].process.pid);
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    // cluster.isWorker == true
    // 运行到else中的代码
    // 说明当前进程是worker进程
    // 那么此worker进程就启动一个http服务
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(8000);
}