import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAlerts } from '../context/AlertsContext'
import { useTheme } from '../hooks/useTheme'
import { IconBell, IconBot, IconClose, IconLogout, IconMenu, IconMoon, IconSun, IconUser } from './Icons'

const LINKS = [
  { to: '/catalogo', label: 'Catálogo', icon: 'catalogo' },
  { to: '/alertas', label: 'Alertas', icon: 'alertas' },
  { to: '/asistente', label: 'Asistente IA', icon: 'asistente' },
  { to: '/admin', label: 'Admin', icon: 'admin' },
]

export default function Header() {
  const { user, logout } = useAuth()
  const { alerts } = useAlerts()
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const active = alerts.filter((a) => a.active).length

  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/catalogo" className="brand" onClick={close}>
          <span className="brand-mark" aria-hidden="true">IA</span>
          <span className="brand-name">Estud-IA</span>
        </Link>

        <button
          className="icon-btn nav-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>

        <nav id="main-nav" className={`main-nav ${open ? 'is-open' : ''}`}>
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={close}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
            >
              {l.icon === 'alertas' && <IconBell size={18} />}
              {l.icon === 'asistente' && <IconBot size={18} />}
              <span>{l.label}</span>
              {l.icon === 'alertas' && active > 0 && <span className="badge">{active}</span>}
            </NavLink>
          ))}

          <div className="nav-actions">
            <button
              className="icon-btn"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
              title={theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}
            >
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>

            {user ? (
              <div className="user-chip" title={user.email}>
                <IconUser size={18} />
                <span className="user-name">{user.name}</span>
                {user.role === 'admin' && <span className="role-tag">admin</span>}
                <button
                  className="icon-btn"
                  onClick={() => {
                    logout()
                    close()
                    navigate('/catalogo')
                  }}
                  aria-label="Cerrar sesión"
                  title="Cerrar sesión"
                >
                  <IconLogout size={18} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm" onClick={close}>
                <IconUser size={18} /> Iniciar sesión
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
