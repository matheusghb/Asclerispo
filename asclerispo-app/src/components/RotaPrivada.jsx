import { Navigate } from 'react-router-dom'
import { useAutenticacao } from '../context/AutenticacaoContext'

function RotaPrivada({ children, tipoPermitido }) {
  const { usuario } = useAutenticacao()

  if (!usuario) {
    return <Navigate to="/" replace />
  }

  if (tipoPermitido && usuario.tipo !== tipoPermitido) {
    return <Navigate to="/landing" replace />
  }

  return children
}

export default RotaPrivada
