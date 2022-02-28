import React from 'react'

interface GameState {
  id: string | null
}

export interface GameContextType {
  gameId: number | null
  setGameId: (id: number) => void
  gameState: GameState | null
  setGameState: (state: GameState) => void
}

export const GameContext = React.createContext<GameContextType>(
  {} as GameContextType
)

export const GameProvider: React.FC = ({ children }) => {
  const [gameId, setGameId] = React.useState<number | null>(null)
  const [gameState, setGameState] = React.useState<GameState | null>(null)

  React.useEffect(() => {
    console.log('Game ID', gameId)
    console.log('Game State', gameState)
  }, [gameId, gameState])

  const context: GameContextType = {
    gameId,
    setGameId,
    gameState,
    setGameState
  }

  return (
    <GameContext.Provider value={context}>
      {children}
    </GameContext.Provider>
  )
}
