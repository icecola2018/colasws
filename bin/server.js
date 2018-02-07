#!/usr/bin/env node

var app = require('../app');
var debug = require('debug')('myexpress:server');
var http = require('http');
var path = require("path");

var port = (function(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0 && port < 65536) {
        return port;
    }
    return false;
})(process.argv[3] || '8080');
app.set('port', port);

var webpath = path.join(process.cwd(), process.argv[2]);
app.runat(webpath);

var server = http.createServer(app);
server.listen(port);

server.on('error', function(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
    default:
        throw error;
    }
});

server.on('listening', function() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
    console.log('Server run at ' + webpath);
    console.log('\n\nPress ENTER to exit.');
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
        const chunk = process.stdin.read();
        if (chunk !== null) {
            process.exit(0);
        }
    });

});


