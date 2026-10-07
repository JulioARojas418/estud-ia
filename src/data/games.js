const MONTHS = [
  'nov 25', 'dic 25', 'ene 26', 'feb 26', 'mar 26', 'abr 26',
  'may 26', 'jun 26', 'jul 26', 'ago 26', 'sep 26', 'oct 26',
]

const hist = (prices) => prices.map((price, i) => ({ label: MONTHS[i], price }))

export const STORES = {
  steam: { name: 'Steam', icon: 'steam', color: '#4b6b9a', url: 'https://store.steampowered.com/' },
  epic: { name: 'Epic Games Store', icon: 'epic', color: '#7d8aa0', url: 'https://store.epicgames.com/' },
  gog: { name: 'GOG', icon: 'gog', color: '#a15fb0', url: 'https://www.gog.com/' },
  psn: { name: 'PlayStation Store', icon: 'ps', color: '#3f8fd6', url: 'https://store.playstation.com/' },
  xbox: { name: 'Xbox Store', icon: 'xbox', color: '#3fae52', url: 'https://www.xbox.com/es-ES/games/store' },
  nintendo: { name: 'Nintendo eShop', icon: 'nintendo', color: '#e0575f', url: 'https://www.nintendo.com/es-es/store/' },
  humble: { name: 'Humble Store', icon: 'humble', color: '#d0554f', url: 'https://www.humblebundle.com/' },
  green: { name: 'Green Man Gaming', icon: 'green', color: '#4fae6b', url: 'https://www.greenmangaming.com/' },
}

export const PLATFORMS = {
  pc: 'PC',
  ps5: 'PlayStation 5',
  xbox: 'Xbox Series X|S',
  switch: 'Nintendo Switch',
}

const req = (so, cpu, ram, gpus) => ({ so, cpu, ram, gpus })

export const GAMES = [
  {
    id: 'starfall-odyssey',
    title: 'Starfall Odyssey',
    genre: 'RPG espacial',
    developer: 'Nebula Forge Studios',
    platforms: ['pc', 'ps5', 'xbox'],
    theme: ['#6c5ce7', '#00cec9'],
    summary: [
      'Explora doce sistemas solares en una nave que tú mismo reparas y mejoras entre batalla y batalla.',
      'Cada planeta genera misiones y facciones de forma distinta: no hay dos partidas iguales.',
      'Combate por turnos táctico con compañeros que recuerdan tus decisiones y reaccionan a ellas.',
      'Incluye modo cooperativo para dos jugadores y una banda sonora interpretada por orquesta.',
    ],
    stores: [
      { key: 'steam', region: 'GLOBAL', price: 19.99 },
      { key: 'psn', region: 'LATAM', price: 27.5 },
      { key: 'xbox', region: 'LATAM', price: 29.9 },
      { key: 'green', region: 'LATAM', price: 34.9 },
      { key: 'epic', region: 'LATAM', price: 49.99 },
    ],
    history: hist([59.99, 59.99, 59.99, 41.99, 35.99, 35.99, 59.99, 29.99, 27.99, 23.99, 21.99, 19.99]),
    requirements: {
      min: req(
        'Windows 10 64 bits',
        'Intel Core i5-8400 / Ryzen 5 2600',
        '8 GB RAM',
        ['GTX 1060 6 GB', 'Radeon RX 580 8 GB', 'Intel Arc A380'],
      ),
      rec: req(
        'Windows 11 64 bits',
        'Intel Core i7-12700 / Ryzen 7 5800X',
        '16 GB RAM',
        ['RTX 3070 8 GB', 'Radeon RX 6800', 'Intel Arc A770'],
      ),
    },
  },
  {
    id: 'neon-drift-legends',
    title: 'Neon Drift Legends',
    genre: 'Carreras arcade',
    developer: 'Velocity Punch',
    platforms: ['pc', 'xbox', 'switch'],
    theme: ['#ff2e63', '#ff9f1c'],
    summary: [
      'Carreras nocturnas por ciudades neón con derrapes encadenados y mulfunction tuning visual.',
      'Veinticircuitos reproducibles, seis modos de juego y split-screen para cuatro jugadores.',
      'La IA rival aprende de tu estilo: si frenas tarde, empezará a presionarte en las curvas.',
      'Banda sonora de synthwave con más de cuarenta pistas licenciadas.',
    ],
    stores: [
      { key: 'steam', region: 'GLOBAL', price: 12.49 },
      { key: 'nintendo', region: 'LATAM', price: 19.9 },
      { key: 'xbox', region: 'LATAM', price: 24.5 },
      { key: 'humble', region: 'GLOBAL', price: 29.99 },
    ],
    history: hist([39.99, 39.99, 27.99, 27.99, 39.99, 19.99, 19.99, 17.99, 39.99, 15.99, 13.99, 12.49]),
    requirements: {
      min: req(
        'Windows 10 64 bits',
        'Intel Core i3-9100 / Ryzen 3 3200G',
        '8 GB RAM',
        ['GTX 1050 Ti 4 GB', 'Radeon RX 570 4 GB', 'Vega 8'],
      ),
      rec: req(
        'Windows 11 64 bits',
        'Intel Core i5-11400 / Ryzen 5 5600',
        '16 GB RAM',
        ['RTX 3060 12 GB', 'Radeon RX 6600 XT', 'Intel Arc A580'],
      ),
    },
  },
  {
    id: 'ashen-crown',
    title: 'Forgotten Realms: Ashen Crown',
    genre: 'Acción y aventura',
    developer: 'Ironvale Games',
    platforms: ['pc', 'ps5'],
    theme: ['#8e5a2b', '#f4c95d'],
    summary: [
      'Un reino en ruinas, una corona que quema y cinco facciones peleando por sucederte.',
      'Combate cuerpo a cuerpo con paradas precisas y armas que se rompen y se reforjan.',
      'Mundo semiabierto con mazmorras generadas alrededor de tus propias decisiones.',
      'Narrativa ramificada con más de treinta finales posibles.',
    ],
    stores: [
      { key: 'gog', region: 'GLOBAL', price: 24.9 },
      { key: 'steam', region: 'GLOBAL', price: 26.99 },
      { key: 'psn', region: 'LATAM', price: 39.9 },
      { key: 'epic', region: 'LATAM', price: 44.9 },
      { key: 'green', region: 'LATAM', price: 47.5 },
    ],
    history: hist([69.99, 69.99, 48.99, 48.99, 69.99, 39.99, 34.99, 69.99, 31.99, 29.99, 27.99, 24.9]),
    requirements: {
      min: req(
        'Windows 10 64 bits',
        'Intel Core i5-8400 / Ryzen 5 2600',
        '12 GB RAM',
        ['GTX 1660 6 GB', 'Radeon RX 590', 'Intel Arc A380'],
      ),
      rec: req(
        'Windows 11 64 bits',
        'Intel Core i7-11700 / Ryzen 7 5700X',
        '16 GB RAM',
        ['RTX 3060 Ti', 'Radeon RX 6700 XT', 'Intel Arc A750'],
      ),
    },
  },
  {
    id: 'pixel-kingdom-tactics',
    title: 'Pixel Kingdom Tactics',
    genre: 'Estrategia por turnos',
    developer: 'Maple Byte',
    platforms: ['pc', 'switch'],
    theme: ['#2ecc71', '#27ae60'],
    summary: [
      'Construye tu reino pixel a pixel y defiéndelo en batallas tácticas de veinte turnos.',
      'Más de cien unidades combinables y un editor de mapas integrado.',
      'Partidas cortas pensadas para jugar en trayectos: de cinco a quince minutos.',
      'Multijugador en línea con clasificación mensual y retos entre amigos.',
    ],
    stores: [
      { key: 'steam', region: 'GLOBAL', price: 7.99 },
      { key: 'gog', region: 'GLOBAL', price: 8.49 },
      { key: 'nintendo', region: 'LATAM', price: 14.9 },
      { key: 'humble', region: 'LATAM', price: 17.99 },
    ],
    history: hist([19.99, 19.99, 19.99, 13.99, 9.99, 9.99, 19.99, 8.99, 19.99, 8.49, 7.99, 7.99]),
    requirements: {
      min: req(
        'Windows 10 / macOS 12',
        'Intel Core i3-6100 / Apple M1',
        '4 GB RAM',
        ['Intel HD 530', 'Mali-G57', 'Radeon R5 240'],
      ),
      rec: req(
        'Windows 11 / macOS 14',
        'Intel Core i5-10400 / Apple M2',
        '8 GB RAM',
        ['GTX 1050', 'Radeon RX 560', 'Apple M2 GPU'],
      ),
    },
  },
  {
    id: 'haunted-signal',
    title: 'Haunted Signal',
    genre: 'Terror psicológico',
    developer: 'Nocturne Lab',
    platforms: ['pc', 'ps5', 'xbox'],
    theme: ['#3d3d5c', '#9b5de5'],
    summary: [
      'Una radio antigua capaz de captar voces de habitaciones que no existen.',
      'Exploración en primera persona sin combate: sobrevive escuchando y escondiéndote.',
      'La historia cambia según las emisoras que sintonices cada noche.',
      'Recomendado con auriculares: el diseño sonoro es el verdadero protagonista.',
    ],
    stores: [
      { key: 'steam', region: 'GLOBAL', price: 9.99 },
      { key: 'epic', region: 'LATAM', price: 13.5 },
      { key: 'psn', region: 'LATAM', price: 16.9 },
      { key: 'xbox', region: 'LATAM', price: 17.9 },
      { key: 'green', region: 'GLOBAL', price: 21.99 },
    ],
    history: hist([29.99, 21.99, 21.99, 29.99, 17.99, 17.99, 29.99, 14.99, 29.99, 12.99, 11.99, 9.99]),
    requirements: {
      min: req(
        'Windows 10 64 bits',
        'Intel Core i5-6600 / Ryzen 5 1600',
        '8 GB RAM',
        ['GTX 970 4 GB', 'Radeon RX 570', 'Intel Arc A380'],
      ),
      rec: req(
        'Windows 11 64 bits',
        'Intel Core i5-10400 / Ryzen 5 3600',
        '16 GB RAM',
        ['RTX 2060', 'Radeon RX 5600 XT', 'Intel Arc A580'],
      ),
    },
  },
  {
    id: 'skyward-builders',
    title: 'Skyward Builders',
    genre: 'Simulación y construcción',
    developer: 'Cloud Harbor',
    platforms: ['pc', 'switch'],
    theme: ['#00b4d8', '#90e0ef'],
    summary: [
      'Levanta ciudades flotantes sobre un océano de nubes con recursos limitados.',
      'Sistema de comercio aéreo entre islas y rutas que tú diseñas.',
      'Sin enemigos ni relojes: juega a tu ritmo en partida infinita o en escenarios cerrados.',
      'Compatible con pantalla táctil y con controles partidos de la Switch.',
    ],
    stores: [
      { key: 'steam', region: 'GLOBAL', price: 14.99 },
      { key: 'nintendo', region: 'LATAM', price: 22.9 },
      { key: 'humble', region: 'LATAM', price: 24.5 },
      { key: 'epic', region: 'GLOBAL', price: 29.99 },
    ],
    history: hist([34.99, 34.99, 24.49, 24.49, 34.99, 19.99, 34.99, 18.99, 17.99, 34.99, 16.99, 14.99]),
    requirements: {
      min: req(
        'Windows 10 64 bits',
        'Intel Core i3-8100 / Ryzen 3 2200G',
        '8 GB RAM',
        ['GTX 1050 3 GB', 'Radeon RX 560', 'Intel UHD 630'],
      ),
      rec: req(
        'Windows 11 64 bits',
        'Intel Core i5-10400 / Ryzen 5 3600',
        '16 GB RAM',
        ['GTX 1660 Super', 'Radeon RX 5600 XT', 'Intel Arc A580'],
      ),
    },
  },
  {
    id: 'strike-protocol-zero',
    title: 'Strike Protocol: Zero',
    genre: 'Shooter táctico',
    developer: 'Blackline Interactive',
    platforms: ['pc', 'ps5', 'xbox'],
    theme: ['#141414', '#c0392b'],
    summary: [
      'Cincuenta y cinco jugadores en un mapa que se contrae sobre una base militar abandonada.',
      'Sistema de roles con equipo propio: francotirador, ingeniero, médico y vanguardia.',
      'Partidas clasificatorias con temporadas de ocho semanas y recompensas cosméticas.',
      'Cross-play completo entre PC, PlayStation y Xbox desde el primer día.',
    ],
    stores: [
      { key: 'steam', region: 'GLOBAL', price: 29.99 },
      { key: 'xbox', region: 'LATAM', price: 34.9 },
      { key: 'psn', region: 'LATAM', price: 36.5 },
      { key: 'green', region: 'LATAM', price: 39.99 },
      { key: 'epic', region: 'GLOBAL', price: 49.99 },
    ],
    history: hist([59.99, 59.99, 41.99, 41.99, 59.99, 35.99, 59.99, 33.99, 59.99, 31.99, 29.99, 29.99]),
    requirements: {
      min: req(
        'Windows 10 64 bits',
        'Intel Core i5-9400 / Ryzen 5 3400G',
        '12 GB RAM',
        ['GTX 1650 4 GB', 'Radeon RX 570', 'Intel Arc A380'],
      ),
      rec: req(
        'Windows 11 64 bits',
        'Intel Core i7-12700K / Ryzen 7 5800X',
        '16 GB RAM',
        ['RTX 3070', 'Radeon RX 6700 XT', 'Intel Arc A770'],
      ),
    },
  },
  {
    id: 'lanterns-of-the-deep',
    title: 'Lanterns of the Deep',
    genre: 'Puzzle y aventura',
    developer: 'Soft Coral',
    platforms: ['pc', 'switch', 'ps5'],
    theme: ['#1b4965', '#62b6cb'],
    summary: [
      'Desciende a un abismo iluminando linternas que revelan caminos distintos.',
      'Noventa acertijos de luz, sonido y marea, sin texto ni lectura obligatoria.',
      'Historia contada solo con imágenes: apta para todas las edades.',
      'Un juego corto y tranquilo: unas cuatro horas de duración.',
    ],
    stores: [
      { key: 'gog', region: 'GLOBAL', price: 6.49 },
      { key: 'steam', region: 'GLOBAL', price: 6.99 },
      { key: 'nintendo', region: 'LATAM', price: 11.9 },
      { key: 'psn', region: 'LATAM', price: 12.9 },
    ],
    history: hist([19.99, 19.99, 13.99, 13.99, 19.99, 9.99, 9.99, 19.99, 8.99, 7.99, 7.49, 6.49]),
    requirements: {
      min: req(
        'Windows 10 / macOS 12',
        'Intel Core i3-530 / Apple M1',
        '4 GB RAM',
        ['Intel HD 4400', 'Apple M1 GPU', 'Mali-G72'],
      ),
      rec: req(
        'Windows 11 / macOS 14',
        'Intel Core i5-8400 / Apple M2',
        '8 GB RAM',
        ['GTX 1050', 'Apple M2 GPU', 'Radeon RX 560'],
      ),
    },
  },
]

export const FAQ = [
  {
    q: '¿Qué es Estud-IA?',
    a: 'Estud-IA es un comparador de precios de videojuegos: reúne el precio de varias tiendas, muestra su evolución histórica y te avisa cuando un juego baja del precio que tú eliges.',
  },
  {
    q: '¿Crear una alerta tiene algún coste?',
    a: 'No. Las alertas son gratuitas y quedan guardadas en tu navegador. Solo necesitas iniciar sesión para sincronizarlas entre dispositivos (en esta maqueta, la sesión es de demostración).',
  },
  {
    q: '¿Los precios se actualizan solos?',
    a: 'En esta maqueta los precios son datos de ejemplo incluidos en la web. En una versión con API, cada tienda se consultaría periódicamente y el histórico se iría ampliando solo.',
  },
  {
    q: '¿Qué significa GLOBAL y LATAM?',
    a: 'Es el tipo de clave: GLOBAL se activa en cualquier país, mientras que LATAM solo funciona en Latinoamérica. Siempre conviene comprobarlo antes de comprar.',
  },
  {
    q: '¿Puedo usar Estud-IA desde el móvil?',
    a: 'Sí. Toda la web está adaptada a pantallas pequeñas, con botones grandes y navegación por categorías.',
  },
  {
    q: '¿Cómo se financia el proyecto?',
    a: 'Sin publicidad intrusiva: mediante convenios educativos como el que mantenemos con Esumer y, en el futuro, comisiones voluntarias de afiliado.',
  },
]
