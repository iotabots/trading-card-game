import React from 'react'
import { Box } from '@iotabots/components'
import { useWeb3React } from '@web3-react/core'
import Player from '../components/Game/Player'

import { OPPONENT, PLAYER } from '../data/players'
import Round from '../components/Game/Round'
import { PHASES } from '../data/phases'
import { GameContext } from '../contexts/GameContext'
import { PlayerType } from '../types'

const Game: React.FC = () => {
  const { gameState, gameId } = React.useContext(GameContext)
  const [player, setPlayer] = React.useState<PlayerType | null>(null)
  const [opponent, setOpponent] = React.useState<PlayerType | null>(null)

  const { account, library } = useWeb3React()

  React.useEffect(() => {
    if (!!account && !!library) {
      if (account === gameState?.player1.addr) {
        console.log('setCurrentPlayer:player1')
        setPlayer(gameState?.player1)
        setOpponent(gameState?.player2)
      } else if (account === gameState?.player2.addr) {
        console.log('setCurrentPlayer:player2')
        setPlayer(gameState?.player2)
        setOpponent(gameState?.player1)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  const [round, setRound] = React.useState(1)

  const [phase, setPhase] = React.useState(0)
  console.log(`${gameState} ${gameId}`)
  console.log('opponent', opponent)
  console.log('player', player)
  return (
    <Box>
      {opponent && <Player className='opponent' player={opponent} />}
      <Round number={round} title={PHASES[phase].label} />
      {player && <Player className='me' player={player} />}
    </Box>
  )
}

export default Game
