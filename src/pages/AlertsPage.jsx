import { Link } from 'react-router-dom'
import { useAlerts } from '../context/AlertsContext'
import { useGames } from '../context/GamesContext'
import { useAuth } from '../context/AuthContext'
import { money, storeInfo } from '../lib/utils'
import { StoreMark, IconTrash, IconBell, IconCheck } from '../components/Icons'

export default function AlertsPage() {
  const { alerts, removeAlert, toggleAlert, updateAlert } = useAlerts()
  const { games } = useGames()
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="page container">
        <div className="empty">
          <h2>Inicia sesión para ver tus alertas</h2>
          <p>Necesitas una cuenta para guardar alertas de precio.</p>
          <Link to="/login" className="btn btn-primary">Iniciar sesión</Link>
        </div>
      </div>
    )
  }

  if (alerts.length === 0) {
    return (
      <div className="page container">
        <div className="page-head">
          <h1>Mis Alertas</h1>
        </div>
        <div className="empty">
          <h2>Todavía no tienes alertas</h2>
          <p>Entra al catálogo, abre un juego y pulsa «Agregar a Mis Alertas». Te avisamos cuando baje de precio.</p>
          <Link to="/catalogo" className="btn btn-primary"><IconBell size={18} /> Explorar catálogo</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page container">
      <div className="page-head">
        <h1>Mis Alertas</h1>
        <p style={{ color: 'var(--text-muted)' }}>Cuando el precio baje a tu objetivo, la alerta se marca en verde.</p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
        {alerts.map((alert) => {
          const game = games.find((g) => g.id === alert.gameId)
          if (!game) return null
          const store = game.stores.find((s) => s.key === alert.storeKey)
          const info = storeInfo(alert.storeKey)
          const current = store ? store.price : null
          const hit = current != null && current <= alert.target

          return (
            <div key={alert.id} className={`alert-card ${alert.active ? '' : 'inactive'}`}>
              <div className="alert-info">
                <h3>
                  <Link to={`/juego/${game.id}`}>{game.title}</Link>
                </h3>
                <div className="alert-meta">
                  <span className="platforms-title">
                    <StoreMark icon={info.icon} color={info.color} size={24} label={info.name} />
                    {info.name} · {current != null ? money(current) : '—'}
                    {hit && alert.active && <span className="hit"> · ¡En tu precio!</span>}
                  </span>
                </div>
              </div>

              <div className="target-input">
                <label htmlFor={`target-${alert.id}`}>Objetivo</label>
                <input
                  id={`target-${alert.id}`}
                  type="number"
                  min="0"
                  step="0.49"
                  value={alert.target}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value)
                    if (v > 0) updateAlert(alert.id, { target: v })
                  }}
                  aria-label={`Precio objetivo para ${game.title}`}
                />
              </div>

              <div className="nav-actions">
                <button
                  className={`btn btn-sm ${alert.active ? '' : 'btn-primary'}`}
                  onClick={() => toggleAlert(alert.id)}
                  aria-pressed={alert.active}
                >
                  <IconCheck size={16} /> {alert.active ? 'Activa' : 'Pausada'}
                </button>
                <button
                  className="icon-btn"
                  onClick={() => removeAlert(alert.id)}
                  aria-label={`Eliminar alerta de ${game.title}`}
                  title="Eliminar alerta"
                >
                  <IconTrash size={18} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}