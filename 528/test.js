'use strict';

const scanPorts = require('./scanPorts');

scanPorts('127.0.0.1', 1, 65535, (ports) => {
    console.log('open ports: ', ports);
});