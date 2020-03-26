import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api.js'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Register(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory() //uso para substituir o link, para enviar o user para a rota x

    async function handleRegister(e){
        e.preventDefault()

        const data = {
            name, 
            email, 
            whatsapp, 
            city, 
            uf,
        }

        try{
            const response = await api.post('ongs', data) //por padrão, axios já envia os dados como json

            alert(`Seu id de acesso: ${response.data.id}`)

            history.push('/') //reenvio para rota de login
        }catch(error){
            alert('Erro no cadastro. Tente novamente.')
        }
        
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Heroes" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para o logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} //'e' é o parametro da funcao, o setname.. é o corpo da arrowFunction
                    />
                    <input
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="UF" 
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">
                        Cadastrar
                    </button>

                </form>
            </div>
        </div>
    )
}