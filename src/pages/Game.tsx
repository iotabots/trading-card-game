import React from 'react'
import { Box, Button, Navigation } from '@iotabots/components'
import { useWeb3React } from '@web3-react/core'
import { useNavigate } from 'react-router'
import Player from '../components/Game/Player'
import Round from '../components/Game/Round'
import { GameContext } from '../contexts/GameContext'
import { PlayerType } from '../types'
import FancyButton from '../components/Button'

const Game: React.FC = () => {
  const { account } = useWeb3React()

  const {
    gameState,
    updateGameState,
  } = React.useContext(GameContext)

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

  React.useEffect(() => {
    if (account && gameState) {
      if (account === gameState?.player1.addr) {
        setPlayer(gameState?.player1)
        setOpponent(gameState?.player2)
      } else if (account === gameState?.player2.addr) {
        setPlayer(gameState?.player2)
        setOpponent(gameState?.player1)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, gameState])

  React.useEffect(() => {
    updateGameState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        />
      }
      {gameState && (
        <Round
          round={String(Number(gameState?.turn) + 1)}
          phaseId={gameState?.phase || ''} />
      )}
      <FancyButton
        sx={{
          position: 'fixed',
          top: '48%',
          left: 60,
          zIndex: 10
        }}
        onClick={updateGameState}>
        Reload
      </FancyButton>
      <Button
        sx={{
          position: 'fixed',
          bottom: 60,
          left: 60,
          zIndex: 10,
        }}
        color='inherit'
        variant='contained'
        onClick={() => navigate('/')}>
        Game Menu
      </Button>
      {gameState && player &&
        <Player
          className='me'
          me
          player={player}
        />
      }
    </Box>
  )
}

export default Game
