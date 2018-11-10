var express = require('express');
var exSession = require('./exSession');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/show', function(req, res) {
    var session = exSession.getSession(req, res);

    if (session.hasOwnProperty('visitCount'))
        session.visitCount++;
    else
        session.visitCount = 0;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>' + session.visitCount + '</h1>');
    res.end();
});

app.get('/del', function(req, res) {
    var session = exSession.getSession(req, res);
    session.destroy();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Del Session</h1>');
    res.end();
});
app.listen(8080);