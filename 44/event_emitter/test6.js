var http = require('http');
var events = require('events'); // 加载events模块
var server = http.createServer();

server.on('request', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('shiyanlou,111');
    console.log('shiyanlou,111');
});

server.on('request', function(req, res) {
    res.write('\nshiyanlou,222');
    console.log('shiyanlou,222');
    res.end();
});

server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

// 查看server绑定的'request'事件的监听器个数
var num = events.EventEmitter.listenerCount(server, 'request');
console.log(num);