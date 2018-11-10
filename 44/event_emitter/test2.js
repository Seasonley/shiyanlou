var http = require('http');
var server = http.createServer();

// 为request事件绑定处理函数，事件只会执行一次
server.once('request', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('shiyanlou');
    console.log('shiyanlou');
    res.end();
});

server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');