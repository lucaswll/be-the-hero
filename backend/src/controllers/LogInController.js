const connection = require('../database/connection')

module.exports = {
    async create(request, response){
        const {id} = request.body //busco o id da ong atraves do corpo da requisicao (para ver se ja existe)

        const ong = await connection('ongs') //tentar buscar uma ong do BD
            .where('id', id)
            .select('name')
            .first()
        
        if(!ong){
            return response.status(400).json({error: 'No ONG found with this id.'})
        }
        
        return response.json(ong) //retorna o nome da ong
    }    
}