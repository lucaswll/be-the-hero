const connection = require('../database/connection')
const crypto = require('crypto')//pacote para gerar strings aleatorios

module.exports = {

    async listar (request, response) { //com o método get do HTTP, PEGO os itens que estao naquela rota
        const ongs = await connection('ongs').select('*')
        
        return response.json(ongs)
    },

    async create (request, response) {
        const { name, email, whatsapp, city, uf } = request.body

        const id = crypto.randomBytes(4).toString('HEX')//gerando 4 caracteres aleatorios em hexadecimal
    
        await connection('ongs').insert({ //ou seja, espera pra fazer isso (await)até que a funcao retorne o id (async)
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id })
    }
}