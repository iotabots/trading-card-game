import React from 'react'
import { Box, Typography } from '@iotabots/components'
import Arrow from '../../icons/Arrow'
import Highlight from '../../icons/Highlight'
import ButtonImage from '../../icons/Button.png'

interface RoundProps {
  round: string
  phaseId: string
  nextPhase: () => void
  startFight: () => void
  endFightPhase: () => void
  endTurn: () => void
}

const Round: React.FC<RoundProps> = (props) => {
  const {
    round,
    phaseId,
    nextPhase,
    startFight,
    endFightPhase,
    endTurn
  } = props
  const myTurn = 'player'

  interface Phase {
    value: string
    label: string
    callback: (() => void) | null
  }

  let phase: Phase = {
    value: '',
    label: '',
    callback: null
  }

  switch (phaseId) {
    case '1':
      console.log('draw')
      phase = {
        value: 'draw',
        label: 'Draw',
        callback: nextPhase
      }
      break

    case '2':
      console.log('play')
      phase = {
        value: 'play',
        label: 'Start Fight',
        callback: startFight
      }
      break

    case '3':
      console.log('attack')
      phase = {
        value: 'fight',
        label: 'End Fight',
        callback: endFightPhase
      }
      break

    case '4':
      console.log('end')
      phase = {
        value: 'play',
        label: 'End Turn',
        callback: endTurn
      }
      break

    default:
      phase = {
        value: 'connect',
        label: 'Connecting...',
        callback: nextPhase
      }
      break
  }

  return (
    <Box
      onClick={phase.callback as any} // onNextPhase
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
          <Typography variant='h5'>{round}</Typography>
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
          {phase.label}
        </Typography>
      </Box>

    </Box >
  )
}

export default Round