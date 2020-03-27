import React, { useState, useEffect } from 'react'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native' //o ultimo é o botao que muda sua opacidade ao ser clicado
import { Feather } from '@expo/vector-icons' //mesmo pacote de icones da web (aqui posso importar pelo expo)
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api.js'

import logoImg from '../../assets/logo.png' //nao precisa passar o @, ele adapta qual o melhor pro cell

import style from './style.js'

export default function Incidents() {
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)

    const [page, setPage] = useState(1) //estado para armazenar e controlar o numero da pagina (pg incial=1)
    const [loading, setLoading] = useState(false) //armazenar uma info de quando esta buscando dados novos, p nao buscar repetido

    const navigation = useNavigation() //like a useHistory() na web

    async function loadIncidents(){
        if(loading){ // DAQUI (scroll infinito, usei tb os estados para pagina e loading)
            return
        }
        if(total>0 && incidents.length == total){
            return
        }
        //senão:
        setLoading(true) //ATÉ AQUI(scroll infinito)

        const response = await api.get(`incidents?page=${page}`) // url ::: sem scroll url era só 'incidents'

        setIncidents([...incidents, ...response.data]) //onde estão os dados que estao na api ::: sem scroll infinito é só setIncidents(response.data)
        setTotal(response.headers['x-total-count']) //nome da variavel contadora que coloquei dentro do react (insomnia)

        setPage(page+1) //(scroll infinito)
        setLoading(false) //(scroll infinito)
    }
        
    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident }) //idem nome do acesso à rota em Routes.js, ou seja, clicando aqui, redireciona pra rota Detail
        //o segundo parametro serve pra passar todos dados do objeto incident pra proxima pagina Detail...
    }

    useEffect(() => {loadIncidents()}, []) //funcao disparada quando as variaveis dentro do vetor ali mudar

    return(
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={style.title}>Bem-vindo!</Text>
            <Text style={style.description}>Escolha um dos casos abaixo e salve o dia!</Text>

            <FlatList 
                style={style.incidentsList}
                data={incidents} //é a variável ali do useState()
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={true} //mostra barra lateral
                onEndReached={loadIncidents} //quando chegar no final da lista dispara a função ali (scroll infinito)
                onEndReachedThreshold={0.2} //a quantos % (20%) do final da lista preciso estar para recarregar + incidents (scroll infinito)
                renderItem={({ item: incident }) => (
                    <View style={style.incident}>
                        <Text style={style.incidentProperty}>ONG:</Text>
                        <Text style={style.incidentValue}>{incident.name}</Text>

                        <Text style={style.incidentProperty}>CASO:</Text>
                        <Text style={style.incidentValue}>{incident.title}</Text>

                        <Text style={style.incidentProperty}>VALOR:</Text>
                        <Text style={style.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

                        <TouchableOpacity style={style.detailsButton} onPress={() => navigateToDetail(incident)}>
                            <Text style={style.detailsButtonText}>Ver mais detalhes </Text>   
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}