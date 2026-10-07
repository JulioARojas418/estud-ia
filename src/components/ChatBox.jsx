import { useEffect, useRef, useState } from 'react'
import { generateReply, GENERAL_SUGGESTIONS } from '../lib/assistant'
import { IconBot, IconSend } from './Icons'

const INITIAL = {
  role: 'bot',
  text: '¡Hola! Soy Esti, tu asistente de Estud-IA. Pregúntame sobre precios, alertas o requisitos, o elige una sugerencia de abajo.',
}

export default function ChatBox({ game = null, compact = false }) {
  const [messages, setMessages] = useState([INITIAL])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, typing])

  const send = (text) => {
    const clean = text.trim()
    if (!clean || typing) return
    setMessages((m) => [...m, { role: 'user', text: clean }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const reply = generateReply(clean, { game })
      setMessages((m) => [...m, { role: 'bot', text: reply }])
      setTyping(false)
    }, 700)
  }

  const suggestions = game
    ? [
        `¿Cuánto cuesta ${game.title}?`,
        `¿Cuáles son los requisitos de ${game.title}?`,
        GENERAL_SUGGESTIONS[2],
      ]
    : GENERAL_SUGGESTIONS

  return (
    <div className={`chat-panel ${compact ? 'fab-panel' : ''}`}>
      <div className="chat-head">
        <span className="chat-bot-avatar">
          <IconBot size={22} />
        </span>
        <div>
          <strong>Esti, asistente IA</strong>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {game ? `Hablando sobre «${game.title}»` : 'Te ayuda en toda la web'}
          </div>
        </div>
      </div>

      <div className="chat-history" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.text.split('\n').map((line, j) => (
              <span key={j}>
                {line}
                <br />
              </span>
            ))}
          </div>
        ))}
        {typing && (
          <div className="msg bot typing" aria-label="Está escribiendo">
            <span /> <span /> <span />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {!compact && (
        <div className="suggestions">
          {suggestions.map((s) => (
            <button key={s} type="button" onClick={() => send(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escríbele a Esti…"
          aria-label="Mensaje para el asistente"
          disabled={typing}
        />
        <button className="btn btn-primary" type="submit" disabled={typing} aria-label="Enviar mensaje">
          <IconSend size={18} />
        </button>
      </form>
    </div>
  )
}