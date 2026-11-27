import { createContext, useContext, useState } from 'react'

const AutenticacaoContext = createContext(null)

export function AutenticacaoProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  function login(dadosUsuario) {
    setUsuario(dadosUsuario)
  }

  function logout() {
    setUsuario(null)
  }

  return (
    <AutenticacaoContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AutenticacaoContext.Provider>
  )
}

export function useAutenticacao() {
  return useContext(AutenticacaoContext)
}
