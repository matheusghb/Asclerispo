
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAutenticacao } from '../context/AutenticacaoContext'

function Logoff() {
    const { logout } = useAutenticacao()
    const navigate = useNavigate()

    useEffect(() => {
        logout()
        navigate('/', { replace: true })
    }, [])

    return (
        <h1>Encerrando sessão...</h1>
    )
}

export default Logoff
