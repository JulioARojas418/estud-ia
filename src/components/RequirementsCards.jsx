const SystemImage = ({ kind }) => (
  <svg viewBox="0 0 64 64" width="44" height="44" role="img" aria-label={kind === 'min' ? 'Requisitos mínimos' : 'Requisitos recomendados'}>
    <rect x="8" y="16" width="38" height="26" rx="5" fill="none" stroke="currentColor" strokeWidth="3" />
    <rect x="14" y="22" width="26" height="6" rx="2" fill="currentColor" opacity="0.35" />
    <path d="M18 16v-8h8v8M30 16v-8h8v8" stroke="currentColor" strokeWidth="2" />
    <rect x="52" y="38" width="8" height="8" rx="1.5" fill="currentColor" />
    <path d="M56 34v4M56 46v4M48 42h4M60 42h4" stroke="currentColor" strokeWidth="2" />
    <path d="M20 48h14M24 42v6" stroke="currentColor" strokeWidth="2" />
  </svg>
)

const Spec = ({ label, value }) => (
  <div className="req-item">
    <dt>{label}</dt>
    <dd>{value}</dd>
  </div>
)

const Card = ({ game, kind }) => {
  const req = game.requirements[kind]
  const isMin = kind === 'min'
  return (
    <div className={`req-card ${isMin ? 'min' : 'rec'}`}>
      <div className="req-head">
        <span className="req-head-icon">
          <SystemImage kind={kind} />
        </span>
        <div>
          <h3>{isMin ? 'Requisitos mínimos' : 'Requisitos recomendados'}</h3>
        </div>
      </div>
      <div className="req-body">
        <Spec label="Sistema operativo" value={req.so} />
        <Spec label="Procesador" value={req.cpu} />
        <Spec label="Memoria RAM" value={req.ram} />
        {req.gpus.map((gpu) => (
          <Spec key={gpu} label="Tarjeta gráfica" value={gpu} />
        ))}
      </div>
    </div>
  )
}

export default function RequirementsCards({ game }) {
  return (
    <div className="req-grid">
      <Card game={game} kind="min" />
      <Card game={game} kind="rec" />
    </div>
  )
}