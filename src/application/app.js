const express = require('express');
const {errorMiddleware} = require('./middlewares')
const app = express();

require('./routes')(app);
app.use(errorMiddleware)

module.exports = app;