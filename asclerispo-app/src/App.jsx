import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Cadastro from './pages/Cadastro'
import Admin from './pages/Admin'
import Esqueci from './pages/Esquecisenha'
import Landing from './pages/Landing'
import Logoff from './pages/Logoff'

function App() {

  return (
    <div id="appscreen">
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Cadastro />} />
          <Route path='/admin' element={<Admin />}/>
          <Route path='/esqueci' element={<Esqueci />}/>
          <Route path='/landing' element={<Landing />}/>
          <Route path='/logoff' element={<Logoff />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
