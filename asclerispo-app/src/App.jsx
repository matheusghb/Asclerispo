import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cadastro from './pages/Cadastro'
import Admin from './pages/Admin'
import Esqueci from './pages/Esquecisenha'
import Telainicial from './pages/Telainicial'
import Login from './pages/Login'
import Header from './components/header.jsx'
import Landing from './pages/Landing.jsx'

function App() {

  return (
      <BrowserRouter>
        <Header/>
        <Routes>  
          <Route path='/' element={<Login />} />
          <Route path='/cadastro' element={<Cadastro />} />
          <Route path='/admin' element={<Admin />}/>
          <Route path='/esqueci' element={<Esqueci />}/>
          <Route path='/telaInicial' element={<Telainicial />}/>
          <Route path='/landing' element={<Landing />}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
