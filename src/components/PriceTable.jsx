import { money, storesSorted, storeInfo } from '../lib/utils'
import { StoreMark, IconExternal } from './Icons'

const bandFor = (stores) => {
  const sorted = storesSorted(stores)
  if (sorted.length <= 1) return 'Precio medio'
  const map = {}
  sorted.forEach((s, i) => {
    map[s.key] = i === 0 ? '#low' : i === sorted.length - 1 ? '#high' : '#mid'
  })
  return map
}

const BAND_TEXT = { '#low': 'Precio bajo', '#mid': 'Precio medio', '#high': 'Precio alto' }

export default function PriceTable({ stores }) {
  const rows = storesSorted(stores)
  const bands = bandFor(stores)

  return (
    <div className="table-wrap">
      <table className="price-table">
        <caption className="sr-only">Comparación de precios por tienda</caption>
        <thead>
          <tr>
            <th scope="col">Tienda</th>
            <th scope="col">Tipo de clave</th>
            <th scope="col">Precio</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => {
            const info = storeInfo(s.key)
            return (
              <tr key={s.key}>
                <td>
                  <div className="store-cell">
                    <StoreMark icon={info.icon} color={info.color} label={info.name} />
                    <span>{info.name}</span>
                  </div>
                </td>
                <td>
                  <span className="region-tag">{s.region}</span>
                </td>
                <td>
                  <strong>{money(s.price)}</strong>
                  <span className={`band ${bands[s.key]}`}>{BAND_TEXT[bands[s.key]]}</span>
                </td>
                <td>
                  <a
                    className="btn btn-primary btn-sm"
                    href={info.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ir a la tienda <IconExternal size={16} />
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}