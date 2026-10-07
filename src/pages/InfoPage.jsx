import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FAQ } from '../data/games'
import { IconCheck } from '../components/Icons'

const PAGES = {
  sobre: {
    title: 'Sobre nosotros',
    sections: (
      <>
        <p>
          Estud-IA nace como un proyecto educativo del <strong>Instituto Tecnológico Esumer</strong>{' '}
          para hacer más fácil la compra de videojuegos: sin trampas, con precios claros y avisos
          cuando llega el mejor momento para comprar.
        </p>
        <p style={{ color: 'var(--text-muted)' }}>
          Creemos que comparar precios no debería requerir veinte pestañas abiertas. Por eso
          reunimos tiendas, histórico y requisitos en una sola web, pensada para que cualquier
          persona pueda usarla sin experiencia previa.
        </p>
      </>
    ),
    cards: [
      { title: 'Misión', text: 'Que cualquier persona encuentre su juego al mejor precio, con información clara y accesible.' },
      { title: 'Visión', text: 'Ser el comparador de videojuegos de referencia en Latinoamérica, construido por estudiantes para estudiantes.' },
      { title: 'Equipo', text: 'Desarrolladores, diseñadores y docentes trabajando en convenio dentro del programa de Ingeniería de Software.' },
    ],
  },
  comite: {
    title: 'Comité Estud-IA',
    sections: (
      <>
        <p>
          El <strong>Comité Estud-IA</strong> define las líneas de trabajo del proyecto: qué
          tiendas se comparan, cómo se presentan los datos y qué criterios de accesibilidad se
          aplican.
        </p>
        <p style={{ color: 'var(--text-muted)' }}>
          Está formado por representantes del estudiantado, docentes asesores y miembros del
          convenio con Esumer. Si quieres proponer una mejora, escríbenos desde la sección de
          contacto.
        </p>
      </>
    ),
    cards: [
      { title: 'Estudiantes', text: 'Proponen mejoras, prueban la usabilidad y validan que todo sea fácil de entender.' },
      { title: 'Docentes', text: 'Acompañan el desarrollo técnico y la calidad de los contenidos.' },
      { title: 'Convenio', text: 'El convenio Esumer aporta recursos y espacios para formar talento real.' },
    ],
  },
  ayuda: {
    title: 'Centro de ayuda',
    sections: (
      <>
        <p>Así se usa Estud-IA en tres pasos:</p>
        <ol style={{ paddingLeft: '1.2rem', display: 'grid', gap: '0.5rem' }}>
          <li><strong>Explora el catálogo:</strong> busca por nombre o filtra por género y plataforma.</li>
          <li><strong>Abre un juego:</strong> compara tiendas, revisa el histórico de precios y los requisitos del sistema.</li>
          <li><strong>Crea una alerta:</strong> inicia sesión, elige tu precio objetivo y nosotros te avisamos cuando baje.</li>
        </ol>
        <p style={{ color: 'var(--text-muted)' }}>
          ¿Tienes dudas concretas? Mira las <Link to="/faq">preguntas frecuentes</Link> o{' '}
          <Link to="/contacto">escríbenos</Link>.
        </p>
      </>
    ),
    cards: [],
  },
  contacto: { title: 'Contacto', component: <ContactForm />, cards: [] },
  faq: {
    title: 'Preguntas frecuentes',
    component: (
      <div>
        {FAQ.map((item) => (
          <details className="faq-item" key={item.q}>
            <summary>{item.q}</summary>
            <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)' }}>{item.a}</p>
          </details>
        ))}
      </div>
    ),
    cards: [],
  },
}

function ContactForm() {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="info-card">
        <h2>Mensaje enviado</h2>
        <p className="form-success"><IconCheck size={16} /> ¡Gracias, {name || 'amigo'}! Te responderemos a {email} en menos de 48 horas.</p>
        <button className="btn btn-ghost" onClick={() => { setSent(false); setName(''); setEmail(''); setMessage('') }}>
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <div className="info-card">
      <form onSubmit={submit}>
        <div className="form-field">
          <label htmlFor="cf-name">Nombre</label>
          <input id="cf-name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-field">
          <label htmlFor="cf-email">Correo</label>
          <input id="cf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-field">
          <label htmlFor="cf-msg">Mensaje</label>
          <textarea
            id="cf-msg"
            rows="5"
            style={{ minHeight: '110px', padding: '0.5rem 0.9rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)', font: 'inherit' }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Enviar mensaje</button>
      </form>
    </div>
  )
}

export default function InfoPage({ page }) {
  const content = PAGES[page] || PAGES.sobre

  return (
    <div className="page container">
      <div className="page-head">
        <h1>{content.title}</h1>
      </div>

      {content.sections && <div className="info-card" style={{ marginBottom: '1.5rem' }}>{content.sections}</div>}
      {content.component}

      {content.cards.length > 0 && (
        <div className="info-grid" style={{ marginTop: '1rem' }}>
          {content.cards.map((c) => (
            <div key={c.title} className="info-card">
              <h2>{c.title}</h2>
              <p style={{ color: 'var(--text-muted)' }}>{c.text}</p>
              {c.detail && <p style={{ color: 'var(--text-muted)' }}>{c.detail}</p>}
            </div>
          ))}
        </div>
      )}

      <p style={{ marginTop: '1.5rem' }}>
        <Link to="/catalogo" className="btn btn-ghost">← Volver al catálogo</Link>
      </p>
    </div>
  )
}