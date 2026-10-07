import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { load, save } from '../lib/utils'

const AlertsContext = createContext(null)

export function AlertsProvider({ children }) {
  const [alerts, setAlerts] = useState(() => load('estudia.alerts', []))

  const persist = useCallback((next) => {
    setAlerts(next)
    save('estudia.alerts', next)
  }, [])

  const addAlert = (alert) => {
    const exists = alerts.find((a) => a.gameId === alert.gameId)
    if (exists) {
      persist(alerts.map((a) => (a.gameId === alert.gameId ? { ...a, ...alert } : a)))
      return
    }
    persist([
      ...alerts,
      { id: `${alert.gameId}-${Date.now()}`, active: true, createdAt: Date.now(), ...alert },
    ])
  }

  const removeAlert = (id) => persist(alerts.filter((a) => a.id !== id))

  const toggleAlert = (id) =>
    persist(alerts.map((a) => (a.id === id ? { ...a, active: !a.active } : a)))

  const updateAlert = (id, patch) =>
    persist(alerts.map((a) => (a.id === id ? { ...a, ...patch } : a)))

  const hasAlert = (gameId) => alerts.some((a) => a.gameId === gameId)

  const value = useMemo(
    () => ({ alerts, addAlert, removeAlert, toggleAlert, updateAlert, hasAlert }),
    [alerts, addAlert, removeAlert, toggleAlert, updateAlert, hasAlert],
  )

  return <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>
}

export const useAlerts = () => useContext(AlertsContext)
