import { createContext, useContext, useMemo, useState } from 'react'
import { load, save } from '../lib/utils'

const AuthContext = createContext(null)

const ACCOUNTS = [
  { email: 'demo@estudia.com', password: 'demo123', name: 'Usuario Demo', role: 'user' },
  { email: 'admin@estudia.com', password: 'admin123', name: 'Admin Estud-IA', role: 'admin' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => load('estudia.user', null))

  const login = (email, password) => {
    const found = ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password,
    )
    if (found) {
      const next = { email: found.email, name: found.name, role: found.role }
      setUser(next)
      save('estudia.user', next)
      return { ok: true, user: next }
    }
    if (/^\S+@\S+\.\S+$/.test(email) && password.length >= 4) {
      const next = { email: email.trim(), name: email.split('@')[0], role: 'user' }
      setUser(next)
      save('estudia.user', next)
      return { ok: true, user: next }
    }
    return { ok: false, error: 'Revisa el correo y la contraseña (mínimo 4 caracteres).' }
  }

  const logout = () => {
    setUser(null)
    save('estudia.user', null)
  }

  const value = useMemo(() => ({ user, login, logout, accounts: ACCOUNTS }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
