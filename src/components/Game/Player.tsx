import React from 'react'
import { Avatar, Box, Typography } from '@iotabots/components'
import { BoxProps, SxProps } from '@mui/material'
import Health from './Health'
import Mana from './Mana'
import Board from './Board'
import Hand from './Hand'
import Deck from '../Deck/Deck'
import Junk from './Junk'
import { PlayerType } from '../../types'

interface PlayerProps extends BoxProps {
  player: PlayerType | undefined
}

const Player: React.FC<PlayerProps> = (props) => {
  const { player, className } = props
  const [health] = React.useState<number>(Number(player?.health))
  const [mana] = React.useState(Number(player?.mana || 0))
  const [deck] = React.useState(player?.deck)
  const [hand] = React.useState(player?.hand)
  const [board] = React.useState(player?.botZone)
  const [junk] = React.useState(player?.junk)

  return (
    <Box className={className} sx={{ ...playerStyles }}>
      <Box
        className='player-column'
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column-reverse',
          mr: 2,
        }}
      >
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
            borderRadius: '8px',
          }}
        >
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Avatar
              sx={{ height: 100, width: 100 }}
              src='https://assets.iotabots.io/compressed/1.png'
            />
            <Typography fontWeight='bold' my={2}>
              {`${player?.addr.substring(0, 5)}...${player?.addr.substring(
                // eslint-disable-next-line
                player?.addr.length - 3,
                player?.addr.length
              )}`}
            </Typography>
          </Box>
          {health && <Health health={health} />}
          {health && <Mana mana={mana} />}
        </Box>
        {junk && <Junk cards={junk} />}
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
        {board && <Board board={board} />}
      </Box>
      <Hand mana={mana} hand={hand} />
      {/* {(mana && hand) ? <Hand mana={mana} hand={hand} /> : <Box />} */}
      <Box sx={{ width: 200, ml: 8 }}>{deck && <Deck cards={deck} />}</Box>
    </Box >
  )
}

export default Player

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
        mt: 0,
      },
    },

    '& .hand': {
      top: 'auto',
      bottom: 0,
      transform: 'translate(-50%, 30%)',
    },
  },

  '& .hand': {
    position: 'absolute',
    top: 0,
    bottom: 'auto',
    left: '50%',
    transform: 'translate(-50%, -30%) rotate(180deg)',
  },
}