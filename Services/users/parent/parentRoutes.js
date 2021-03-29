const express = require('express');
const path = require('path');
const xss = require('xss');
const Services = require('./parentService');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../../utilities/jwtGenerator');
const jsonParser = express.json();
const parentRouter = express.Router();
const authorization = require('../../utilities/authorization');

   
// New Parent Registration

parentRouter
.post('/register', jsonParser, async (req, res, next) => {
    
    const { parent_name, parent_username, user_type, family_last_name, password} = req.body;
    const newUser = {parent_name, parent_username, user_type, family_last_name, password};
    const users = await Services.checkForUser(req.app.get('db'), newUser.parent_username)
        if (users) {
            return res.status(400).json({error: 'username not available'});
        } 
  const saltRound = 2
  const salt = await bcrypt.genSalt(saltRound)
  const bcryptPassword = await bcrypt.hash(password, salt)
  const addUser = await Services.insertParentUser(req.app.get('db'), newUser.parent_name, newUser.user_type, newUser.family_last_name, newUser.parent_username, bcryptPassword); 
  const token =  jwtGenerator(addUser[0].parent_user_id)
       res.json({token})     
  .catch(next);
});

module.exports = parentRouter;