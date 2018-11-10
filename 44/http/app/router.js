var fs = require('fs');

// 路由函数
// 处理不同url的请求
// 并返回相应内容

function route(handle, pathname, res, req) {
    console.log('About to route a request for ' + pathname);

    // 判断此url是否存在特定处理函数
    // 存在则调用handle处理
    // 不存在则返回404页面
    if (typeof handle[pathname] === 'function') {
        // 后面介绍handle函数
        handle[pathname](res, req);
    } else {
        console.log('No request handler found for ' + pathname);

        // 读取404页面
        // 所有页面都存放在view文件夹下
        var content = fs.readFileSync('./views/404.html');
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(content);
        res.end();
    }
}
// 导出 route 方法
exports.route = route;