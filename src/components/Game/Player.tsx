import React from 'react'
import { Avatar, Box, Typography } from '@iotabots/components'
import { BoxProps, SxProps } from '@mui/material'
import Board from './Board'
import Hand from './Hand'
import Deck from './Deck'
import Junk from './Junk'
import { CardStack, PlayerType } from '../../types'
import { GameContext } from '../../contexts/GameContext'
import healthImage from '../../icons/Health.png'
import manaImage from '../../icons/Mana.png'

interface PlayerProps extends BoxProps {
  player: PlayerType | undefined
  me: boolean
}

const Player: React.FC<PlayerProps> = (props) => {
  const { player, className, me } = props
  const { onPlayCard } = React.useContext(GameContext)
  const [health, setHealth] = React.useState<number>(0)
  const [mana, setMana] = React.useState(0)
  const [deck] = React.useState(player?.deck)
  const [hand, setHand] = React.useState<CardStack | undefined>(undefined)
  const [board, setBoard] = React.useState<CardStack | undefined>(undefined)
  const [junk, setJunk] = React.useState<CardStack | undefined>(undefined)

  React.useEffect(() => {
    setHealth(Number(player?.health))
    setMana(Number(player?.mana || 0))
    setHand(player?.hand)
    setBoard(player?.botZone)
    setJunk(player?.junk)
  }, [player])

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
            <Box sx={{
              position: 'relative'
            }}>
              <Avatar
                sx={{ height: 100, width: 100 }}
                src='https://assets.iotabots.io/compressed/1.png'
              />
              <Box sx={{
                position: 'absolute',
                bottom: -16,
                left: -16,
                zIndex: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url(${healthImage})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: 50,
                width: 50,
              }}>
                <Typography sx={{
                  textAlign: 'center',
                  fontWeight: 900,

                }}>{health}</Typography>
              </Box>
              <Box sx={{
                position: 'absolute',
                bottom: -16,
                right: -16,
                zIndex: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url(${manaImage})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: 50,
                width: 50,
              }}>
                <Typography sx={{
                  textAlign: 'center',
                  fontWeight: 900,

                }}>{mana}</Typography>
              </Box>
            </Box>
            <Typography fontWeight='bold' my={2} mt={5}>
              {`${player?.addr.substring(0, 5)}...${player?.addr.substring(
                // eslint-disable-next-line
                player?.addr.length - 3,
                player?.addr.length
              )}`}
            </Typography>
          </Box>
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
        {board && (
          <Board
            board={board}
            me={me}
          />
        )}
      </Box>
      <Hand
        mana={mana}
        hand={hand}
        onPlayCard={(cardId: number) => onPlayCard(cardId)}
      />
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
    zIndex: 10000000,
    bottom: 'auto',
    left: '50%',
    transform: 'translate(-50%, -30%) rotate(180deg)',
  },
}