import { GAMES } from '../data/games'
import { lowestPrice, money, storeInfo, storesSorted } from './utils'

const clean = (t) => t.toLowerCase().trim()

const pick = (list) => list[Math.floor(Math.random() * list.length)]

const cheapGame = () => {
  const sorted = [...GAMES].sort(
    (a, b) => lowestPrice(a.stores) - lowestPrice(b.stores),
  )
  const g = sorted[0]
  const s = storeInfo(storesSorted(g.stores)[0].key)
  return `El juego más barato ahora mismo es «${g.title}» de ${g.developer}, por ${money(lowestPrice(g.stores))} en ${s.name}. ¿Quieres que te lo agregue a una alerta?`
}

const helpText = () =>
  'Puedo ayudarte con estas cosas, elige una o escríbeme tu duda: \n• Recomendarte juegos baratos\n• Explicarte cómo funcionan las alertas\n• Hablarte del histórico de precios\n• Guiarte por la web'

export function generateReply(input, ctx = {}) {
  const t = clean(input)
  const game = ctx.game || null

  if (game) {
    const s = storesSorted(game.stores)
    const best = s[0]
    const bis = storeInfo(best.key)
    const worst = s[s.length - 1]
    const wis = storeInfo(worst.key)
    if (/precio|cuesta|valor|cuánto|cuanto/.test(t)) {
      return `«${game.title}» está entre ${money(lowestPrice(game.stores))} (${bis.name}, clave ${best.region}) y ${money(worst.price)} (${wis.name}). El botón «Ir a la tienda» te lleva directo a comprarlo.`
    }
    if (/alerta|aviso|avis|baje|bajar/.test(t)) {
      return `Pulsa «Agregar a Mis Alertas» en esta página, elige la tienda y tu precio objetivo. Cuando el juego baje a ese precio o menos, aparecerá en tu lista de Mis Alertas con un aviso.`
    }
    if (/requisito|requiere|specs|recomendado|mínimo|minimo|corre/.test(t)) {
      return `Para «${game.title}» los mínimos piden ${game.requirements.min.ram} de RAM y una ${game.requirements.min.gpus[0]}. Lo recomendado es ${game.requirements.rec.ram} de RAM con una ${game.requirements.rec.gpus[0]}. Tienes los detalles en las tarjetas de requisitos de esta página.`
    }
    if (/género|genero|tipo|de qué va|de que va/.test(t)) {
      return `«${game.title}» es un ${game.genre} desarrollado por ${game.developer}. ${game.summary[0]}`
    }
    if (/historico|histórico|grafico|gráfico|evolucion|bajado/.test(t)) {
      const last = game.history[game.history.length - 1]
      const first = game.history[0]
      const diff = first.price - last.price
      const trend = diff > 0 ? `ha bajado ${money(diff)} desde su lanzamiento` : 'se ha mantenido estable'
      return `El histórico de «${game.title}» ${trend}. Su último precio registrado es ${money(last.price)} (${last.label}). El gráfico de esta página muestra la evolución mes a mes.`
    }
    return `Sobre «${game.title}» puedo contarte su precio actual, requisitos, género o histórico. Prueba a preguntarme eso.`
  }

  if (/hola|buenas|hey|buenos/.test(t)) {
    return '¡Hola! Soy Esti, tu asistente de Estud-IA. Te ayudo a comparar precios, crear alertas y encontrar el mejor momento para comprar tu juego. ¿Qué necesitas?'
  }
  if (/qui[ée]n eres|que eres|tu nombre/.test(t)) {
    return 'Soy Esti, el asistente de IA de Estud-IA. Estoy aquí para orientarte en la web: precios, alertas, requisitos y recomendaciones.'
  }
  if (/alertas?/.test(t)) {
    return 'Una alerta te avisa cuando un juego baja al precio que tú eliges. Entra al Catálogo, abre un juego y pulsa «Agregar a Mis Alertas»: eliges tienda y precio objetivo. Luego lo gestionas todo en la pestaña Alertas.'
  }
  if (/funciona|cómo funciona|como funciona|que hace|qu[ée] es/.test(t)) {
    return 'Es muy fácil: en Catálogo encuentras juegos con su mejor precio; en la ficha de cada juego ves una tabla comparativa de tiendas, un gráfico con el histórico de precios y los requisitos del sistema. Puedes crear alertas para que yo te avise cuando el precio baje.'
  }
  if (/recomienda|sugiere|barato|rebarato|ofert/.test(t)) {
    return cheapGame()
  }
  if (/grafico|gráfico|histórico|historico|evolucion/.test(t)) {
    return 'Cada ficha de juego incluye un gráfico de líneas con los últimos 12 meses. Puedes verlo en rangos de 3, 6 o 12 meses para detectar en qué puntos del año hay rebajas.'
  }
  if (/tienda|comprar|dónde|donde|pagar/.test(t)) {
    return 'En la ficha de cada juego hay una tabla con tiendas (Steam, Epic, GOG, PlayStation, Xbox, Nintendo…), el tipo de clave (GLOBAL o LATAM) y el precio. El botón «Ir a la tienda» te lleva directo.'
  }
  if (/login|entrar|cuenta|sesión|sesion/.test(t)) {
    return 'Para guardar alertas solo tienes que iniciar sesión. Puedes usar demo@estudia.com con contraseña demo123, o con la cuenta admin@estudia.com / admin123 para probar el panel de administración.'
  }
  if (/contacto|humano|hablar con/.test(t)) {
    return 'En el pie de página tienes la sección Contacto, y en Ayuda → Preguntas frecuentes encontrarás respuestas rápidas. Si escribes al formulario de contacto, respondemos en menos de 48 horas.'
  }
  if (/admin|administra/.test(t)) {
    return 'El menú Admin está reservado para el equipo. Puedes probarlo con la cuenta admin@estudia.com y la contraseña admin123. Ahí se gestionan los juegos del catálogo.'
  }
  if (/gracias/.test(t)) {
    return '¡A ti! ¿Necesitas algo más? Puedo recomendarte otro juego o explicarte una alerta.'
  }
  return pick([
    'Buena pregunta. En el Catálogo puedes filtrar por género y plataforma, y al abrir un juego veo todo: precios, histórico y requisitos. ¿Quieres que te recomiende uno barato?',
    helpText(),
    'Puedo responderte sobre precios, alertas, requisitos o el histórico de un juego. También puedo recomendarte el juego más barato del catálogo.',
    'Pregúntame por ejemplo: «¿qué es una alerta?», «recomiéndame un juego barato» o pedirme el precio de un juego concreto. Así te guío mejor.',
  ])
}

export const GENERAL_SUGGESTIONS = [
  'Recomiéndame un juego barato',
  '¿Qué es una alerta?',
  '¿Cómo funciona la web?',
]

export const GAME_SUGGESTIONS = (g) => [
  `¿Cuánto cuesta ${g.title}?`,
  `¿Tiene buenos requisitos ${g.title}?`,
  '¿Cómo funciona el histórico de precios?',
]