import { useState } from 'react'
import { money } from '../lib/utils'

const W = 720
const H = 300
const PAD = { l: 56, r: 18, t: 18, b: 34 }

const RANGES = [
  { label: '6 meses', value: 6 },
  { label: '9 meses', value: 9 },
  { label: '12 meses', value: 12 },
]

export default function PriceChart({ data, title = 'Historial de precios' }) {
  const [range, setRange] = useState(12)
  const [hover, setHover] = useState(null)

  const points = data.slice(-range)
  const min = Math.min(...points.map((p) => p.price))
  const max = Math.max(...points.map((p) => p.price))
  const span = max - min || 1
  const iw = W - PAD.l - PAD.r
  const ih = H - PAD.t - PAD.b

  const xy = points.map((p, i) => ({
    ...p,
    x: PAD.l + (i / (points.length - 1)) * iw,
    y: PAD.t + ih - ((p.price - min) / span) * ih,
  }))

  const linePath = xy.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L${xy[xy.length - 1].x.toFixed(1)} ${PAD.t + ih} L${xy[0].x.toFixed(1)} ${PAD.t + ih} Z`

  const ticks = 4
  const gridLines = Array.from({ length: ticks + 1 }, (_, i) => {
    const y = PAD.t + (i / ticks) * ih
    const v = max - (i / ticks) * span
    return { y, v }
  })

  const active = hover != null ? xy[hover] : null

  return (
    <div>
      <div className="chart-tip" aria-live="polite">
        {active ? (
          <>
            <span className="dot" />
            <span>
              {active.label}: <strong>{money(active.price)}</strong>
            </span>
            <span className="muted">{title}</span>
          </>
        ) : (
          <>
            <span className="dot" />
            <span>
              Pasa el cursor por el gráfico para ver cada mes. Último registro:{' '}
              <strong>{money(points[points.length - 1].price)}</strong>
            </span>
            <span className="muted">{title}</span>
          </>
        )}
      </div>

      <div className="chart-ranges" role="group" aria-label="Rango del histórico">
        {RANGES.map((r) => (
          <button
            key={r.value}
            className={`btn btn-sm ${range === r.value ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setRange(r.value)}
            aria-pressed={range === r.value}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="chart-wrap">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          role="img"
          aria-label={`Gráfico de línea: ${title}`}
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {gridLines.map((g, i) => (
            <g key={i}>
              <line
                x1={PAD.l}
                x2={W - PAD.r}
                y1={g.y}
                y2={g.y}
                stroke="var(--border)"
                strokeDasharray="4 4"
              />
              <text
                x={PAD.l - 8}
                y={g.y + 4}
                textAnchor="end"
                fontSize="11"
                fill="var(--text-muted)"
                fontFamily="inherit"
              >
                {money(Math.round(g.v * 100) / 100)}
              </text>
            </g>
          ))}

          <path d={areaPath} fill="url(#area-grad)" />
          <path
            d={linePath}
            fill="none"
            stroke="var(--brand)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {xy.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r="10"
                fill="transparent"
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                tabIndex={0}
                role="button"
                aria-label={`${p.label}, ${money(p.price)}`}
                style={{ cursor: 'pointer' }}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={hover === i ? 5 : 3}
                fill={hover === i ? 'var(--accent)' : 'var(--surface)'}
                stroke="var(--brand)"
                strokeWidth="2.5"
                pointerEvents="none"
              />
            </g>
          ))}

          {xy.map((p, i) => (
            <text
              key={`l-${i}`}
              x={p.x}
              y={H - 12}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-muted)"
              fontFamily="inherit"
            >
              {p.label.split(' ')[0]}
            </text>
          ))}
        </svg>
      </div>
    </div>
  )
}