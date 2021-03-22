require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const superRouter = require('./Services/SuperAdmin/SuperRoutes');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());


//Routes:

app.use('/api/superAdmin', superRouter);

app.use((error, req, res, next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);

});


module.exports = app;