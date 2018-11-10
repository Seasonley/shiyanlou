function logger(prefix) {
    function middleware(req, res, next) {
        console.log(prefix + req.url);
        next();
    }

    return middleware;
}

module.exports = logger;