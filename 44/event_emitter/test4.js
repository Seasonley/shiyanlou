var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('shiyanlou,111');
    console.log('shiyanlou,111');
    res.end();
});

server.on('request', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('shiyanlou,222');
    console.log('shiyanlou,222');
    res.end();
});

// 移除绑定的所有监听器
server.removeAllListeners('request');

server.on('request', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('shiyanlou');
    console.log('shiyanlou');
    res.end();
});

server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');