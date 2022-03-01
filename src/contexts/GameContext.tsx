import React from 'react'

interface CardStack {
  cards: string[]
  size: string
}

interface PlayerType {
  addr: string
  botZone: CardStack
  deck: CardStack
  hand: CardStack
  junk: CardStack
  mana: string
  health: string
}

interface GameState {
  id: string | null
  player1: PlayerType
  player2: PlayerType
  winner: string
  state: string
  turn: string
  phase: string
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
  const localGameId = localStorage.getItem('gameId')
  const [gameId, setGameId] =
    React.useState<number | null>(Number(localGameId))
  const [gameState, setGameState] = React.useState<GameState | null>(null)

  React.useEffect(() => {
    console.log('Context: Game ID', gameId)
    console.log('Context: Game State', gameState)
  }, [gameId, gameState])

  const context: GameContextType = {
    gameId,
    setGameId,
    gameState,
    setGameState,
  }

  return (
    <GameContext.Provider value={context}>
      {children}
    </GameContext.Provider>
  )
}
