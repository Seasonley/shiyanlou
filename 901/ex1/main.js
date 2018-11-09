var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());

app.get('/show', function(req, res) {
    var cookies = req.cookies;
    var text = JSON.stringify(cookies);
    res.send('<h1>Show-Cookie: ' + text + '</h1>');
});

app.get('/set', function(req, res) {
    res.cookie('user', 'ZhangSan');
    res.send('<h1>Set-Cookie</h1>');
});

app.get('/del', function(req, res) {
    res.clearCookie('user');
    res.send('<h1>Del-Cookie</h1>');
});

app.listen(8080);