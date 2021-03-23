const SuperService = {

  getAllChoreOptions(knex) {
    return knex
      .select('*')
      .from('chore_options');
  },

  addNewChore(knex, newEntry){
    console.log(newEntry);
    return knex
      .insert(newEntry)
      .into('chore_options')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

};


module.exports = SuperService;