const bcrypt = require('bcrypt');

const Services= {

 

  checkForUser(knex, username) {
    return knex
      .from('parent_username')
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
      .from('parent_admin')
      .where('parent_user_id', id)
      .first();
  },

  getUserWithUserName(db, username) {
    return db('parent_admin')
      .where({ username })
      .first();
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },
};
module.exports = Services;