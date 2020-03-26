import React, { useState } from 'react' //lembrar sempre que serve para armazenar os estados das 'variaveis'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './style.css'

import api from '../../services/api.js'

import logoImg from '../../assets/logo.svg'

export default function NewIncident(){

    const[title, setTitle] = useState('')
    const[description, setDescription] = useState('')
    const[value, setValue] = useState('')    

    const ongId = localStorage.getItem('ongId')

    const history = useHistory()

    async function handleNewIncident(e){ //precisa ser chamada no submit do form.. por isso está lá
        e.preventDefault() //previne o comportamento padrao do form

        const data = {
            title,
            description,
            value,
        }

        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile')
        }catch(error){
            alert('Erro ao cadastrar caso. Tente novamente.')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Heroes" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para o logon
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">
                        Cadastrar
                    </button>

                </form>
            </div>
        </div>
    )
}