var sessions = {};

function Session(sid) {
    this.$sid = sid;

    this.destroy = function(callback) {
        delete sessions[this.$sid];
        callback(null);
    };
}

function createSID() {
    var chars = "0123456789";
    var length = chars.length;
    var sid = 'sid-';
    for (var i = 0; i < length; i++) {
        var number = Math.floor(Math.random() * length);
        sid += number;
    }
    return sid;
}

function getSession(req, res) {
    var sid;
    if (req.cookies.sid) {
        sid = req.cookies.sid;
    } else {
        sid = createSID();
        res.cookie('sid', sid);
    }

    var session;
    if (sessions[sid]) {
        session = sessions[sid];
    } else {
        session = new Session(sid);
        sessions[sid] = session;
    }

    return session;
}
module.exports = function(options) {
    function middleware(req, res, next) {
        req.session = getSession(req, res);
        next();
    }

    return middleware;
};