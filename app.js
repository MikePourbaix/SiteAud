const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const hbs = require('hbs');
const bodyParser = require('body-parser');
require('dotenv').config();

const appInsights = require("applicationinsights");
appInsights.setup("0d76c128-6b71-469d-a661-0c9ff56f83b4").start();


hbs.registerHelper('exists', function (variable, options) {
  return typeof variable !== 'undefined' ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('eq', function (a, b) {
  return a === b;
});

const indexRouter = require("./routes/index.js");
const kineRouter = require('./routes/kines.js');
const coachingRouter = require("./routes/coachings.js");

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev')); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/kines', kineRouter);
app.use('/coachings', coachingRouter);


app.use((req, res, next) => next(createError(404)));

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.render('error', { error });
});

app.listen(port, () => console.log('App listening on : https://localhost:' + port));
