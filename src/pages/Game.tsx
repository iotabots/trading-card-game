import React from 'react'
import { Box, Navigation } from '@iotabots/components'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import { useNavigate } from 'react-router'
import Player from '../components/Game/Player'

import Round from '../components/Game/Round'
import { GameContext } from '../contexts/GameContext'
import { PlayerType } from '../types'
import { config } from '../contracts/config'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const GAME_ABI = require('../contracts/game.json')

const Game: React.FC = () => {
  const { account, library } = useWeb3React()

  const {
    gameState,
    gameId,
    setGameId,
    setGameState
  } = React.useContext(GameContext)

  const [gameContract, setGameContract] = React.useState<Contract | undefined>(
    undefined
  )

  const [player, setPlayer] =
    React.useState<PlayerType | null>(null)

  const [opponent, setOpponent] =
    React.useState<PlayerType | null>(null)

  const navigate = useNavigate()
  const MENU = [
    {
      label: 'Collection',
      onClick: () => navigate('/'),
    },
    {
      label: 'Game',
      onClick: () => navigate('/game'),
    },
    {
      label: 'History',
      onClick: () => navigate('/history'),
    },
  ]

  const init = async (): Promise<void> => {
    if (gameId === null) {
      const localGameId = localStorage.getItem('gameId')
      if (localGameId === '') {
        navigate('/')
      } else {
        setGameId(Number(localGameId))
        getGameState()
      }
    } else if (gameId >= 0) {
      localStorage.setItem('gameId', gameId.toString())
      getGameState()
    }
  }

  const getGameState = React.useCallback(async (): Promise<void> => {
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
  }, [])

  React.useEffect(() => {
    if (!!account && !!library) {
      if (gameState === null) {
        init()
      }
      if (account === gameState?.player1.addr) {
        setPlayer(gameState?.player1)
        setOpponent(gameState?.player2)
      } else if (account === gameState?.player2.addr) {
        setPlayer(gameState?.player2)
        setOpponent(gameState?.player1)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, gameId, gameState])


  const onNextPhase = async (): Promise<void> => {
    await gameContract?.methods.draw_card(gameId).send({ from: account })
    await getGameState()
    console.log('Start Fight')
  }

  const onStartFight = async (): Promise<void> => {
    await gameContract?.methods.
      start_fight_phase(gameId).send({ from: account })
    await getGameState()
    console.log('Start Fight')
  }

  const onEndFightPhase = async (): Promise<void> => {
    await gameContract?.methods.
      end_fight_phase(gameId).send({ from: account })
    await getGameState()
    console.log('End Fight Phase')
  }

  const onEndTurn = async (): Promise<void> => {
    await gameContract?.methods.
      end_turn(gameId).send({ from: account })
    await getGameState()
    console.log('End Turn')
  }

  const onPlayCard = async (cardId: number): Promise<void> => {
    const response =
      await gameContract?.methods.play_card(gameId, cardId).send(
        { from: account }
      )
    console.log('cardId', cardId)
    console.log('onPlayCard', response)
    await getGameState()
  }

  // console.log('Game: opponent', opponent)
  // console.log('Game: player', player)
  return (
    <Box>
      <Box sx={{ display: 'none' }}>
        <Navigation identity menu={MENU} mobileMenu={MENU} />
      </Box>
      {opponent &&
        <Player
          className='opponent'
          me={false}
          player={opponent}
          onPlayCard={onPlayCard}
        />
      }
      {gameState && (
        <Round
          nextPhase={onNextPhase}
          startFight={onStartFight}
          endFightPhase={onEndFightPhase}
          endTurn={onEndTurn}
          round={String(Number(gameState?.turn) + 1)}
          phaseId={gameState?.phase || ''} />
      )
      }
      {gameState && player &&
        <Player
          className='me'
          me
          player={player}
          onPlayCard={onPlayCard}
        />
      }
    </Box>
  )
}

export default Game
