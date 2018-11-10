var http = require('http');
var server = http.createServer();

// 绑定自定义事件myevent
server.on('myevent', function(arg) {
    console.log(arg);
});

// 触发自定义事件
server.emit('myevent', 'shiyanlou');

server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');