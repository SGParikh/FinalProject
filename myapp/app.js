var createError = require('http-errors');
var express = require('express');
var path = require('path');
var nodeMailer = require('nodemailer');
var bodyParser = require('body-parser');
var methodOverride=require('method-override')
var expressHBS=require('express-handlebars');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
var session = require('express-session');
var passport=require('passport');
var flash=require('connect-flash');
var port = process.env.PORT || '3000';


//route create
var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var galleryRouter = require('./routes/gallery');
var servicesRouter = require('./routes/services');
var bookingRouter = require('./routes/onlineBooking');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var galleryMTRouter = require('./routes/galleryMT');
var galleryEditRouter = require('./routes/galleryEdit');

var app = express();

require('dotenv').config()

//passport config
require('./config/passport')(passport);

//Connect to Mongo

const url=process.env.MONGO_CONNECT_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },(error) => {
  if(!error)
  {
    console.log("suucessfull connected")
  }
  else{
    console.log("connecting error")
  }
});



// view engine setup
app.engine('.hbs',expressHBS({defaultLayout: 'layout',extname: '.hbs'}))
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
//app.use(validator())
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  secret: 'uiid',
  resave: true,
  saveUninitialized: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

//Global vars
app.use((req,res,next)=>{
  res.locals.success_msg=req.flash('success_msg');
  res.locals.error_msg=req.flash('error_msg');
  res.locals.error=req.flash('error');
  next();
});

//router path deside
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/gallery', galleryRouter);
app.use('/services', servicesRouter);
app.use('/onlineBooking', bookingRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/galleryMT', galleryMTRouter);
app.use('/galleryEdit/:id', galleryEditRouter);

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


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

//module.exports = app;
