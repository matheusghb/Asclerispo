import Medic from "../assets/healthcare.jpg"
import { useState } from "react"
import { Eye, EyeClosed, GraphStar } from 'lucide-react'
import Banco, { useBanco } from '../components/banco'
import { useNavigate } from "react-router-dom"
import { useAutenticacao } from "../context/AutenticacaoContext"

function LoginContent() {
    const [alert, setalert] = useState("")
    const [email,setemail] = useState("")
    const [senha,setsenha] = useState("")
    const { withDatabase } = useBanco();
    const navigate = useNavigate()
    const { login } = useAutenticacao()

    const [showPassword, setShowPassword] = useState(false)

    function renderAlert() {
        if (!(alert === "")) {
            return (
                <div id="alert">{alert}</div>
            )
        }
    }

    async function log() {

        if (email.length == 0 || senha.length == 0) {
            return (
                setalert("E-mail ou senha inválidos.")
            )
        } 

        const logInfo = await withDatabase(async (db) => {
            const login = await db.sql(`SELECT * FROM User WHERE email = "${email}" AND senha = "${senha}";`)
            return login
        })

        if (logInfo.length < 1) {
            return (
                setalert("E-mail ou senha não foram encontrados.")
            )
        }

        login(logInfo)

        return (
            navigate("/telainicial")
        )

    }

    document.title = "Login"
    document.onkeydown = (e) => {if (e.key == "Enter") {log()}}

    return(

        <div className="display" id="login">
            <div id="quote">

                <div id="bigQuote">
                    <h1>Não morra se perguntando.</h1>
                    <div id="line"></div>
                    <img src={Medic} alt="" />
                </div>

                <div id="paragraph">
                    <p>Foco na verificação e conversação entre especialista e leigo, para seu conforto. <br/> Entre na comunidade e oferte até a menor das dúvidas.</p>
                </div>

                <GraphStar id="icon" size={50}/>

            </div>
            <div id="inputs-container">

                <div id="window">
                    
                    <div id="title">
                        LOGIN
                    </div>

                    {renderAlert()}
                    
                    <div id="login-fields">

                        <div className="field">
                            
                            <label htmlFor="email"> <div className="border"/> E-MAIL</label>
                            
                            <div className="inputdiv">
                                <input type="text" name="email" id="email" placeholder="email@gmail.com" onChange={(e) => {setemail(e.target.value)}} />
                            </div>
                        
                        </div>
                        
                        <div className="field">
                            
                            <label htmlFor="">

                                 <div className="border"></div>
                                SENHA
                                <button onClick={()=>{
                                    setShowPassword(!(showPassword))
                                    }}>
                                    {(showPassword) ? <Eye /> : <EyeClosed />}
                                </button>
                            
                            </label>

                            <div className="inputdiv">
                                <input type={(!showPassword) ? "password" : "text"} name="password" id="password" placeholder="Máximo de 10 caractéres." maxLength={10} onChange={(e) => {setsenha(e.target.value)}}></input> 
                            </div>
                        
                        </div>
                    
                    </div>
                
                        <div id="buttons">
                                <button id="send-button" onClick={() => (log())}>ENVIAR</button>
                                <div id="minor-button">
                                    <a href="/cadastro">Criar conta</a>
                                    <a href="/esqueci">Esqueci minha senha</a>
                                </div>
                        </div>

                </div>
            </div>
        </div>

    )

}

export default function Login() {

    return (
        <Banco>
            <LoginContent></LoginContent>
        </Banco>        
    )

}