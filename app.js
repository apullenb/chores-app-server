require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const superRouter = require('./Services/SuperAdmin/SuperRoutes');
const parentRouter = require('./Services/users/parent/parentRoutes');
const childRouter = require('./Services/users/child/childRoutes');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());


//Routes:

app.use('/api/superAdmin', superRouter);
app.use('/api/parent', parentRouter);
app.use('/api/child', childRouter);
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