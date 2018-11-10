var http = require('http');
var server = http.createServer();

// 为request事件绑定处理函数
// 也可以使用server.addListener
server.on('request', function(req, res) { //为`request`事件添加一个匿名listener函数
    res.writeHead(200, { 'Content-Type': 'text/plain' }); //写入http响应头
    res.write('shiyanlou'); //写入http响应体
    console.log('shiyanlou');
    res.end(); //结束，返回响应内容
});

server.listen(1337, '127.0.0.1'); // 在127.0.0.1(即本地回环)1337端口监听http请求
console.log('Server running at http://127.0.0.1:1337/');