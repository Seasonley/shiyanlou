var sessions = {};

function Session(sid) {
    this.$sid = sid;

    this.destroy = function() {
        delete sessions[this.$sid];
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
exports.getSession = getSession;