const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');

// Error handlers
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Routers for Tours and Users
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/***************************************************/
// Use this to serve static files to the client
app.use(express.static(path.join(__dirname, 'public')));

// MIDDLEWARES
// console.log(process.env.NODE_ENV);
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP address',
});

app.use('/api', limiter);

// JSON Parser for requests from the client
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// Middlewares to mount routers to specific routes
app.get('/', (req, res) => {
  res.status(200).render('base');
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// Catch all unhandled URLs
app.all('*', (req, res, next) => {
  next(new AppError(`Invalid URI: ${req.originalUrl} requested!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
