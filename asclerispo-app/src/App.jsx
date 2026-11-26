import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Cadastro from './pages/Cadastro'
import Admin from './pages/Admin'
import Esqueci from './pages/Esquecisenha'
import Landing from './pages/Landing'
import Logoff from './pages/Logoff'
import { AutenticacaoProvider } from './context/AutenticacaoContext'
import RotaPrivada from './components/RotaPrivada'

function App() {
  return (
    <AutenticacaoProvider>
     <BrowserRouter>
       <div id="appscreen">
          <Header/>
           <Routes>
            <Route path="/" element={<Cadastro />} /><Route path="/admin"element={<RotaPrivada tipoPermitido="admin"><Admin /></RotaPrivada>}/>
            <Route path="/esqueci" element={<Esqueci />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/logoff" element={<Logoff />} />
           </Routes>
       </div>
     </BrowserRouter>
    </AutenticacaoProvider> 
  )
}

export default App
