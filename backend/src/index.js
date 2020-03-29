const express = require('express')
const cors = require('cors')
const { errors } = require('celebrate')
const routes = require('./routes') //./ pra referenciar a mesma pasta do arquivo routes (../ voltaria 1 pasta...)

const app = express() //aplicacao criada 

app.use(cors())
app.use(express.json()) //mostrar pra minha aplicação que as requisições (get, post..) serão no formato JSON (Insomnia)
app.use(routes)
app.use(errors())

app.listen(3333) //para minha aplicação ser aberta (ouvir) na porta 3333

/*Métodos HTTP
GET: busca informação do backend (consigo fazer tudo com o GET)
POST: cria uma informação no backend
PUT: altera uma info
DELETE: deleta uma info
*/

//SEMPRE NECESSÁRIO, PARA ATUALIZAR, PARAR O NODE (CTRL+C) E REINICIAR (node index.js)
//agora, com o Nodemon, utilizo npm start (start pq foi o nome que coloquei no scritp la no package.json)

/**
 * npm install x - instala o pacote x
 * npx install x - executa o pacote x
 */
