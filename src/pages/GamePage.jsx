import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGames } from '../context/GamesContext'
import { useAlerts } from '../context/AlertsContext'
import { useAuth } from '../context/AuthContext'
import { PLATFORMS } from '../data/games'
import { lowestPrice, money, storeInfo } from '../lib/utils'
import Cover from '../components/Cover'
import PriceTable from '../components/PriceTable'
import PriceChart from '../components/PriceChart'
import RequirementsCards from '../components/RequirementsCards'
import { IconBell, IconWindows, IconPlayStation, IconXbox, IconSwitch, IconCheck, IconChart } from '../components/Icons'

const PLATFORM_ICONS = { pc: IconWindows, ps5: IconPlayStation, xbox: IconXbox, switch: IconSwitch }

export default function GamePage() {
  const { id } = useParams()
  const { games } = useGames()
  const { user } = useAuth()
  const { alerts, addAlert, hasAlert, updateAlert } = useAlerts()

  const game = games.find((g) => g.id === id)
  const [formOpen, setFormOpen] = useState(false)
  const [storeKey, setStoreKey] = useState('')
  const [target, setTarget] = useState('')

  const existing = useMemo(() => alerts.find((a) => a.gameId === id), [alerts, id])

  if (!game) {
    return (
      <div className="page container">
        <div className="empty">
          <h2>No encontramos ese juego</h2>
          <p>Puede que haya cambiado de nombre o que ya no esté en el catálogo.</p>
          <Link to="/catalogo" className="btn btn-primary">
            Volver al catálogo
          </Link>
        </div>
      </div>
    )
  }

  const best = storeInfo([...game.stores].sort((a, b) => a.price - b.price)[0].key)

  const openForm = () => {
    const suggested = [...game.stores].sort((a, b) => a.price - b.price)[0]
    setStoreKey(existing?.storeKey || suggested.key)
    setTarget(existing?.target ?? Math.round(lowestPrice(game.stores) * 0.9 * 100) / 100)
    setFormOpen(true)
  }

  const saveAlert = (e) => {
    e.preventDefault()
    const value = parseFloat(target)
    if (!value || value <= 0) return
    if (existing) updateAlert(existing.id, { storeKey, target: value })
    else addAlert({ gameId: game.id, storeKey, target: value })
    setFormOpen(false)
  }

  return (
    <div className="page container">
      <Link to="/catalogo" className="back-link">← Volver al catálogo</Link>

      <div className="game-hero">
        <Cover game={game} big />
        <div>
          <p className="genre-line">
            <span className="chip">{game.genre}</span>
            <IconChart size={16} /> {game.developer}
            <span className="platforms" aria-label={`Plataformas: ${game.platforms.map((p) => PLATFORMS[p]).join(', ')}`}>
              {game.platforms.map((p) => {
                const Icon = PLATFORM_ICONS[p]
                return Icon ? (
                  <span key={p} title={PLATFORMS[p]}>
                    <Icon size={22} />
                  </span>
                ) : null
              })}
            </span>
          </p>

          <h1 className="game-title">{game.title}</h1>

          <div className="game-summary">
            {game.summary.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <div className="hero-cta">
            {user ? (
              <>
                {formOpen ? (
                  <form className="alert-form" onSubmit={saveAlert}>
                    <div className="field">
                      <label htmlFor="store">Tienda</label>
                      <select id="store" value={storeKey} onChange={(e) => setStoreKey(e.target.value)}>
                        {game.stores.map((s) => (
                          <option key={s.key} value={s.key}>
                            {storeInfo(s.key).name} ({s.region}) — {money(s.price)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="target">Avísame cuando baje de (USD)</label>
                      <input
                        id="target"
                        type="number"
                        min="0"
                        step="0.49"
                        inputMode="decimal"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      <IconCheck size={18} /> Guardar alerta
                    </button>
                    <button type="button" className="btn btn-ghost" onClick={() => setFormOpen(false)}>
                      Cancelar
                    </button>
                  </form>
                ) : (
                  <button className="btn btn-accent btn-big" onClick={openForm}>
                    <IconBell size={20} />
                    {existing ? 'Editar mi alerta' : 'Agregar a Mis Alertas'}
                  </button>
                )}
              </>
            ) : (
              <Link to="/login" className="btn btn-accent btn-big" state={{ from: `/juego/${game.id}` }}>
                <IconBell size={20} /> Agregar a Mis Alertas
              </Link>
            )}
            {existing && (
              <span className="save-state" role="status">
                Ya tienes una alerta para este juego: {money(existing.target)} por {storeInfo(existing.storeKey).name}.
              </span>
            )}
          </div>

          <p className="genre-line" style={{ marginTop: '1rem' }}>
            <strong>Mejor precio:</strong> {money(lowestPrice(game.stores))} en {best.name}
          </p>
        </div>
      </div>

      <div className="table-card">
        <h2>Comparación de precios</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: 0 }}>
          Ordenado del precio más bajo al más alto. GLOBAL se activa en cualquier país; LATAM solo en Latinoamérica.
        </p>
        <PriceTable stores={game.stores} />
      </div>

      <div className="chart-card">
        <h2>Historial de precios</h2>
        <PriceChart data={game.history} title={`${game.title} · evolución de precio`} />
      </div>

      <RequirementsCards game={game} />
    </div>
  )
}