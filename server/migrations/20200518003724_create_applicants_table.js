
exports.up = function(knex) {
  return knex.schema.createTable('applicants', table => {
    table.increments('id').primary().unsigned();
    table.string('first_name');
    table.string('last_name');
    table.string('email').notNullable();
    table.string('token').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('applicants');
};
