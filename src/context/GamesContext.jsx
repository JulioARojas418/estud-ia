import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { GAMES } from '../data/games'
import { load, save } from '../lib/utils'

const GamesContext = createContext(null)
const KEY = 'estudia.games'

export function GamesProvider({ children }) {
  const [games, setGames] = useState(() => load(KEY, GAMES))

  const persist = useCallback((next) => {
    setGames(next)
    save(KEY, next)
  }, [])

  const updateGame = (id, patch) =>
    persist(games.map((g) => (g.id === id ? { ...g, ...patch } : g)))

  const addGame = (game) => persist([...games, game])

  const removeGame = (id) => persist(games.filter((g) => g.id !== id))

  const resetGames = () => persist(GAMES)

  const value = useMemo(
    () => ({ games, updateGame, addGame, removeGame, resetGames }),
    [games, updateGame, addGame, removeGame, resetGames],
  )

  return <GamesContext.Provider value={value}>{children}</GamesContext.Provider>
}

export const useGames = () => useContext(GamesContext)
