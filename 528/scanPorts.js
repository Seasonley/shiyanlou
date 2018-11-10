'use strict';

// 引入 net 模块
const net = require('net');
// 进度条模块
// 此模块需要安装：npm install progress
// 用于显示扫描端口完成进度
const ProgressBar = require('progress');

/**
 * 端口扫描函数
 * 
 * @param host {String} 扫描端口的IP/URL地址
 * @param start {Number} 起始端口
 * @param end {Number} 结束端口
 * @return {Promise} 返回一个Promise对象
 */
function checkPorts(host, start, end) {
    // 返回Promise
    return new Promise((resolve, reject) => {
        let counts = end - start + 1; // 需要扫描的IP数量
        let ports = []; // 保存可连接的IP

        // 创建进度条
        let bar = new ProgressBar(' scanning [:bar] :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 50,
            total: counts,
        });

        // 循环扫描所有IP
        for (let i = start; i <= end; ++i) {
            // 使用 net.connect() 尝试连接端口
            let check = net.connect({
                host: host,
                port: i,
            }, () => {
                // 连接成功，表示此端口是开发的
                // 保存此端口
                ports.push(i);
                // 检测完毕，断开此连接
                check.destroy();
            });

            check.on('close', () => {
                // check.destroy() 会触发 close 事件
                // 尝试连接端口也会触发 close 事件断开连接

                // 每断开一个连接，说明就检测完成了一个端口
                counts--;

                // 显示进度条
                bar.tick(1);

                // 此时检测完了所以端口
                if (counts === 0) {
                    if (ports.length) {
                        resolve(ports);
                    } else {
                        reject('no port is open');
                    }
                }
            });

            check.on('error', (err) => {
                // 端口未开发时，连接会失败
                // 此时会触发 error 事件
                // 然后会触发 close 事件
            });
        }
    });
}

/**
 * 导出端口扫描包装函数
 *
 * @param host {String} 扫描端口的IP/URL地址
 * @param start {Number} 起始端口
 * @param end {Number} 结束端口
 * @param callback {function} 回调函数
 */
module.exports = (host, start, end, callback) => {
    // 检测参数
    // 如果只传了三个参数，并且end是一个函数
    // 那么自动作参数调换
    if (typeof end === 'function' && callback === undefined) {
        callback = end;
        end = start;
    }

    // 调用函数扫描端口
    checkPorts(host, start, end).then((ports) => {
        callback(ports);
    }).catch((err) => {
        console.log(err);
    });
}