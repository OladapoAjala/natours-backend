const express = require('express');
const morgan = require('morgan');

// Error handlers
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Routers for Tours and Users
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// JSON Parser for requests from the client
app.use(express.json());

/***************************************************/
// Use this to server static files to the client
// app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// Middlewares to mount routers to specific routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Catch all unhandled URLs
app.all('*', (req, res, next) => {
  next(new AppError(`Invalid URI: ${req.originalUrl} requested!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
