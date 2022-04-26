var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");


var planRouter = require('./routes/plan.routes')
var movieRouter = require('./routes/movie.routes');
var authRouter = require ('./routes/auth.routes')
var userRouter = require ('./routes/user.routes');
var categoryRouter = require('./routes/category.routes');
var moviecategoryRouter = require('./routes/moviecategory.routes');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//accepts apis requests from this origin.  
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

app.use('/api/plan', planRouter);
app.use('/api/movie', movieRouter);
app.use('/api/user', userRouter);  
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/moviecategory', moviecategoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
