import { STORES } from '../data/games'

export const money = (n) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(n)

export const storesSorted = (stores) => [...stores].sort((a, b) => a.price - b.price)

export const lowestPrice = (stores) => Math.min(...stores.map((s) => s.price))

export const priceBand = (stores) => {
  const sorted = storesSorted(stores)
  return stores.map((s) => {
    if (sorted.length <= 1) return 'Precio medio'
    if (s.price === sorted[0].price) return 'Precio bajo'
    if (s.price === sorted[sorted.length - 1].price) return 'Precio alto'
    return 'Precio medio'
  })
}

export const storeInfo = (key) => STORES[key] || { name: key, icon: 'generic', color: '#888', url: '#' }

export const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* almacenamiento no disponible */
  }
}
