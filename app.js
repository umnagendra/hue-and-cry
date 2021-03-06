var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var logger = require('./helpers/logger.js');
var httpLogger =  require('morgan');

var routes = require('./routes/index');
var analysis = require('./routes/analysis');

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(httpLogger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

app.use('/', routes);
app.use('/analyze', analysis);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).send('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
