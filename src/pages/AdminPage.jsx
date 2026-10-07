import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useGames } from '../context/GamesContext'
import { useAlerts } from '../context/AlertsContext'
import { lowestPrice, money } from '../lib/utils'
import { IconTrash, IconPlus, IconCheck } from '../components/Icons'

const blank = { id: '', title: '', genre: '', developer: '', platforms: [], theme: ['#6c5ce7', '#00cec9'] }

export default function AdminPage() {
  const { user } = useAuth()
  const { games, updateGame, addGame, removeGame, resetGames } = useGames()
  const { alerts } = useAlerts()
  const [newGame, setNewGame] = useState({ ...blank })
  const [basePrice, setBasePrice] = useState('')
  const [saved, setSaved] = useState('')

  if (!user) {
    return (
      <div className="page container">
        <div className="empty">
          <h2>Necesitas iniciar sesión para entrar a Admin</h2>
          <p>El panel de administración solo está disponible con cuenta.</p>
          <Link to="/login" className="btn btn-primary" state={{ from: '/admin' }}>Iniciar sesión</Link>
        </div>
      </div>
    )
  }

  if (user.role !== 'admin') {
    return (
      <div className="page container">
        <div className="empty">
          <h2>Acceso restringido</h2>
          <p>Tu cuenta no tiene permisos de administración.</p>
          <p>
            Prueba con la cuenta demo <strong>admin@estudia.com</strong> y contraseña{' '}
            <strong>admin123</strong>.
          </p>
          <button
            className="btn btn-ghost"
            onClick={() => {
              localStorage.removeItem('estudia.user')
              window.location.reload()
            }}
          >
            Cerrar sesión actual
          </button>
        </div>
      </div>
    )
  }

  const avgBest = games.length
    ? games.reduce((acc, g) => acc + lowestPrice(g.stores), 0) / games.length
    : 0

  const flash = (msg) => {
    setSaved(msg)
    setTimeout(() => setSaved(''), 2500)
  }

  const createGame = (e) => {
    e.preventDefault()
    const price = parseFloat(basePrice)
    if (!newGame.title.trim() || !isFinite(price)) return
    const id = newGame.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    const game = {
      ...newGame,
      id,
      platforms: newGame.platforms.length ? newGame.platforms : ['pc', 'ps5', 'xbox'],
      summary: [`Nuevo en el catálogo de Estud-IA: ${newGame.title}.`],
      stores: [{ key: 'steam', region: 'GLOBAL', price }],
      history: [{ label: 'oct 26', price }],
      requirements: {
        min: { so: 'Windows 10 64 bits', cpu: 'Intel Core i3 / Ryzen 3', ram: '8 GB RAM', gpus: ['GTX 1050', 'Radeon RX 560', 'Intel UHD 630'] },
        rec: { so: 'Windows 11 64 bits', cpu: 'Intel Core i5 / Ryzen 5', ram: '16 GB RAM', gpus: ['RTX 3060', 'Radeon RX 6600', 'Intel Arc A580'] },
      },
    }
    addGame(game)
    setNewGame({ ...blank })
    setBasePrice('')
    flash(`«${game.title}» añadido al catálogo.`)
  }

  return (
    <div className="page container">
      <div className="page-head">
        <h1>Panel de administración</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Gestiona el catálogo: edita títulos, géneros, desarrolladores y precios base. Los cambios se guardan en tu navegador.
        </p>
        {saved && <p className="form-success" role="status"><IconCheck size={16} /> {saved}</p>}
      </div>

      <div className="stats">
        <div className="stat"><div className="num">{games.length}</div><div className="lbl">Juegos en catálogo</div></div>
        <div className="stat"><div className="num">{money(avgBest)}</div><div className="lbl">Precio promedio (mejor oferta)</div></div>
        <div className="stat"><div className="num">{alerts.length}</div><div className="lbl">Alertas de usuarios</div></div>
      </div>

      <div className="admin-layout">
        <section>
          <h2>Catálogo</h2>
          <div className="table-card" style={{ marginBottom: 0 }}>
            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th scope="col">Título</th>
                    <th scope="col">Género</th>
                    <th scope="col">Desarrollador</th>
                    <th scope="col">Precio base ($)</th>
                    <th scope="col">Quitar</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((g) => (
                    <tr key={g.id}>
                      <td>
                        <input
                          value={g.title}
                          aria-label={`Título de ${g.title}`}
                          onChange={(e) => {
                            updateGame(g.id, { title: e.target.value })
                            flash('Cambio guardado.')
                          }}
                        />
                      </td>
                      <td>
                        <input
                          value={g.genre}
                          aria-label="Género"
                          onChange={(e) => {
                            updateGame(g.id, { genre: e.target.value })
                            flash('Cambio guardado.')
                          }}
                        />
                      </td>
                      <td>
                        <input
                          value={g.developer}
                          aria-label="Desarrollador"
                          onChange={(e) => {
                            updateGame(g.id, { developer: e.target.value })
                            flash('Cambio guardado.')
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          step="0.49"
                          value={g.stores[0]?.price ?? ''}
                          aria-label="Precio base"
                          onChange={(e) => {
                            const v = parseFloat(e.target.value)
                            if (isFinite(v) && g.stores[0]) {
                              updateGame(g.id, {
                                stores: g.stores.map((s, i) => (i === 0 ? { ...s, price: v } : s)),
                              })
                              flash('Cambio guardado.')
                            }
                          }}
                        />
                      </td>
                      <td>
                        <button
                          className="icon-btn"
                          onClick={() => removeGame(g.id)}
                          aria-label={`Eliminar ${g.title}`}
                          title="Eliminar juego"
                        >
                          <IconTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <aside className="admin-side">
          <h2>Añadir juego</h2>
          <form onSubmit={createGame}>
            <div className="form-field">
              <label htmlFor="nf-title">Título</label>
              <input
                id="nf-title"
                value={newGame.title}
                onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="nf-genre">Género</label>
              <input
                id="nf-genre"
                value={newGame.genre}
                onChange={(e) => setNewGame({ ...newGame, genre: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label htmlFor="nf-dev">Desarrollador</label>
              <input
                id="nf-dev"
                value={newGame.developer}
                onChange={(e) => setNewGame({ ...newGame, developer: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label htmlFor="nf-price">Precio base (USD)</label>
              <input
                id="nf-price"
                type="number"
                min="0"
                step="0.49"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              <IconPlus size={18} /> Crear juego
            </button>
          </form>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.25rem 0' }} />

          <button
            type="button"
            className="btn btn-ghost btn-block"
            onClick={() => {
              if (window.confirm('¿Restaurar el catálogo original? Se pierden los cambios.')) resetGames()
            }}
          >
            Restaurar catálogo original
          </button>
        </aside>
      </div>
    </div>
  )
}