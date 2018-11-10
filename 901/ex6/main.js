var express = require('express');

var app = express();
var logger = require('./logger');
app.use(logger('LOG: '));

app.get('/login', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>login</h1>');
    res.end();
});

app.get('/logout', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>logout</h1>');
    res.end();
});

app.listen(8080);