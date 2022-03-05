import React, { Dispatch, SetStateAction } from 'react'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { AbiItem } from 'web3-utils'
import { Contract } from 'web3-eth-contract'
import { FightState, GameState } from '../types'
import { config } from '../contracts/config'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GAME_ABI = require('../contracts/game.json')

export interface GameContextType {
  gameId: number | null
  setGameId: (id: number) => void
  gameState: GameState | null
  setGameState: (state: GameState) => void
  updateGameState: () => void
  gameContract: Contract | undefined
  setGameContract: Dispatch<SetStateAction<Contract | undefined>>
  onNextPhase: () => Promise<void>
  onStartFight: () => Promise<void>
  onEndFightPhase: () => Promise<void>
  onEndTurn: () => Promise<void>
  onPlayCard: (cardId: number) => Promise<void>
  fight: FightState
  setFight: Dispatch<SetStateAction<FightState>>
}

export const GameContext = React.createContext<GameContextType>(
  {} as GameContextType
)

export const GameProvider: React.FC = ({ children }) => {
  const { account, library } = useWeb3React()
  const localGameId = localStorage.getItem('gameId')
  const [gameId, setGameId] =
    React.useState<number | null>(Number(localGameId))
  const [gameState, setGameState] = React.useState<GameState | null>(null)
  const [gameContract, setGameContract] = React.useState<Contract | undefined>(
    undefined
  )

  const [fight, setFight] =
    React.useState<FightState>({
      attacker: null,
      defender: null
    })

  React.useEffect(() => {
    updateGameState()
  }, [gameId])

  const getGameId = async (): Promise<void> => {
    const gamesCountResponse = await gameContract?.methods
      .getGamesCount()
      .call({ from: account })
    localStorage.setItem('gameId', String(gamesCountResponse - 1))
    setGameId(gamesCountResponse - 1)
  }

  React.useEffect(() => {
    if (!gameId) {
      getGameId()
      updateGameState()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, gameId, gameState])

  const updateGameState = React.useCallback(async (): Promise<void> => {
    const web3 = new Web3(library.provider)
    const GameContract = new web3.eth.Contract(
      GAME_ABI as AbiItem[],
      config.GAME_ADDRESS
    )
    setGameContract(GameContract)
    const gameResponse = await GameContract.methods
      .games(gameId)
      .call({ from: account })
    setGameState(gameResponse)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, account])

  // DRAW CARD
  const onNextPhase = async (): Promise<void> => {
    await gameContract?.methods.draw_card(gameId).send({ from: account })
    updateGameState()
  }

  // START FIGHT
  const onStartFight = async (): Promise<void> => {
    await gameContract?.methods.
      start_fight_phase(gameId).send({ from: account })
    updateGameState()
  }

  // END FIGHT
  const onEndFightPhase = async (): Promise<void> => {
    await gameContract?.methods.
      end_fight_phase(gameId).send({ from: account })
    await updateGameState()
  }

  // END TURN
  const onEndTurn = async (): Promise<void> => {
    await gameContract?.methods.
      end_turn(gameId).send({ from: account })
    await updateGameState()
  }

  // ON PLAY CARD
  const onPlayCard = async (cardId: number): Promise<void> => {
    await gameContract?.methods.play_card(gameId, cardId).send(
      { from: account }
    )
    await updateGameState()
  }

  // ON ATTACK
  const onAttack = async (): Promise<void> => {
    await gameContract?.methods.
      attack(gameId, fight.attacker, fight.defender).send(
        { from: account }
      )
    console.log(`Attacker: ${fight.attacker}, Defender: ${fight.defender}`)
    await updateGameState()
    setFight({
      attacker: null,
      defender: null
    })
  }

  React.useEffect((): void => {
    if (fight.attacker !== null && fight.defender !== null) {
      onAttack()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fight])

  React.useEffect(() => {
    console.log('Context: Game ID', gameId)
    console.log('Context: Game State', gameState)
  }, [gameId, gameState])

  const context: GameContextType = {
    gameId,
    setGameId,
    gameState,
    setGameState,
    updateGameState,
    gameContract,
    setGameContract,
    onNextPhase,
    onStartFight,
    onEndFightPhase,
    onEndTurn,
    onPlayCard,
    fight,
    setFight
  }

  return (
    <GameContext.Provider value={context}>
      {children}
    </GameContext.Provider>
  )
}
