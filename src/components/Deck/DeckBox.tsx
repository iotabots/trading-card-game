import React, { Dispatch, SetStateAction } from 'react'
import { Box, Typography } from '@iotabots/components'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { IconButton } from '@mui/material'
import { flexRowBetween, transition } from '../../styles'
import { DeckType } from '../../types'

interface DeckBoxProps extends DeckType {
  setSelectedDeck: Dispatch<SetStateAction<number | undefined>>
}

const DeckBox: React.FC<DeckBoxProps> = (props) => {
  const { name, id, setSelectedDeck, cards } = props

  const onClick = (): void => {
    setSelectedDeck(id)
  }

  let count = 0
  for (let index = 0; index < cards.length; index += 1) {
    const element = cards[index]
    count += element.count
  }

  return (
    <Box sx={{
      bgcolor: 'rgba(255,255,255,0.05)',
      p: 3,
      mt: 4,
      borderRadius: '8px',
      ...flexRowBetween,
      transition,
      '& .edit': {
        transition,
        opacity: 0,
        transform: 'translateY(-8px)',
      },
      '&:hover': {
        bgcolor: 'background.paper',
        '& .edit': {
          opacity: 1,
          transform: 'translateY(0px)',
        }
      }
    }}>
      <Box>
        <Typography fontWeight='bold'>{name}</Typography>
        <Typography color='text.secondary'>
          {`${count} / 33`}
        </Typography>
      </Box>
      <IconButton
        color='primary'
        onClick={onClick}
        sx={{
          ml: 4
        }}>
        <EditRoundedIcon />
      </IconButton>
    </Box>
  )
}

export default DeckBox