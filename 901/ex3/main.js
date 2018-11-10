var express = require('express');
var fs = require('fs');
var exSession = require('./exSession');

var app = express();
var cookieParser = require('cookie-parser');
var users = {
    'root': '1q2w3e',
    'guest': '123456',
};

function auth(user, password) {
    return users.hasOwnProperty(user) && users[user] == password;
}
app.use(cookieParser());

app.get('/', function(req, res) {
    var session = exSession.getSession(req, res);

    if (session.hasLogin) {
        session.visitCount++;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('user = ' + session.user + '<br>');
        res.write('visitCount = ' + session.visitCount + '<br>');
        res.write('<a href=/logout>logout</a>');
        res.end();
    } else {
        fs.readFile('./login.html', function(err, data) {;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
});

app.get('/login', function(req, res) {
    var user = req.query.user;
    var password = req.query.password;

    if (auth(user, password)) {
        var session = exSession.getSession(req, res);
        session.hasLogin = true;
        session.user = user;
        session.visitCount = 1;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('Login OK, <a href=/>Goto Home</a>');
        res.end();
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('Login Failed, <a href=/>Goto Home</a>');
        res.end();
    }
});

app.get('/logout', function(req, res) {
    var session = exSession.getSession(req, res);
    session.destroy();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Logout, <a href=/>Goto Home</a>');
    res.end();
});
app.listen(8080);