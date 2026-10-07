import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Assistant from './components/Assistant'
import CatalogPage from './pages/CatalogPage'
import GamePage from './pages/GamePage'
import AlertsPage from './pages/AlertsPage'
import AssistantPage from './pages/AssistantPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import InfoPage from './pages/InfoPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/juego/:id" element={<GamePage />} />
          <Route path="/alertas" element={<AlertsPage />} />
          <Route path="/asistente" element={<AssistantPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/sobre" element={<InfoPage page="sobre" />} />
          <Route path="/comite" element={<InfoPage page="comite" />} />
          <Route path="/ayuda" element={<InfoPage page="ayuda" />} />
          <Route path="/contacto" element={<InfoPage page="contacto" />} />
          <Route path="/faq" element={<InfoPage page="faq" />} />
          <Route path="*" element={<CatalogPage />} />
        </Routes>
      </main>
      <Footer />
      <Assistant />
    </>
  )
}