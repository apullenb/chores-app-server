const bcrypt = require('bcrypt');

const Services= {

 

  checkForUser(knex, username) {
    return knex
      .from('children')
      .select('*')
      .where('username', username)
      .first();
  },