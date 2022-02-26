/* eslint-disable no-console */
import React from 'react'
import { Box } from '@iotabots/components'
import Player from '../components/Game/Player'

import { OPPONENT, PLAYER } from '../data/players'
import Round from '../components/Game/Round'
import { BotType, CardType } from '../types'
import { PHASES } from '../data/phases'

const Game: React.FC = () => {
  const [game, setGame] = React.useState('Game #1')
  const [players, setPlayers] = React.useState({
    player: PLAYER,
    opponent: OPPONENT
  })
  const [round, setRound] = React.useState(1)
  const [currentPlayer, setCurrentPlayer] = React.useState<string>('player')

  const onFight = (card: BotType): void => {
    console.log('Card Attack', card.attack)
    if (currentPlayer === 'player') {
      setPlayers({
        player: players.player,
        opponent: {
          ...players.opponent,
          hp: players.opponent.hp - (card.attack || 0),
        }
      })
    }
  }

  const [phase, setPhase] = React.useState(0)

  return (
    <Box>
      <Player
        player={players.opponent}
        onTurn={currentPlayer === players.opponent.type}
        phase={PHASES[phase]}
        setPhase={setPhase}
        setCurrentPlayer={setCurrentPlayer}
        round={round}
        setRound={setRound}
      // onFight={onFight}
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
      // onFight={onFight}
      />
    </Box>
  )
}

export default Game