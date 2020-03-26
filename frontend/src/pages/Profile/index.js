import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api.js'

import './style.css'
import logoImg from '../../assets/logo.svg'

export default function Profile(){

    const [incidents, setIncidents] = useState([])

    const history = useHistory() //reenviar para outra rota

    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    useEffect(() => { //pacote importado; serve para buscar/atualizar os dados de acordo com o id da ong (retorna os dados = 'data')
        api.get('tudodaong', {
            headers:{
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    async function handlesDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {//pq nesse formato? Porque é como coloquei pra estar na rota do delete, no backend
                headers: {
                    Authorization: ongId, //sempre preciso passar, pra pegar a ONG que está deletando o incident
                }
            })  

            setIncidents(incidents.filter(incident => incident.id !== id)) //para todos os incidents filtrados, listar apenas os que nao tem o id ali dentro
            //ou seja, serve para excluir a grid css lá da pagina, assim que clicar no botão de delete
        }catch(error){
            alert('Erro ao tentar deletar o caso. Tente novamente!')
        }
    }

    function handleLogOut(){
        localStorage.clear()

        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Hero"></img>
                <span>Bem vinda, {ongName}</span>

                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                <button onClick={handleLogOut} type="button">
                    <FiPower size={18} color="#e02041" />                
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => ( //map=listagem de todos os itens de incident (entre chaves pois é codg js); o key é o argumento unico nos incidentes, necessario pra exclusao
                    <li key={incident.id}> 
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style:'currency', currency: 'BRL' }).format(incident.value)}</p>

                    <button onClick={() => handlesDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}
            </ul>
        </div>//intl=internacionalização - usado para format: time, number, $, plural de string..
        //ali no onClick do button, criei uma arrowFunction para que ao clicar, ele retorne a execução da funcao.
        //se faço apenas handlesDeleteIncident(incident.id), ele apenas pega o que a funcao vai retornar..
    )
}