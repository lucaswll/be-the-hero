const express = require('express')

const OngController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentController')
const LogInController = require('./controllers/LoginController')

const routes = express.Router()

routes.get('/ongs', OngController.listar)
routes.post('/ongs', OngController.create)

routes.get('/incidents', IncidentsController.listar) //pelo esquema de paginação, tenho que colocar (/incidents?page=2/3...) p mostrar os proximos 5
routes.post('/incidents', IncidentsController.create)
routes.delete('/incidents/:id', IncidentsController.delete)

routes.get('/tudodaong', IncidentsController.listarTudoDeUmaOng)

routes.post('/login', LogInController.create)

module.exports = routes //exportar essa variavel routes (que é a minha rota) pra ser usada no index






//npx knex migrate:status/latest/rollback

/*routes.post('/main2', (request, response)=> {
    //const query = request.query
    //const params = request.params
    const body = request.body

    //console.log(query) //params é o que vem do parametro query, que é o que é digitado na rota (no caso, main2/?name=lucas&idade=23)
    //console.log(params) //params2 é o que vem do parametro de params, que é o id colocado na rota (no caso, main2/:id)
    console.log(body)
    return response.json({
        titulo: 'Semana 11 da Omnistack',
        aluno: 'Lucas wallace'
    })
})*/