// 主程序

// 引入server，router及requestHandler
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

// 保存url处理方法
var handle = {};
handle['/'] = requestHandlers.home;
handle['/about'] = requestHandlers.about;

// 启动http server
server.start(router.route, handle);