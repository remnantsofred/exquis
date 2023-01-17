const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug');

const cors = require('cors');
const csurf = require('csurf');
const { isProduction } = require('./config/keys');

require('./models/User');
require('./models/Skeleton');
require('./models/Comment');
require('./config/passport'); 
require('./models/Like')
const passport = require('passport'); 


const usersRouter = require('./routes/api/users'); // update the import file path
const skeletonsRouter = require('./routes/api/skeletons'); // update the import file path
const commentsRouter = require('./routes/api/comments'); // update the import file path
const csrfRouter = require('./routes/api/csrf'); // update the import file path
const likesRouter = require('./routes/api/likes'); // update the import file path

const app = express();

app.use(logger('dev')); // log request components (URL/method) to terminal
app.use(express.json()); // parse JSON request body
app.use(express.urlencoded({ extended: false })); // parse urlencoded request body
app.use(cookieParser()); // parse cookies as an object on req.cookies

// ADD THIS SECURITY MIDDLEWARE
// Security Middleware
app.use(passport.initialize());
if (!isProduction) {
  // Enable CORS only in development because React will be on the React
  // development server (http://localhost:3000). (In production, the Express 
  // server will serve the React files statically.)
  app.use(cors());
}

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);



// Attach Express routers


app.use('/api/users', usersRouter); // update the path
app.use('/api/skeletons', skeletonsRouter); // update the path
app.use('/api/skeletons/:skeletonId/comments', commentsRouter); // update the path')
app.use('/api/skeletons/:skeletonId/likes', likesRouter); // update the path
app.use('/api/csrf', csrfRouter); // update the path

// Express custom middleware for catching all unmatched requests and formatting
// a 404 error to be sent as the response.
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

const serverErrorLogger = debug('backend:error');

// Express custom error handler that will be called whenever a route handler or
// middleware throws an error or invokes the `next` function with a truthy value
app.use((err, req, res, next) => {
  serverErrorLogger(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode,
    errors: err.errors
  })
});

module.exports = app;
