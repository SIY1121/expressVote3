console.log("起動中... 接続しないでください");

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

//initialize database connection
require("./utils/databaseManager");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const voteRouter = require('./routes/vote');
const adminRouter = require('./routes/admin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,//アクセスしてきたユーザーに一意のIDを付与
    cookie: {
        httpOnly: true,
        secure: false
    }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vote', voteRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
