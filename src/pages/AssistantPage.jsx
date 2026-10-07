import ChatBox from '../components/ChatBox'

export default function AssistantPage() {
  return (
    <div className="page container">
      <div className="page-head">
        <h1>Asistente IA</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Soy Esti y te ayudo con precios, alertas, requisitos y recomendaciones. Escríbeme lo que necesites.
        </p>
      </div>
      <ChatBox />
    </div>
  )
}