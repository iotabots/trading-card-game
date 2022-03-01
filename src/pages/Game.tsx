import React from 'react'
import { Box } from '@iotabots/components'
import Player from '../components/Game/Player'

import { OPPONENT, PLAYER } from '../data/players'
import Round from '../components/Game/Round'
import { PHASES } from '../data/phases'
import { GameContext } from '../contexts/GameContext'

const Game: React.FC = () => {
  const { currentPlayer, gameState, gameId } = React.useContext(GameContext)
  console.log(currentPlayer)

  let player
  let opponent
  if (currentPlayer === 'player1') {
    player = gameState?.player1
    opponent = gameState?.player2
  } else if (currentPlayer === 'player2') {
    player = gameState?.player2
    opponent = gameState?.player1
  }
  const [round, setRound] = React.useState(1)

  const [phase, setPhase] = React.useState(0)
  console.log(`${gameState} ${gameId}`)
  return (
    <Box>
      <Player
        className='opponent'
        player={opponent}
      />
      <Round
        number={round}
        title={PHASES[phase].label}
      />
      <Player
        className='me'
        player={player}
      />
    </Box>
  )
}

export default Game