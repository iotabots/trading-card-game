import React from 'react'
import { Box, Typography } from '@iotabots/components'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { colors, flexRowBetween, transition } from '../../styles'
import { DeckType } from '../../types'
import { DecksContext } from '../../contexts/DecksContext'

const DeckBox: React.FC<DeckType> = (props) => {
  const { name, id } = props
  const { setEdit } = React.useContext(DecksContext)

  const onClick = (): void => {
    setEdit(id)
  }

  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        bgcolor: colors.dark,
        p: 3,
        mt: 4,
        mb: 2,
        width: '100%',
        height: 80,
        borderRadius: '8px',
        border: '2px solid',
        borderColor: colors.gold,
        overflow: 'hidden',
        cursor: 'pointer',
        ...flexRowBetween,
        transition,
        '&:hover': {
          '& .name': {
            left: 20,
            transform: 'translate(0%,-50%)'
          },
          '& .edit': {
            opacity: 1,
          }
        }
      }}>
      <Box
        className='name'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          transition
        }}
      >
        <Typography fontSize={18} fontWeight='bold' color={colors.goldLight}>
          {name}
        </Typography>
      </Box>
      <Box
        className='edit'
        sx={{
          position: 'absolute',
          top: '50%',
          right: 16,
          transform: 'translate(0, -40%)',
          color: colors.goldLight,
          transition,
          opacity: 0,
        }}>
        <ArrowForwardRoundedIcon />
      </Box>
    </Box>
  )
}

export default DeckBox