import { Link } from 'react-router-dom'
import { lowestPrice, money } from '../lib/utils'
import { PLATFORMS } from '../data/games'
import Cover from './Cover'
import { IconWindows, IconPlayStation, IconXbox, IconSwitch, IconTag } from './Icons'

const PLATFORM_ICONS = { pc: IconWindows, ps5: IconPlayStation, xbox: IconXbox, switch: IconSwitch }

export default function GameCard({ game }) {
  return (
    <article className="game-card">
      <Link to={`/juego/${game.id}`} aria-label={`Ver detalle de ${game.title}`}>
        <Cover game={game} />
      </Link>
      <div className="card-body">
        <h2>
          <Link to={`/juego/${game.id}`}>{game.title}</Link>
        </h2>
        <div className="meta">
          <span className="chip">{game.genre}</span>
          <span className="chip">{game.developer}</span>
        </div>
        <span className="platforms" aria-label={`Plataformas: ${game.platforms.map((p) => PLATFORMS[p]).join(', ')}`}>
          {game.platforms.map((p) => {
            const Icon = PLATFORM_ICONS[p]
            return Icon ? (
              <span key={p} title={PLATFORMS[p]}>
                <Icon size={20} />
              </span>
            ) : null
          })}
        </span>
        <div className="price-row">
          <span className="price">
            {money(lowestPrice(game.stores))} <small>desde</small>
          </span>
          <Link to={`/juego/${game.id}`} className="btn btn-primary btn-sm">
            <IconTag size={16} /> Ver detalle
          </Link>
        </div>
      </div>
    </article>
  )
}