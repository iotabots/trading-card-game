import React from 'react'
import { Box, Typography } from '@iotabots/components'
import { LinearProgress } from '@mui/material'
import Arrow from '../icons/Arrow'
import Highlight from '../icons/Highlight'

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
  const [count, setCount] = React.useState(0)
  const [countInTimeout, setCountInTimeout] = React.useState(0)
  const countRef = React.useRef(count)
  countRef.current = count

  const getCountTimeout = (): void => {
    setTimeout(() => {
      setCountInTimeout(countRef.current)
    }, 2000)
  }

  React.useEffect(() => {
    setTimeout(() => {
      setCountInTimeout(count) // count is 0 here
    }, 3000)
    setCount(5) // Update count to be 5 after timeout is scheduled
  }, [])


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
        top: '50%',
        left: 0,
        pl: 4,
        display: 'flex',
        transform: 'translateY(-50%)',
        flexDirection: 'row',
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
          <Typography variant='h5'>{countInTimeout}</Typography>
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
        display='flex'
        alignItems='center'
        position='relative'
        zIndex={1}
        ml={-5}
        pl={5}
        width='120px'
        height='40px'
        boxSizing='border-box'
        sx={{
          bgcolor: myTurn ? 'primary.main' : '#070A10',
          borderTopRightRadius: '8px',
          borderBottomRightRadius: '8px'
        }}
      >
        <Typography fontWeight='bold'>{title}</Typography>
      </Box>
      <LinearProgress
        value={80}
        sx={{
          position: 'absolute',
          left: 200,
          width: 'calc(100vw - 200px)',
          '&.MuiLinearProgress-root': {
            bgcolor: 'rgba(0,0,0,0.5)'
          }
        }}
      />
    </Box >
  )
}

export default Round