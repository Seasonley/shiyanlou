var express = require('express');
var app = express();

app.use(express.static('.'));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var exSession = require('express-session');
app.use(exSession({
    secret: 'recommand 128 bytes random string',
    cookie: { maxAge: 60 * 1000 }
}));

var ejs = require('ejs');
app.set('views', __dirname);
app.set('view engine', 'ejs');
var users = {
    'root': '1q2w3e',
    'guest': '123456',
};

function auth(user, password) {
    return users.hasOwnProperty(user) && users[user] == password;
}
app.get('/', function(req, res) {
    var session = req.session;

    if (session.hasLogin) {
        session.visitCount++;
        res.render('stat', session);
    } else {
        res.render('login', session);
    }
});

app.get('/login', function(req, res) {
    var user = req.query.user;
    var password = req.query.password;

    if (auth(user, password)) {
        var session = req.session;
        session.hasLogin = true;
        session.user = user;
        session.visitCount = 1;
        res.redirect('/');
    } else {
        res.render('failed', {});
    }
});

app.get('/logout', function(req, res) {
    var session = req.session;
    session.destroy(function(err) {
        res.redirect('/');
    });
});

app.listen(8080);