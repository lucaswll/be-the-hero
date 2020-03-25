exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments() //chave primaria que se auto incrementa

        table.string('title').notNullable()
        table.string('description').notNullable()
        table.decimal('value').notNullable()

        table.string('ong_id').notNullable()//coluna que armazena qual a ong que criou este incidente = 
        //(relacionamento)

        table.foreign('ong_id').references('id').inTable('ongs')//chave estrangeira
        // (sempre que o ong_id estiver preenchido, estará tb dentro da tabela ongs)
    })
  };
  
  exports.down = function(knex) { //caso de algum problema (deleto a tabela..)
    return knex.schema.dropTable('incidents')
  };
  