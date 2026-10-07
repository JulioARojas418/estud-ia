import { Link } from 'react-router-dom'

const Convenio = () => (
  <p className="convenio-desc">
    Convenio de colaboración educativa para el desarrollo de herramientas digitales de
    aprendizaje, pensado junto al equipo docente y adaptado a aulas con recursos variables.
  </p>
)

const ContactCard = () => (
  <div className="contact-card">
    <svg viewBox="0 0 120 80" role="img" aria-label="Ilustración de contacto por correo">
      <rect width="120" height="80" rx="10" fill="var(--surface-2)" />
      <rect x="14" y="22" width="60" height="42" rx="6" fill="var(--brand)" opacity="0.25" />
      <path d="M14 28 44 48 74 28" fill="none" stroke="var(--brand)" strokeWidth="3" />
      <circle cx="92" cy="30" r="12" fill="var(--accent)" opacity="0.9" />
      <path d="M86 30h12M92 24v12" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <rect x="80" y="50" width="26" height="14" rx="7" fill="var(--surface)" />
      <text x="93" y="60" textAnchor="middle" fontSize="9" fill="var(--text-muted)" fontFamily="inherit">
        hola
      </text>
    </svg>
    <div>
      <p className="contact-line">
        <strong>Correo:</strong> hola@estud-ia.example
      </p>
      <p className="contact-line">
        <strong>Horario:</strong> lunes a viernes, 9:00 – 18:00
      </p>
      <Link to="/contacto" className="contact-link">
        Ir al formulario de contacto
      </Link>
    </div>
  </div>
)

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section>
          <h3>Conócenos</h3>
          <ul>
            <li><Link to="/sobre">Sobre nosotros</Link></li>
            <li><Link to="/ayuda">Ayuda</Link></li>
            <li><Link to="/comite">Comité</Link></li>
          </ul>
        </section>

        <section>
          <h3>Ayuda</h3>
          <ul>
            <li><Link to="/ayuda">Centro de ayuda</Link></li>
            <li><Link to="/faq">Preguntas frecuentes</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </section>

        <section>
          <h3>Contacto</h3>
          <ContactCard />
        </section>

        <section>
          <h3>Un proyecto en convenio con</h3>
          <p className="partner">Esumer</p>
          <Convenio />
        </section>
      </div>

      <div className="footer-legal">
        <p>
          Legal noticios es contissoll onseito insildo con is tm outro, outro este mande de mandre
          prociololismos por uso compeoniente connernieris over o mosde. Privacy police de contæs.
        </p>
        <p>
          © Copyright Estud-IA, 2ft Maqueta set ils realoxeadlazero | Plataforma disclainmes.
        </p>
        <div className="mockup-badges">
          <span className="mockup-badge">Maqueta estructural</span>
          <span className="mockup-badge">Maqueta de diseño técnico</span>
        </div>
      </div>
    </footer>
  )
}
