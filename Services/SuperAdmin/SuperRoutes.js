const express = require('express');
const path = require('path');
const xss = require('xss');
const Services = require('./SuperService');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../../utilities/jwtGenerator');
const jsonParser = express.json();
const superRouter = express.Router();
const authorization = require('../../utilities/authorization');


//Super User Login

// Get All Parent Accounts

superRouter.get('/parents', async (req, res) => {
  try {
      const parents = await Services.getAllParentAccts(req.app.get('db'));
      res.json(parents)
  }
  catch {
      console.error('error')
      res.status(500).json('Server Error')
  }
})
// Get All Pre-Defined Chores

superRouter.get('/chores', async (req, res) => {
    try {
        const chores = await Services.getAllChoreOptions(req.app.get('db'));
        res.json(chores)
    }
    catch {
        console.error('error')
        res.status(500).json('Server Error')
    }
})

//Add New Chore Option

superRouter.post('/chores', jsonParser, (req, res) => {
    console.log(req.body)
    const { title, value, steps, description, time_est, suggested_age } = req.body;
    const newChore = { title, value, steps, description, time_est, suggested_age };
    console.log(newChore)
    for (const [key, value] of Object.entries(newChore))
      if (value === null || undefined || "")
        return res.status(400).json({
          error: `Missing Value for '${key}' `,
        });
   
    Services.addNewChore(req.app.get('db'), newChore)
    .then((entry) => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${entry.id}`))
        .json(entry);
    });
  });




module.exports = superRouter;