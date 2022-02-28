import React from 'react'
import { Box } from '@iotabots/components'
import Player from '../components/Game/Player'

import { OPPONENT, PLAYER } from '../data/players'
import Round from '../components/Game/Round'
import { PHASES } from '../data/phases'

const Game: React.FC = () => {
  const [players, setPlayers] = React.useState({
    player: PLAYER,
    opponent: OPPONENT
  })
  const [round, setRound] = React.useState(1)
  const [currentPlayer, setCurrentPlayer] = React.useState<string>('player')

  const [phase, setPhase] = React.useState(0)

  return (
    <Box>
      <Player
        className='opponent'
        player={players.opponent}
        onTurn={currentPlayer === players.opponent.type}
        phase={PHASES[phase]}
        setPhase={setPhase}
        setCurrentPlayer={setCurrentPlayer}
        round={round}
        setRound={setRound}
      />
      <Round
        setRound={setRound}
        number={round}
        title={PHASES[phase].label}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        setPhase={setPhase}
        phase={phase}
      />
      <Player
        className='me'
        player={players.player}
        onTurn={currentPlayer === players.player.type}
        phase={PHASES[phase]}
        setPhase={setPhase}
        setCurrentPlayer={setCurrentPlayer}
        round={round}
        setRound={setRound}
      />
    </Box>
  )
}

export default Game