import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cadastro from './pages/Cadastro'
import Admin from './pages/Admin'
import Esqueci from './pages/Esquecisenha'
import Telainicial from './pages/Telainicial.jsx'
import Logoff from './pages/Logoff'
import Login from './pages/Login'
import NotFound from './pages/NotFound.jsx'
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
            <Route path="/admin"element={ <RotaPrivada restrito={true}> <Admin /> </RotaPrivada> }/>
            <Route path="/esqueci" element={<Esqueci />} />
            <Route path="/telainicial" element={<RotaPrivada> <Telainicial /> </RotaPrivada>} />
            <Route path="/logoff" element={<Logoff />} />
            <Route path="*" element={<NotFound/>}/>
           </Routes>
     </BrowserRouter>
    </AutenticacaoProvider> 
  )
}

export default App
