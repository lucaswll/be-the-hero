const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate') //validador

const OngController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentController')
const LogInController = require('./controllers/LoginController')

const routes = express.Router()

routes.get('/ongs', OngController.listar)

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().length(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create) //validando o BODY de uma requisição, já que é nele que crio (so olhar no insomnia)

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentsController.listar) //pelo esquema de paginação, tenho que colocar (/incidents?page=2/3...) p mostrar os proximos 5
//validação pra que o query que vem dps do ?page=2/3.. precise ser um numero

routes.post('/incidents', IncidentsController.create)
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentsController.delete) //validando pelo parametro (da rota)

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