const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const imagesRouter = require('./routes/images');
const fileUpload = require('express-fileupload');



//--------app middlewars to configure server---------------------------
const app = express();
app.use(cors())
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static',express.static(path.join(__dirname, 'public')));//static folder for static files like html,css,js
app.use(express.static(path.join(__dirname,'../gallery/build')));//




//------------------------Server Routes --------------------------------------------
app.use('/', indexRouter);
app.use('/images', imagesRouter);

//-------------------------ERROR CATCHES---------------------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//-------------------Error handler-----------------------------------------------------
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//--------------------------------------------------------------------------------------


module.exports = app;
