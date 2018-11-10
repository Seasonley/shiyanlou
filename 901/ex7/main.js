var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var exSession = require('./exSession');
app.use(exSession({
    secret: 'recommand 128 bytes random string',
    cookie: { maxAge: 60 * 1000 }
}));

app.get('/show', function(req, res) {
    var session = req.session;

    if (session.hasOwnProperty('visitCount'))
        session.visitCount++;
    else
        session.visitCount = 0;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>' + session.visitCount + '</h1>');
    res.end();
});

app.get('/del', function(req, res) {
    var session = req.session;

    session.destroy(function(err) {
        console.log('del session');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Del Session</h1>');
        res.end();
    });
});

app.listen(8080);