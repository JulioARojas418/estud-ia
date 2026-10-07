import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { user, login, logout, accounts } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from = location.state?.from || '/alertas'

  if (user) {
    return (
      <div className="page container">
        <div className="auth-wrap">
          <div className="auth-card">
            <h1>Ya tienes la sesión iniciada</h1>
            <p>
              Estás dentro como <strong>{user.name}</strong> ({user.email}).
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Link to={from} className="btn btn-primary">Continuar</Link>
              <button className="btn btn-ghost" onClick={logout}>Cerrar sesión</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const submit = (e) => {
    e.preventDefault()
    setError('')
    const res = login(email, password)
    if (res.ok) navigate(from, { replace: true })
    else setError(res.error)
  }

  return (
    <div className="page container">
      <div className="auth-wrap">
        <div className="auth-card">
          <h1>Iniciar sesión</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 0 }}>
            Para guardar alertas de precio necesitas entrar con tu cuenta.
          </p>

          <form onSubmit={submit}>
            <div className="form-field">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Mínimo 4 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button type="submit" className="btn btn-primary btn-block btn-big">Entrar</button>
          </form>

          <div className="demo-list">
            <strong>Cuentas de demostración</strong> (pulsa una para autocompletar):
            <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.1rem', display: 'grid', gap: '0.3rem' }}>
              {accounts.map((a) => (
                <li key={a.email}>
                  <button
                    type="button"
                    className="linklike"
                    onClick={() => {
                      setEmail(a.email)
                      setPassword(a.password)
                    }}
                  >
                    <strong>{a.name}</strong> ({a.role}) — {a.email}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}