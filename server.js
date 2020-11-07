const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// *Config
const connectdb = require('./config/db');
const passportSetup = require('./config/passport-setup');
require('dotenv').config({ path: __dirname + '/.env' });

// *Routes
const profroutes = require('./routes/profroutes.js');
const userroutes = require('./routes/userroutes.js');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

// *Connect to database
connectdb();

const server = app.listen(PORT, console.log(`Server started on Port ${PORT}`));

//add middlewares
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// Cookie Parser
app.use(cookieParser());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  }),
);

//initiaise passport
app.use(passport.initialize());
app.use(passport.session());

// *Routes
app.use('/api/prof', profroutes);
app.use('/api/user', userroutes);
// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
