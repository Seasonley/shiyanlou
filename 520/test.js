'use strict';

const StaticServer = require('./StaticServer');

// 创建对象
let server = new StaticServer();

// 启动服务
server.run();

// 停止服务
// server.close();