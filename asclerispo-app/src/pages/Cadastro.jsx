
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from "../components/input"
import { useAutenticacao } from '../context/AutenticacaoContext'

function Cadastro() {
    const { login } = useAutenticacao()
    const navigate = useNavigate()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmar, setConfirmar] = useState('')
    const [erro, setErro] = useState('')

    function checklog() {
        if (!nome || !email || !senha || !confirmar) {
            setErro('Preencha todos os campos.')
            return
        }

        if (senha !== confirmar) {
            setErro('As senhas não coincidem.')
            return
        }

        const tipo = nome.trim().toLowerCase() === 'adm'
            ? 'admin'
            : 'comum'

        login({
            nome,
            email,
            tipo
        })

        if (tipo === 'admin') {
            navigate('/admin')
        } else {
            navigate('/landing')
        }
    }

    return (
        <div className="cadastro">

            <div className="card">
                <h1 id="titulo">Cadastre-se no Asclerispo</h1>

                <Input
                    title="Nome de usuário"
                    placeholder="Qualquer nome de até 20 caracteres."
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <Input
                    title="E-mail"
                    placeholder="Adicione um e-mail válido"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    title="Senha"
                    placeholder="Até 8 valores."
                    type="password"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <Input
                    title="Confirme senha"
                    placeholder="Preencha com os valores acima."
                    type="password"
                    id="confirmar"
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                />

                {erro && <p>{erro}</p>}

                <button onClick={checklog}>Enviar</button>
            </div>
        </div>
    )
}

export default Cadastro
