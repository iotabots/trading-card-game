import React from 'react'
import { Box, Navigation } from '@iotabots/components'
import { useWeb3React } from '@web3-react/core'
import { useNavigate } from 'react-router'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
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
        <Navigation identity menu={[]} mobileMenu={[]} />
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
          turn={(Number(gameState?.turn) + 1)}
          phaseId={gameState?.phase || ''} />
      )}
      <Box sx={{
        position: 'fixed',
        bottom: 60,
        left: 60,
        zIndex: 10,
        display: 'flex'
      }} >
        <FancyButton mr={2} onClick={() => navigate('/')}>
          Game Menu
        </FancyButton>
        <FancyButton
          onClick={updateGameState}>
          <RefreshRoundedIcon />
        </FancyButton>
      </Box>
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
