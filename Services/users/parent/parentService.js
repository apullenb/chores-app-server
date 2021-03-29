const bcrypt = require('bcrypt');

const Services= {

  getAllUsers(knex) {
    return knex.select('*').from('users');
  },

  checkForUser(knex, username) {
    return knex
      .from('users')
      .select('*')
      .where('username', username)
      .first();
  },
  
  insertParentUser(knex, parent_name, parent_username, user_type, family_last_name, password) {
    return knex
      .insert({parent_name, parent_username, user_type, family_last_name, password})
      .into('parent_admin')
      .returning('*')
      .then(rows => {
        return rows;
      });
  },
  getById(knex, id) {
    return knex
      .select('*')
      .from('users')
      .where('user_id', id)
      .first();
  },

  getUserWithUserName(db, username) {
    return db('users')
      .where({ username })
      .first();
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },
};
module.exports = Services;