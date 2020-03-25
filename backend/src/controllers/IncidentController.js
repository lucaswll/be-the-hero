const connection = require('../database/connection')

module.exports = {
    async delete(request, response){
        const {id} = request.params //pega o id colocado na rota
        const ong_id = request.headers.authorization //pega o id da ong

        const incident = await connection('incidents')
            .where('id', id) //buscar o id na tabela incidents que for igual ao id que esta na rota (..localjost/incidents/3)
            .select('ong_id') //seleciono este id
            .first() //o primeiro que for encontrado (retorna so 1 resultado)

        if(incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted.'}) //retorna o status do HTTP 401 - representa nao autorizado
        }

        await connection('incidents').where('id', id).delete()

        return response.status(204).send() //apaga o registro e mostra status 204 - ok (sem retorno)
    },

    async listarTudoDeUmaOng (request, response){
        const ong_id = request.headers.authorization

        const incidents = await connection('incidents')
            .where('ong_id', ong_id) //procura se a ong é a que está logada
            .select('*') //e seleciona tudo dessa ong

        return response.json(incidents)
    },

    async listar (request, response){
        const { page =1 } = request.query //posso enviar na rota atraves do '?' (...localhost/listar?name=ONG1&ong_id=2)

        const [count] = await connection('incidents') //colchetes pq retorna um vetor, fazendo assim, pego só o primeiro valor..
            .count()

        console.log(count)
        response.header('X-Total-Count', count['count(*)']) //salva no header da resposta (lado direito insomnia) quantos incids ele contou (usavel no front)

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//junção das tabelas ongs e incidents, pra saber qual ong está relacionada àquele incident
            .limit(5)//retornar apenas 5 incidents
            .offset((page-1)*5) //sempre usual no esquema de paginação (quando quero limitar a qtde de registros numa pagina)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'])//estou selecionando TODOS os incidents, porem, só esses campos das ongs (todos exceto id, porque chocava com o do incident)
        
        return response.json(incidents)
    },

    async create(request, response){
        const { title, description, value } = request.body
        //OBS: para saber qual ong estará logada, para poder fazer a criação do incident (case),
        //o campo id da ONG não vem aqui ↑, mas no cabeçalho (header) da criação do incident (campo Authorization)

        const ong_id = request.headers.authorization

        const [id_incident] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id_incident })
    }
}