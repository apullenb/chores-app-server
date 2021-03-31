const express = require('express');
const path = require('path');
const xss = require('xss');
const Services = require('./childService');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../../../utilities/jwtGenerator');
const jsonParser = express.json();
const childRouter = express.Router();
const authorization = require('../../../utilities/authorization');


//Create Child
// Request body - must get family_id from local storage token and add to the request body before sending request. Also,send token value of 0

childRouter
.post('/register', jsonParser, async (req, res, next) => {
    
    const { full_name, username, user_type, family_id, age, gender, tokens, password} = req.body;
    const newUser = {full_name, username, user_type, family_id, age, gender, tokens, password};
    const users = await Services.checkForUser(req.app.get('db'), newUser.username)
        if (users) {
            return res.status(400).json({error: 'username not available'});
        } 
  const saltRound = 2
  const salt = await bcrypt.genSalt(saltRound)
  const bcryptPassword = await bcrypt.hash(password, salt)
  const addUser = await Services.insertChildUser(req.app.get('db'), newUser.full_name, newUser.username, newUser.user_type, newUser.family_id, newUser.age, newUser.gender, newUser.tokens, bcryptPassword); 
  console.log(addUser)    
  res.status(200).json({message: `${newUser.full_name} has been added.`})     
  .catch(next);
});

// Child Login
childRouter
.post('/login', jsonParser, async (req, res, next) => {
    const {username, password } = req.body;
    const loginUser = {username, password };
    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
   const searchUsers = await Services.getUserWithUserName(req.app.get('db'), loginUser.username)
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
            const token =  jwtGenerator(searchUsers.child_id)
            res.json({token}) 
      })
      .catch(next);
  });

  childRouter
  .get('/chores', authorization, async (req, res) => { 
    try {
       const user = await Services.getAssignedChores(req.app.get('db'), req.child_id)
       res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('server error');
    }
  })


module.exports = childRouter;