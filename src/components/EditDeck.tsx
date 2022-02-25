import React, { Dispatch, SetStateAction } from 'react'
import { Box, IconButton, Typography } from '@iotabots/components'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { DeckType } from '../types'

interface EditDeckProps {
  deck: DeckType
  setSelectedDeck: Dispatch<SetStateAction<number | undefined>>
}

const EditDeck: React.FC<EditDeckProps> = (props) => {
  const { deck, setSelectedDeck } = props

  let count = 0
  for (let index = 0; index < deck.cardsNext.length; index += 1) {
    const element = deck.cardsNext[index]
    count += element.count
  }

  return (
    <Box sx={{
      bgcolor: 'rgba(0,0,0,0.5)',
      borderRadius: '8px',
      p: 4
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 4
      }}>
        <Box display='flex' flexDirection='column' flexGrow={1}>
          <Typography variant='h6'>{deck.name}</Typography>
          <Typography variant='body2'>{count}</Typography>
        </Box>
        <IconButton
          color='error'
          onClick={() => setSelectedDeck(undefined)}
          sx={{
            ml: 4
          }}>
          <CloseRoundedIcon />
        </IconButton>
        <IconButton
          color='success'
          onClick={() => console.log('Create Deck')}
          sx={{
            ml: 4
          }}>
          <CheckRoundedIcon />
        </IconButton>
      </Box>
      {deck.cardsNext.map((card) => (
        <Box display='flex'>
          <Box>{card.id} -</Box>
          <Box>- {card.count}</Box>
        </Box>
      ))}
    </Box>
  )
}

export default EditDeck