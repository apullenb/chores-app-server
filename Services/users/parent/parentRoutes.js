const express = require('express');
const path = require('path');
const xss = require('xss');
const Services = require('./parentService');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../../../utilities/jwtGenerator');
const jsonParser = express.json();
const parentRouter = express.Router();
const authorization = require('../../../utilities/authorization');

   
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
  const addUser = await Services.insertParentUser(req.app.get('db'), newUser.parent_name, newUser.parent_username, newUser.user_type, newUser.family_last_name, bcryptPassword); 
  const token =  jwtGenerator(addUser[0].parent_user_id, addUser[0].family_id)
       res.json({token})     
  .catch(next);
});

// Parent Log-in
parentRouter
.post('/login', jsonParser, async (req, res, next) => {
    const {parent_username, password } = req.body;
    const loginUser = {parent_username, password };
    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
   const searchUsers = await Services.getUserWithUserName(req.app.get('db'), loginUser.parent_username)
      if (searchUsers === undefined) {
          return res.status(400).json({
            error: 'Incorrect username or password',
          });
        }
    
        return Services.comparePasswords(loginUser.password, searchUsers.password)
          .then(compareMatch => {
            if (!compareMatch) {
              return res.status(400).json({
                error: 'Incorrect username or password',
              })
            }
        
            const token =  jwtGenerator(searchUsers.parent_user_id)
            res.json({token}) 
      })
      .catch(next);
  });

  parentRouter
  .get("/", authorization, (req, res, next) => {
    const id = req.user;
    const knexInstance = req.app.get("db");
    Services.getById(knexInstance, id)
      .then((user) => {
        res.json(user);
      })
      .catch(next);
  });

  //Return all children in a family
  parentRouter
  .get('/children', authorization, async (req, res) => { 
    try {
       const user = await Services.getById(req.app.get('db'), req.user)
       const children = await Services.getAllChildrenOfParent(req.app.get('db'), user.family_id)
       console.log(children)
       res.json(children)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('server error');
    }
  })

module.exports = parentRouter;