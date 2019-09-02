const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');

// Seting
app.set('port', 5000);
app.set('views', path.join(__dirname, 'views') );
app.set('view engine', 'ejs');

//Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

//Routes
app.use(require('./routes/index'));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler

app.use((req, res, next) => {
    res.status(404);
    res.send('404 Not Found');
})

module.exports = app;