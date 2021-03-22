const SuperService = {

  getAllChoreOptions(knex) {
    return knex
      .select('*')
      .from('chore_options');
  },


};


module.exports = SuperService;