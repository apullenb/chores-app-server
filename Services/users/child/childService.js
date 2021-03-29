const bcrypt = require('bcrypt');

const Services= {

 

  checkForUser(knex, username) {
    return knex
      .from('children')
      .select('*')
      .where('username', username)
      .first();
  },

  insertChildUser(knex, full_name, username, user_type, family_id, age, gender, tokens, password) {
    return knex
      .insert({full_name, username, user_type, family_id, age, gender, tokens, password})
      .into('children')
      .returning('*')
      .then(rows => {
        return rows;
      });
  },

};


module.exports = Services;