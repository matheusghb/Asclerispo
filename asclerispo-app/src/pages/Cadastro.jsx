import medicoimg from "../assets/medico.jpg"
import Input from "../components/input"

function Cadastro() {

    function checklog() {

        const nome = document.getElementById("nome")
        const email = document.getElementById("email")
        const senha = document.getElementById("senha")
        const confirmar = document.getElementById("confirmar")

        switch(nome.value) {

            case "adm":
                window.location.href = "/admin"
                break

            default: 
                window.location.href = "/landing"
        }

    }

    return(

        <div className="cadastro">
        
            <img src={medicoimg} alt="" />
            <div className="card">
                <h1 id="titulo">Cadastre-se no Asclerispo</h1>
                <Input title="Nome de usuário" placeholder="Qualquer nome de até 20 caractéres." id="nome"/>
                <Input title="E-mail" placeholder="Adicione um e-mail válido" type="email" id="email"/>
                <Input title="Senha" placeholder="Até 8 valores." type="password" id="senha" />
                <Input title="Confirme senha" placeholder="Preencha com os valores acima." id="confirmar" />
                <button onClick={checklog}>Enviar</button>
            </div>

        </div>

    )

}

export default Cadastro