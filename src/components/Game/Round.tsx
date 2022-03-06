import React from 'react'
import { Box, Typography } from '@iotabots/components'
import Arrow from '../../icons/Arrow'
import Highlight from '../../icons/Highlight'
import { GameContext } from '../../contexts/GameContext'
import { transition } from '../../styles'
import Button from '../Button'
import Deploy from '../../icons/Deploy'
import Fight from '../../icons/Fight'

interface RoundProps {
  turn: number
  phaseId: string
}

interface Phase {
  value: string
  label: string
  callback: (() => void) | null
}

const Round: React.FC<RoundProps> = (props) => {
  const { turn, phaseId } = props
  const {
    onNextPhase,
    onStartFight,
    onEndFightPhase,
    onEndTurn,
    myTurn
    // updateGameState
  } = React.useContext(GameContext)

  let phase: Phase = {
    value: '',
    label: '',
    callback: null
  }

  const round = Math.ceil(turn / 2)
  // const round = turn

  switch (phaseId) {
    case '1':
      phase = {
        value: 'draw',
        label: 'Draw',
        callback: onNextPhase
      }
      break

    case '2':
      phase = {
        value: 'play',
        label: 'Start Fight',
        callback: onStartFight
      }
      break

    case '3':
      phase = {
        value: 'fight',
        label: 'End Fight',
        callback: onEndFightPhase
      }
      break

    case '4':
      phase = {
        value: 'play',
        label: 'End Turn',
        callback: onEndTurn
      }
      break

    default:
      phase = {
        value: 'connect',
        label: 'Connecting...',
        callback: onNextPhase
      }
      break
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 11,
        top: '50%',
        left: 40,
        pl: 4,
        width: 'calc(100% - 120px)',
        display: 'flex',
        transform: 'translateY(-50%)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        '&:hover': {
          cursor: 'pointer'
        }
      }}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2,
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
              transition,
              bgcolor: myTurn ? 'primary.main' : '#1D2945',
              borderStyle: 'solid',
              borderWidth: '3px',
              borderColor: 'rgba(0,0,0,0.5)',
              boxShadow: '0 0 0 2px #A0A7C1'
            }}>
            <Typography variant='h5'>{`${String(round)}`}</Typography>
          </Box>
          <Box position='absolute'
            top={0}
            left={0}
            sx={{
              '& svg': {
                transform: myTurn
                  ? 'rotate(0deg) scale(1.1)'
                  : 'rotate(180deg) scale(1.1)',
                transformOrigin: 'center center',
                position: 'absolute',
                transition
              }
            }}>
            <Arrow />
            <Box sx={{
              opacity: myTurn ? '1' : '1'
            }}>
              <Highlight />
            </Box>
          </Box>
        </Box>
        <Button sx={{ ml: -7 }}>
          <Box sx={{
            width: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            ml: 3,
            '& svg': {
              color: 'text.secondary',
              opacity: 0.33
            },
            '& .active': {
              '& svg': {
                opacity: 1,
                color: 'common.white'
              }
            }
          }}>
            <Box
              className={`${phase.label === 'Start Fight' && 'active'}`}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Deploy />
            </Box>
            <Box
              className={`${phase.label === 'End Fight' && 'active'}`}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Fight />
            </Box>
            <Box
              className={`${phase.label === 'End Turn' && 'active'}`}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Deploy />
            </Box>
          </Box>
        </Button>
      </Box>
      <Box sx={{
        flexGrow: 1,
        bgcolor: '#060A12',
        height: 6,
        display: 'flex',
        alignItems: 'center'
      }}>
        <Box sx={{
          width: '50%',
          bgcolor: 'white',
          height: 2,
          borderRadius: 4
        }} />
      </Box>
      {myTurn && (
        <Button
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick={phase.callback as any} // onNextPhase
        >
          {phase.label}
        </Button>
      )}
    </Box >
  )
}

export default Round