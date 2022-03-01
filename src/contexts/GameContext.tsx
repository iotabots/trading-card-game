import { useWeb3React } from '@web3-react/core'
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
  currentPlayer: string | null
}

export const GameContext = React.createContext<GameContextType>(
  {} as GameContextType
)

export const GameProvider: React.FC = ({ children }) => {
  const { account, library } = useWeb3React()
  const [gameId, setGameId] = React.useState<number | null>(null)
  const [gameState, setGameState] = React.useState<GameState | null>(null)
  const [currentPlayer, setCurrentPlayer] = React.useState<string | null>(null)

  React.useEffect(() => {
    console.log('Game ID', gameId)
    console.log('Game State', gameState)
    console.log('Current Player', currentPlayer)
  }, [gameId, gameState])

  React.useEffect(() => {
    if (!!account && !!library) {
      if (account === gameState?.player1.addr) {
        console.log('setCurrentPlayer:player1')
        setCurrentPlayer('player1')
      } else if (account === gameState?.player2.addr) {
        console.log('setCurrentPlayer:player2')
        setCurrentPlayer('player2')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  const context: GameContextType = {
    gameId,
    setGameId,
    gameState,
    setGameState,
    currentPlayer,
  }

  return <GameContext.Provider value={context}>{children}</GameContext.Provider>
}
