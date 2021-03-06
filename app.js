var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var index = require('./routes/index');
var users = require('./routes/users');
var upload = require('./routes/upload');
var photo = require('./routes/photo');
var category = require('./routes/category');


var app = express();
require('./models/orm.js');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.set('view engine', 'html');
if (app.get("env") == "development") {
  console.log("development")
  app.set('view cache');
} else {
  app.set('view cache', true);
}


app.engine('html', ejs.__express);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
if (app.get("env") == "development") {
  app.use(express.static(path.join(__dirname, 'public')));
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

/*开发环境存放模拟数据文件夹*/
app.use(express.static(path.join(__dirname, 'resource')));

app.use('/', index);
app.use('/users', users);
app.use('/upload', upload);
app.use('/photo', photo);
app.use('/category', category);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;