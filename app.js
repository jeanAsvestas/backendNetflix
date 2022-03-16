var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const passport = require('passport');
// const Strategy = require('passport-local').Strategy;
// const db = require('./models/index');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const bcrypt = require('bcryptjs')
const cors = require("cors");

//comment


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var planRouter = require('./routes/plan.routes')
var movieRouter = require('./routes/movie.routes');
//var authRouter = require('./routes/auth.routes/auth.routes')
var authRouter = require ('./routes/auth.routes')
var userRouter = require ('./routes/user.routes');
var categoryRouter = require('./routes/category.routes');
const category = require('./models/category');
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
//passport
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(session({ secret: 'anything' }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/')));
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
// ends passport
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/api/plan', planRouter);
app.use('/api/movie', movieRouter);
app.use('/api/user/test', userRouter);  // not active 
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//passport
// passport.use(new Strategy({
// 	usernameField: 'email',
// 	passwordField: 'password'
// 	},
// 	function(username, password, cb) {
// 		db.User.findOne({
// 			where: {
// 				email: username
// 			},
// 			raw : true
// 		}).then(function(user){
// 			if (!user) { return cb(null, false); }// false, no login redirect			
// 			if (!bcrypt.compareSync(password,user.password)) { return cb(null, false); }// false, no login redirect
// 			return cb(null, user);
// 		}).catch(function(error){
// 			if (error) { return cb(null, error); }
// 	});
// }));
// //auth.authenticated this function returns a user.email
// //serialize == i put something in a series of things
// // 1 2 4 5 3
// passport.serializeUser(function(user, cb) {
// 	cb(null, user.email);
// });

// passport.deserializeUser(function(username, cb) {
// 	db.User.findOne({
// 		where: {
// 			email: username
// 		},
// 		raw : true
// 	}).then(function(user) {
// 		cb(null, user.id);
// 	});
// });



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
