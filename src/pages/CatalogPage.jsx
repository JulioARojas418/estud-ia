import { useMemo, useState } from 'react'
import { useGames } from '../context/GamesContext'
import { PLATFORMS } from '../data/games'
import { lowestPrice, money } from '../lib/utils'
import GameCard from '../components/GameCard'
import { IconSearch } from '../components/Icons'

const ORDERS = [
  { value: 'alpha', label: 'Nombre A-Z' },
  { value: 'price-asc', label: 'Precio: de menor a mayor' },
  { value: 'price-desc', label: 'Precio: de mayor a menor' },
]

export default function CatalogPage() {
  const { games } = useGames()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('')
  const [platform, setPlatform] = useState('')
  const [order, setOrder] = useState('alpha')

  const genres = useMemo(() => [...new Set(games.map((g) => g.genre))].sort(), [games])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = games.filter((g) => {
      const matchQ =
        !q || g.title.toLowerCase().includes(q) || g.developer.toLowerCase().includes(q) || g.genre.toLowerCase().includes(q)
      const matchG = !genre || g.genre === genre
      const matchP = !platform || g.platforms.includes(platform)
      return matchQ && matchG && matchP
    })
    if (order === 'price-asc') list = [...list].sort((a, b) => lowestPrice(a.stores) - lowestPrice(b.stores))
    if (order === 'price-desc') list = [...list].sort((a, b) => lowestPrice(b.stores) - lowestPrice(a.stores))
    return list
  }, [games, query, genre, platform, order])

  return (
    <div className="page container">
      <section className="hero">
        <h1>Compara precios, crea alertas y compra en el mejor momento.</h1>
        <p className="lead">
          Estud-IA reúne el precio de varias tiendas para cada juego, te muestra su evolución con un
          gráfico y avisa cuando baja al precio que tú decides. Todo en un solo lugar, fácil de usar.
        </p>
      </section>

      <div className="toolbar">
        <div className="search-box">
          <IconSearch size={20} />
          <input
            type="search"
            placeholder="Buscar por nombre, desarrollador o género…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar juegos"
          />
        </div>

        <div className="filters">
          <div className="field">
            <label htmlFor="genre">Género</label>
            <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="">Todos</option>
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="platform">Plataforma</label>
            <select id="platform" value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option value="">Todas</option>
              {Object.entries(PLATFORMS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="order">Ordenar</label>
            <select id="order" value={order} onChange={(e) => setOrder(e.target.value)}>
              {ORDERS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="result-count" role="status">
        {filtered.length} juego{filtered.length === 1 ? '' : 's'} encontrado{filtered.length === 1 ? '' : 's'}
      </p>

      {filtered.length > 0 ? (
        <div className="grid">
          {filtered.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No encontramos juegos con esos filtros</h2>
          <p>Prueba a quitar algún filtro o a buscar con otro texto.</p>
          <button
            className="btn btn-ghost"
            onClick={() => {
              setQuery('')
              setGenre('')
              setPlatform('')
            }}
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  )
}