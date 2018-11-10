var http = require('http');
var server = http.createServer();

function callback(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World');
    console.log('Hello World');
    res.end();
}

server.on('request', callback);

// 移除绑定的监听器callback
server.removeListener('request', callback);

server.on('request', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('shiyanlou');
    console.log('shiyanlou');
    res.end();
});

server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');