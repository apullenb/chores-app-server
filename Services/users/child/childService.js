const bcrypt = require('bcrypt');

const Services= {

 

  checkForUser(knex, username) {
    return knex
      .from('children')
      .select('*')
      .where('username', username)
      .first();
  },

  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
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

  getAssignedChores(knex, id) {
    return knex
      .select('*')
      .from('chores')
      .where('child_id', id);
  }
};


module.exports = Services;