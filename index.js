var createError = require('http-errors');
var express = require('express');
var flash = require('express-flash');
const session = require('express-session');
// var mysql = require('mysql');
// var connection  = require('./lib/db');
var indexRouting = require('./routes/routing');
var app = express();


// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

// for parsing incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


var sess = {
    secret: 'keyboard cat',
    cookie: {maxAge: 600000}
  }
  app.use(session(sess));


// for flash
app.use(flash());

app.use(indexRouting);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  next(createError(404));
//});

app.listen(3001);