
    var express      = require('express'),
        path         = require('path'),
        favicon      = require('serve-favicon'),
        logger       = require('morgan'),
        cookieParser = require('cookie-parser'),
        bodyParser   = require('body-parser');

    var routes = require('./routes/index'),
        users  = require('./routes/users'),
        notes  = require('./routes/notes');

    var app = express();

    /**
     * 静态资源
     */
    app
        .use(favicon(
            path.join(__dirname, 'public', 'favicon.ico')
        ))
        .use(express.static(
            path.join(__dirname, 'public')
        ))
    ;

    /**
     * 中间件
     */
    app
        .use(logger('dev'))
        .use(bodyParser.json())
        .use(cookieParser())
        .use(
            bodyParser.urlencoded({
                extended: false
            })
        )
    ;

    /**
     * 跨域请求
     */
    app.all('*', function (request, response, next) {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        response.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        response.header("Content-Type", "application/json;charset=utf-8");
        next();
    })

    /**
     * 路由处理
     */
    app
        .use('/', routes)
        .use('/users', users)
        .use('/notes', notes)
    ;


    /**
     * 404
     */
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        res.send('404');
    });
    if(app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: err
            });
        });
    }

    /**
     * 500
     */
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send('500');
    });

    /**
     * run
     */
    app.listen(8888, '127.0.0.1', function() {
        console.log('Run server: 127.0.0.1:8888');
    });

    module.exports = app;


