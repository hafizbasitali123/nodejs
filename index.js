var createError = require('http-errors');
var express = require('express');
var flash = require('express-flash');
var session = require('express-session');
// var mysql = require('mysql');
// var connection  = require('./lib/db');
var indexRouting = require('./routes/routing');
var app = express();
 
// var loginRouter = require('./routes/login');

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

// for parsing data
app.use(express.urlencoded({ extended: false }));


// alerts
app.use(session({ 
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'false',
    secret: 'secret'
}))

// for flash
app.use(flash());



app.use(indexRouting);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(3001);