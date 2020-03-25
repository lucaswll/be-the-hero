/**
 * para criar a migrate (table): npx knex migrate:make create_ongs(migrate's name)
 * vai ser criado esse arquivo aqui, no diretório indicado no knexfile.js em migrations
 * para criar o bd desta tabela, dps de escrever o nome da tabela e os campos que quero, dou um:
 * npx knex migrate:latest
 * 
 * para listar todos os comando, basta npx knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table){
      table.string('id').primary()

      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('whatsapp').notNullable()
      table.string('city').notNullable()
      table.string('uf', 2).notNullable()
  })
};

exports.down = function(knex) { //caso de algum problema (deleto a tabela..)
  return knex.schema.dropTable('ongs')
};
