// 创建http server
//

// 加载所需模块
var http = require('http');
var url = require('url');
var fs = require('fs');

// 设置ip和端口
// 实际应用中，可以把这些写到配置文件中
var host = '127.0.0.1',
    port = 8080;

// 创建http server
function start(route, handle) {
    // 参数
    // route  判断url是否存在，存在则调用handle处理，不存在则返回404
    // handle 处理不同的url请求


    // 处理request请求
    function onRequest(req, res) {
        // 使用url.parse()方法解析url
        // 它会把url string转化为一个object
        // 这样我们就可以很方便的获取url中的host、port、pathname等值了
        var pathname = url.parse(req.url).pathname;
        console.log('Request for ' + pathname + ' received.');

        // 判断并处理不同url请求
        // 后面介绍此方法
        route(handle, pathname, res, req);
    }

    // 使用http.createSserver()方法创建http server
    // 并传入onRequest()方法
    // 然后使用listen()方法监听指定地址
    http.createServer(onRequest).listen(port, host);
    console.log('Server has started and listening on ' + host + ':' + port);
}

// 导出 start 方法
exports.start = start;