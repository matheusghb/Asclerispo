import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAutenticacao } from '../context/AutenticacaoContext'
import GrandeTitulo from "../components/grandetitulo"
import Banco, { useBanco } from '../components/banco'

function CadastroContent() {
    const { login } = useAutenticacao()
    const navigate = useNavigate()

    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [comentario, setComentario] = useState('')

    const [admin,setAdmin] = useState(false)

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmar, setConfirmar] = useState('')
    
    const [idade, setIdade] = useState(0)
    const [atividade, setAtividade] = useState(0)
    const [imunidade, setImunidade] = useState(0)

    const [erros,setErros] = useState([])

    const { withDatabase } = useBanco()

    document.onkeydown = (e) => {
        if (e.key == "Enter") {
            checklog()
        }
    }

    async function checklog() {

        const erros = []

        if (!nome || !email || !senha || !confirmar) {
            erros.push("Preencha todos os campos obrigatórios.")
        }

        if (senha !== confirmar) {
            erros.push("Campo senha e confirmar senha não coencidem.")
        }

        const isUsed = await withDatabase( async (db) => {
            const account = await db.sql(`SELECT id FROM User WHERE email == "${email}"`)
            return account
        })

        console.log(isUsed.length > 0)

        if (isUsed.length > 0) {
            erros.push("O E-mail inserido já existe no banco.")
        }

        setErros(erros)

        if (erros.length == 0) {
            await withDatabase( async (db) => {
                await db.sql(`INSERT INTO User (email, senha, nome, sobrenome, comentario, idade, atividade, imunidade, admin) VALUES ("${email}","${senha}","${nome}","${sobrenome}","${comentario}",${idade},${atividade},${imunidade},${admin})`)
                console.log("Enviado com sucesso")
            })
        }
    }

    function renderErros(erroarray) {
        if (erroarray.length > 0) {
            return(
                <div id="alerta">
                    {erroarray.map((value,index)=>{return(<p key={index}>{value}</p>)})}
                </div>
            )
        }
    }

    return (
        <div className="display" id="cadastro">

            <div id="cadastro-container">
                <GrandeTitulo>
                    Cadastro
                </GrandeTitulo>

                {renderErros(erros)}

                <div className="inputgrid">

                    <div className="field">
                        <label htmlFor="email">E-mail *</label>
                        <input type="email" name="email" id="email" placeholder='Ex: email@gmail.com' onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </div>

                    <div className="field">
                        <label htmlFor="senha">Senha *</label>
                        <input type="text" name="senha" id="senha" placeholder='Ex: S3nh4F0rt3' required onChange={(e)=>{setSenha(e.target.value)}}/>
                    </div>

                    <div className="field">
                        <label htmlFor="confirmar">Confirmar senha *</label>
                        <input type="password" name="confirmar" id="confirmar" placeholder='Reescreva aqui o que escreveu acima.' onChange={(e)=>{setConfirmar(e.target.value)}}/>
                    </div>

                    <hr />

                    <div className="field">
                        <label htmlFor="nome">Nome *</label>
                        <input type="text" placeholder="Ex: Marcelo" name="nome" id="nome" onChange={(e)=>{setNome(e.target.value)}}/>
                    </div>

                    <div className="field">
                        <label htmlFor="sobrenome">Sobrenome </label>
                        <input type="text" placeholder="Ex: Silva" name="sobrenome" id="sobrenome" onChange={(e)=>{setSobrenome(e.target.value)}}/>
                    </div>

                    <div className="field">
                        <label htmlFor="comentario">Comentario </label>
                        <input type="text" name="comentario" placeholder='Descreva sua condição atual brevemente.' id="comentario" onChange={(e)=>{setComentario(e.target.value)}} />
                    </div>

                    <div id="sliders">
                        <div id="slidertitle">
                            <h1>Tabela informativos</h1>
                            <p><i>Todos estarão disponíveis no seu perfil.</i></p>
                        </div>
                        <hr />
                        <div className="slider">
                            <label htmlFor="idade">Idade: {["N/A","<10","11-18","19-30","31-50","+51"][idade]}</label>
                            <input type="range" name="idade" id="idade" step={1} min={0} max={5} onChange={(e)=>{setIdade(e.target.value)}}/>
                        </div>
                        <div className="slider">
                            <label htmlFor="atividade">Atividade: {["N/A","Deficiente(a)","Sedentário(a)","Moderato","Saudável","Admirável"][atividade]}</label>
                            <input type="range" name="atividade" id="atividade" step="1" min={0} max={5} onChange={(e)=>{setAtividade(e.target.value)}}/>
                        </div>
                        <div className="slider">
                            <label htmlFor="imunidade">Imunidade: {["N/A","Fragilizada","Fraca","Mediana","Resistente","Forte"][imunidade]}</label>
                            <input type="range" name="imunidade" id="imunidade" step="1" min={0} max={5} onChange={(e)=>{setImunidade(e.target.value)}}/>
                        </div>
                    </div>

                    <div className="field" id='check'>
                        <label htmlFor="admin">Admin?</label>
                        <input type="checkbox" name="admin" id="admin" onChange={(e)=>(setAdmin(!(admin)))} />
                    </div>

                    <button onClick={()=>{checklog()}}>ENVIAR</button>

                </div>
            </div>

        </div>
    )
}

export default function Cadastro() {
    
    return (
        <Banco>
            <CadastroContent/>
        </Banco>        
    )

}
