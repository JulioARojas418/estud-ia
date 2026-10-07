import { useId } from 'react'

const hash = (str) => {
  let h = 7
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h
}

export default function Cover({ game, className = '', big = false }) {
  const uid = useId().replace(/:/g, '')
  const h = hash(game.id)
  const [c1, c2] = game.theme || ['#6c5ce7', '#00cec9']
  const initials = game.title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  const shapes = [
    { cx: 15 + (h % 40), cy: 20 + ((h >> 3) % 50), r: 18 + ((h >> 5) % 22) },
    { cx: 60 + ((h >> 7) % 35), cy: 15 + ((h >> 9) % 60), r: 10 + ((h >> 11) % 16) },
    { cx: 30 + ((h >> 13) % 55), cy: 55 + ((h >> 15) % 35), r: 8 + ((h >> 17) % 14) },
  ]

  return (
    <svg
      className={`cover ${className}`}
      viewBox="0 0 160 90"
      role="img"
      aria-label={`Portada de ${game.title}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`cg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <pattern id={`cp-${uid}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 14 14 0" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="160" height="90" fill={`url(#cg-${uid})`} />
      <rect width="160" height="90" fill={`url(#cp-${uid})`} />
      {shapes.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#ffffff" fillOpacity={0.1 + i * 0.04} />
      ))}
      <path
        d={`M0 ${70 - (h % 20)} Q 55 ${40 + (h % 25)} 100 ${65 - (h % 15)} T 160 ${50 + (h % 20)}`}
        stroke="#ffffff"
        strokeOpacity="0.45"
        strokeWidth="2"
        fill="none"
      />
      <text
        x="80"
        y="45"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="inherit"
        fontWeight="800"
        fontSize={big ? 40 : 34}
        fill="#ffffff"
        fillOpacity="0.92"
      >
        {initials}
      </text>
    </svg>
  )
}
