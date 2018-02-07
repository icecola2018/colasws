var express = require("express");

var app = express();

app.runat = function(webpath) { 
    app.use(express.static(webpath));
    
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        var status = err.status || 500
        res.status(status);
        res.send('error http ' + status);
    });
}



module.exports = app;