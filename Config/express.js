var express = require('express')
var morgan = require('morgan')
var compression = require('compression')
var bodyParser  = require('body-parser')
const validator = require('express-validator');
var session = require('express-session');
var cookieSession = require('cookie-session');

module.exports = function() {
    var app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else {
        app.use(compression);
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(cookieSession ({
        name: 'session',
        keys: ['secret_key1', 'secret_key2']
    }));

    app.use(session ({
        secret: 'secret_key',
        resave: false,
        saveUninitialized: true
    }));

    app.use(bodyParser.json());
    app.use(validator()); //ใส่ต่อจาก bodyparser ทันที

    require('../App/routes/index.routes')(app);
    require('../App/routes/user.routes')(app);
    app.use(express.static('Public')); //ควรเอาไว้หลัง routing จะทำงานเร็วกว่า

    return app;
}