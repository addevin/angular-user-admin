var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors')

var userRouter = require('./routes/user');
var authRouter = require('./routes/auth');
var adminRouter = require('./routes/admin');
const dotenv = require('dotenv')

var app = express();
dotenv.config()


mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_SECRET).then(()=>{
  console.log('Database connected... ['+process.env.DB_SECRET+']')
  // next()
})
.catch((err)=>{
  console.log(err)
  // next(createError(500))
})
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET, POST, PUT',
  allowedHeaders: 'Content-Type, Authorization',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',  userRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.json({
    error: err.message,
    statusCode:err.status || 500
  });
});

module.exports = app;
