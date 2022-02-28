import React from 'react'
import { Avatar, Box, Button, Typography } from '@iotabots/components'
import { BoxProps, SxProps } from '@mui/material'
import Health from './Health'
import Mana from './Mana'
import Board from './Board'
import Hand from './Hand'
import Deck from '../Deck/Deck'
import Junk from './Junk'
import { CardType, PhaseType, PlayerType } from '../../types'


interface PlayerProps extends BoxProps {
  player: PlayerType
  onTurn: boolean
  phase: PhaseType
  setPhase: (number: number) => void
  setCurrentPlayer: (player: string) => void
  round: number
  setRound: (number: number) => void
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
  } = props
  const [hp, setHp] = React.useState(20)
  const [mp, setMp] = React.useState(0)
  const [deck, setDeck] = React.useState<CardType[]>(player.deck)
  const [hand, setHand] = React.useState(player.hand)
  const [board, setBoard] = React.useState(player.board)
  const [junk, setJunk] = React.useState([])

  const onActionClick = (): void => {
    if (phase.id === 0) {
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
    for (let i = 1; i <= number; i += 1) {
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
    setHand(nextHand)
  }

  const playerStyles: SxProps = {
    position: 'relative',
    overflow: 'hidden',
    height: '50vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexGrow: 1,
    p: 8,

    '&.opponent': {
      '& .card': {
        // eslint-disable-next-line max-len
        backgroundImage: `url('https://cdn.discordapp.com/attachments/420674357652750367/946485073081946132/Back_copy.png')`,
      },
    },

    '&.me': {
      alignItems: 'flex-start',

      '& .board-container': {
        flexDirection: 'column',
      },

      '& .player-column': {
        flexDirection: 'column',

        '& .player-info': {
          mb: 4,
          mt: 0
        }
      },

      '& .hand': {
        top: 'auto',
        bottom: 0,
        transform: 'translate(-50%, 30%)',
      }
    },

    '& .hand': {
      position: 'absolute',
      top: 0,
      bottom: 'auto',
      left: '50%',
      transform: 'translate(-50%, -30%) rotate(180deg)',
    },
  }

  return (
    <Box className={className} sx={{ ...playerStyles }}>
      <Box className='player-column'
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column-reverse',
          mr: 2,
        }}>
        <Box
          className='player-info'
          sx={{
            width: 240,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 4,
            mt: 4,
            bgcolor: '#060A12',
            borderRadius: '8px'
          }}
        >
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Avatar sx={{ height: 100, width: 100 }} src={player.avatar} />
            <Typography fontWeight='bold' my={2}>{player.id}</Typography>
          </Box>
          <Health hp={hp} />
          <Mana mp={mp} />
        </Box>
        <Junk cards={junk.length} />
      </Box>
      <Box
        className='board-container'
        flexDirection='column-reverse'
        display='flex'
        flexGrow='1'
        mx={8}
        sx={{
          height: '60%',
        }}
      >
        <Board board={board} />
      </Box>
      <Hand mp={mp} hand={hand} onPlay={onPlay} />
      <Box sx={{ width: 200, ml: 8 }}>
        <Deck cards={deck.length} />
      </Box>
    </Box >
  )
}

export default Player