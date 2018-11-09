var http = require('http');
http.createServer(function(req, res) {
    var url = req.url;

    if (url.startsWith('/set')) {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Set-Cookie': 'user=ZhangSan'
        });
        res.write('Set-Cookie');
        res.end();
    }

    if (url.startsWith('/show')) {
        var cookie = req.headers.cookie;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write('Show-Cookie: ' + cookie);
        res.end();
    }

    if (url.startsWith('/del')) {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Set-Cookie': 'user=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        });
        res.write('Del-Cookie');
        res.end();
    }
}).listen(8080);