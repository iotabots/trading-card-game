import React from 'react'
import { Avatar, Box, Button, Typography } from '@iotabots/components'
import { BoxProps } from '@mui/material'
import Health from './Health'
import Mana from './Mana'
import Board from './Board'
import Hand from './Hand'
import Deck from './Deck'
import Cemetery from './Cemetery'
import { CardType, PhaseType, PlayerType } from '../types'


interface PlayerProps extends BoxProps {
  player: PlayerType
  onTurn: boolean
  phase: PhaseType
  setPhase: (number: number) => void
  setCurrentPlayer: (player: string) => void
  round: number
  setRound: (number: number) => void
  // eslint-disable-next-line react/require-default-props
  onFight?: (card: CardType) => void
}

const Player: React.FC<PlayerProps> = (props) => {
  const {
    player,
    className,
    onTurn,
    phase,
    setPhase,
    setCurrentPlayer,
    round,
    setRound,
    onFight
  } = props
  const [hp, setHp] = React.useState(20)
  const [mp, setMp] = React.useState(0)
  const [deck, setDeck] = React.useState(player.deck)
  const [hand, setHand] = React.useState(player.hand)
  const [board, setBoard] = React.useState(player.board)
  const [cemetery, setCemetery] = React.useState([])

  const onActionClick = (): void => {
    if (phase.id === 0) {
      console.log(round)
      if (round === 1) {
        onDraw(3)
      } else {
        onDraw(1)
      }
      onDraw(round === 1 ? 3 : 1)
      setPhase(phase.id + 1)
    } else if (phase.id === 1) {
      setPhase(phase.id + 1)
    } else if (phase.id === 2) {
      setPhase(phase.id + 1)
    } else if (phase.id === 3) {
      setPhase(phase.id + 1)
    } else if (phase.id === 4) {
      setPhase(0)
      setCurrentPlayer(player.type === 'player' ? 'opponent' : 'player')
      if (player.type === 'player') {
        setCurrentPlayer('opponent')
      } else {
        setCurrentPlayer('player')
        setRound(round + 1)
      }
    }
  }

  const onDraw = (number: number): void => {
    const nextDeck = deck
      .filter((element, index) => index < deck.length - number)
    const newCards = []
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= number; i++) {
      newCards.push(deck[deck.length - i])
    }
    setHand([...hand, ...newCards])
    setDeck(nextDeck)
    let manaGain = round
    if (mp + round > 10) {
      manaGain = 10
    }
    setMp(mp + manaGain)
  }

  const onPlay = (number: number): void => {
    const nextHand = hand.filter((element, index) => index !== number)
    setBoard([...board, hand[number]])
    // setMp(mp - hand[number].cost)
    console.log('onPlay')
    setHand(nextHand)
  }

  const onAttack = (number: number): void => {
    // onFight(board[number])
    // console.log('attack', board[number].attack)
    console.log('onAttack')
  }

  return (
    <Box
      className={className}
      sx={{
        height: '50vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexGrow: 1,
        p: 8,
        '&.me': {
          alignItems: 'flex-end',

          '& .board-container': {
            flexDirection: 'column'
          },

          '& .hand': {
            mt: 6,
            mb: 0,
          }
        }
      }}>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{
          width: 240,
          p: 4,
          bgcolor: 'rgba(0,0,0,0.5)',
          borderRadius: '8px'
        }}
      >
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Avatar sx={{ height: 100, width: 100 }} src={player.avatar} />
          <Typography fontWeight='bold' my={2}>{player.id}</Typography>
        </Box>
        <Health hp={hp} />
        <Mana mp={mp} />
        {onTurn && (
          <Button
            onClick={onActionClick}
            fullWidth
            sx={{ mt: 4 }}
          >
            {phase.label}
          </Button>
        )}
      </Box>
      <Box
        className='board-container'
        flexDirection='column-reverse'
        display='flex'
        flexGrow='1'
        mx={8}
      >
        <Board board={board} onAttack={onAttack} />
        <Hand mp={mp} hand={hand} onPlay={onPlay} />
      </Box>
      <Box width={220}>
        <Deck cards={deck.length} />
        <Cemetery cards={cemetery.length} />
      </Box>
    </Box >
  )
}

export default Player