import React from 'react'
import { Box, Typography } from '@iotabots/components'
import Arrow from '../../icons/Arrow'
import Highlight from '../../icons/Highlight'
import ButtonImage from '../../icons/Button.png'

interface RoundProps {
  number: number
  title: string
  currentPlayer: string
  setCurrentPlayer: (player: string) => void
  setRound: (number: number) => void
  phase: number
  setPhase: (number: number) => void
}

const Round: React.FC<RoundProps> = (props) => {
  const {
    number,
    title,
    currentPlayer,
    setRound,
    phase,
    setPhase,
    setCurrentPlayer
  } = props
  const myTurn = currentPlayer === 'player'
  const [count] = React.useState(0)

  const onNextPhase = (): void => {
    if (phase < 4) {
      setPhase(phase + 1)
    } else {
      setPhase(0)
      setRound(number + 1)
      setCurrentPlayer(myTurn ? 'opponent' : 'player')
    }
  }

  return (
    <Box
      onClick={onNextPhase}
      sx={{
        position: 'fixed',
        zIndex: 11,
        top: '50%',
        right: 40,
        pl: 4,
        display: 'flex',
        transform: 'translateY(-50%)',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        '&:hover': {
          cursor: 'pointer'
        }
      }}
    >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        position='relative'
        zIndex={2}
        sx={{
          height: 84,
          width: 84,
        }}
      >
        <Box display='flex'
          alignItems='center'
          justifyContent='center'
          sx={{
            borderRadius: '50%',
            height: 60,
            width: 60,
            transition: 'all ease-in-out 0.3s',
            bgcolor: myTurn ? 'primary.main' : '#070A10',
            borderStyle: 'solid',
            borderWidth: '4px',
            borderColor: myTurn ? 'rgba(0,0,0,0.5)' : 'background.paper',
          }}>
          <Typography variant='h5'>{count}</Typography>
        </Box>
        <Box position='absolute'
          top={0}
          left={0}
          sx={{
            '& svg': {
              transform: myTurn
                ? 'rotate(0deg)'
                : 'rotate(180deg)',
              transformOrigin: 'center center',
              position: 'absolute',
              transition: 'all ease-in-out 0.3s'
            }
          }}>
          <Arrow />
          <Box sx={{
            opacity: myTurn ? '1' : '0.25'
          }}>
            <Highlight />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 250,
          height: 65,
          mt: 4,
          backgroundImage: `url(${ButtonImage})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Typography variant='h6'
          fontWeight='bold'
          sx={{
            mb: '20px',
          }}>
          {title}
        </Typography>
      </Box>

    </Box >
  )
}

export default Round