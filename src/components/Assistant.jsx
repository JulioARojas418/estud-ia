import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useGames } from '../context/GamesContext'
import ChatBox from './ChatBox'
import { IconBot, IconClose } from './Icons'

export default function Assistant() {
  const [open, setOpen] = useState(false)
  const { games } = useGames()
  const location = useLocation()

  const m = location.pathname.match(/^\/juego\/(.+)$/)
  const game = m ? games.find((g) => g.id === m[1]) : null

  return (
    <>
      {open && (
        <div className="fab-panel" role="dialog" aria-label="Asistente IA Estud-IA">
          <ChatBox game={game} compact />
        </div>
      )}
      <button
        className="fab"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente'}
        title="Asistente IA"
      >
        {open ? <IconClose size={26} /> : <IconBot size={28} />}
      </button>
    </>
  )
}