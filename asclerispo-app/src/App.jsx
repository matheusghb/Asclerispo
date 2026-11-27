import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cadastro from './pages/Cadastro'
import Admin from './pages/Admin'
import Esqueci from './pages/Esquecisenha'
import Landing from './pages/Landing'
import Logoff from './pages/Logoff'
import Login from './pages/Login'
import { AutenticacaoProvider } from './context/AutenticacaoContext'
import RotaPrivada from './components/RotaPrivada'
import Header from './components/header'

function App() {
  return (
    <AutenticacaoProvider>
     <BrowserRouter>
          <Header/>
           <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Cadastro" element={<Cadastro/>}/>
            <Route path="/admin"element={ <RotaPrivada tipoPermitido="admin"> <Admin /> </RotaPrivada> }/>
            <Route path="/esqueci" element={<Esqueci />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/logoff" element={<Logoff />} />
           </Routes>
     </BrowserRouter>
    </AutenticacaoProvider> 
  )
}

export default App
