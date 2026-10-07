import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { AlertsProvider } from './context/AlertsContext'
import { GamesProvider } from './context/GamesContext'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GamesProvider>
        <AuthProvider>
          <AlertsProvider>
            <App />
          </AlertsProvider>
        </AuthProvider>
      </GamesProvider>
    </BrowserRouter>
  </React.StrictMode>,
)