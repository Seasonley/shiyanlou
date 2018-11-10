// server.js

var net = require('net');

// 创建TCP服务器
var server = net.createServer(function(socket) {
    console.log('client connected');

    // 监听客户端的数据
    socket.on('data', function(data) {
        console.log('server got data from client: ', data.toString());
    });
    // 监听客户端断开连接事件
    socket.on('end', function(data) {
        console.log('connection closed');
    });
    // 发送数据给客户端
    socket.write('Hello\r\n');
});

// 启动服务
server.listen(8080, function() {
    console.log('server bound');
});