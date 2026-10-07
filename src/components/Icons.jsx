const stroke = (props) => ({
  width: props.size || 20,
  height: props.size || 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: props.sw || 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
})

export const IconSearch = (p) => (
  <svg {...stroke(p)}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
)
export const IconBell = (p) => (
  <svg {...stroke(p)}>
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
)
export const IconBot = (p) => (
  <svg {...stroke(p)}>
    <rect x="4" y="8" width="16" height="12" rx="3" />
    <path d="M12 8V4M8 4h8" />
    <circle cx="9" cy="14" r="1.2" fill="currentColor" />
    <circle cx="15" cy="14" r="1.2" fill="currentColor" />
  </svg>
)
export const IconUser = (p) => (
  <svg {...stroke(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" /></svg>
)
export const IconSun = (p) => (
  <svg {...stroke(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)
export const IconMoon = (p) => (
  <svg {...stroke(p)}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>
)
export const IconClose = (p) => (
  <svg {...stroke(p)}><path d="M18 6 6 18M6 6l12 12" /></svg>
)
export const IconMenu = (p) => (
  <svg {...stroke(p)}><path d="M3 6h18M3 12h18M3 18h18" /></svg>
)
export const IconCheck = (p) => (
  <svg {...stroke(p)}><path d="m20 6-11 11-5-5" /></svg>
)
export const IconTrash = (p) => (
  <svg {...stroke(p)}><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></svg>
)
export const IconPlus = (p) => (
  <svg {...stroke(p)}><path d="M12 5v14M5 12h14" /></svg>
)
export const IconExternal = (p) => (
  <svg {...stroke(p)}>
    <path d="M14 4h6v6M20 4l-9 9" />
    <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
  </svg>
)
export const IconSend = (p) => (
  <svg {...stroke(p)}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></svg>
)
export const IconChevron = (p) => (
  <svg {...stroke(p)}><path d="m6 9 6 6 6-6" /></svg>
)
export const IconLogout = (p) => (
  <svg {...stroke(p)}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5M21 12H9" />
  </svg>
)
export const IconTag = (p) => (
  <svg {...stroke(p)}>
    <path d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
    <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)
export const IconChart = (p) => (
  <svg {...stroke(p)}><path d="M3 3v18h18M7 15l4-5 3 3 5-7" /></svg>
)

export const IconWindows = (p) => (
  <svg {...stroke(p)} strokeWidth="0" fill="currentColor">
    <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm8.5-1.3L21 3v8.5h-9.5V4.2ZM3 12.5h7.5v7.1L3 18.5v-6Zm8.5 0H21V21l-9.5-1.3v-7.2Z" />
  </svg>
)
export const IconPlayStation = (p) => (
  <svg {...stroke(p)} strokeWidth="0" fill="currentColor">
    <path d="M9.5 3.2v14.6l3.1 1V6.9c0-.6.3-1 .8-.9.6.2.8.8.8 1.4v4.4c1.9.9 3.4-.1 3.4-2.5 0-2.5-.9-3.7-3.4-4.6A18 18 0 0 0 9.5 3.2ZM4 15.6c-.1.9.5 1.5 1.7 1.9 1.4.4 3.3.2 4.6-.3v-1.6l-1.4.4c-.7.2-1.4.3-1.9-.1-.5-.4-.4-.9.2-1.1l3.1-1v-1.6l-4 1.4c-1.5.5-2.2 1-2.3 1.6Zm14.3-.6c-1.4-.4-2.9-.3-4 .3l-.8.3v1.5l1.4-.5c.7-.2 1.5-.3 2.1.1.6.4.5.9-.1 1.1l-3.4 1.3v1.5l4.5-1.6c1.4-.5 2.1-1.1 2.2-1.8.1-.7-.4-1.3-2-1.7Z" />
  </svg>
)
export const IconXbox = (p) => (
  <svg {...stroke(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M6.5 6.8c3 1.4 8.9 5.4 11 10.4M17.5 6.8c-3 1.4-8.9 5.4-11 10.4" />
  </svg>
)
export const IconSwitch = (p) => (
  <svg {...stroke(p)}>
    <rect x="3" y="4" width="7" height="16" rx="3" />
    <rect x="14" y="4" width="7" height="16" rx="3" />
    <circle cx="6.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="17.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const STORE_MARKS = {
  steam: 'St',
  epic: 'E',
  gog: 'GOG',
  ps: 'PS',
  xbox: 'X',
  nintendo: 'N',
  humble: 'H',
  green: 'GM',
  generic: 'T',
}

export function StoreMark({ icon, color, size = 34, label }) {
  const text = STORE_MARKS[icon] || icon?.slice(0, 2) || 'T'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      role="img"
      aria-label={label || text}
      focusable="false"
    >
      <rect x="2" y="2" width="36" height="36" rx="10" fill={color} opacity="0.18" />
      <rect x="2" y="2" width="36" height="36" rx="10" fill="none" stroke={color} strokeWidth="2" />
      <text
        x="20"
        y="20"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={text.length > 2 ? 11 : 15}
        fontWeight="700"
        fill={color}
        fontFamily="inherit"
      >
        {text}
      </text>
    </svg>
  )
}
