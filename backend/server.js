let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let dotenv = require('dotenv');
let cors = require('cors')
let logger = require('morgan');
let mongoose = require('mongoose');
let middlewares = require('../backend/middleware/error-handlers')

const authRoutes = require('./routes/authRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

const PORT = process.env.PORT || 5000;

dotenv.config();

let app = express();

app.use(logger('dev'));
app.use(cors({origin: 'http://localhost:3001'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/auth', authRoutes);
app.use('/api/newsletter', newsletterRoutes);

// catch 404 and forward to error handler
//app.use(middlewares.notFoundError);

//app.use(middlewares.errorHandler);

//Listening for DB Operations
const DB = mongoose.connection;

DB.once('open', () => {
    console.log('Connected to DB');
  });
  
  DB.on('error', () => {
    console.log('Error in connecting to DB');
  });
  


app.listen(PORT, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`)
})


module.exports = app;