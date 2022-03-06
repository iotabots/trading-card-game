import React, { Dispatch, SetStateAction } from 'react'
import { Box, Typography } from '@iotabots/components'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { Button, IconButton } from '@mui/material'
import { DeckItemType, DeckType } from '../../types'
import DeckItem from './DeckItem'
import { countDeck } from '../../utils/countDeck'

interface EditDeckProps {
  deck: DeckType
  setSelectedDeck: Dispatch<SetStateAction<number | undefined>>
  setDeck: Dispatch<SetStateAction<DeckType>>
}

const EditDeck: React.FC<EditDeckProps> = (props) => {
  const { deck, setSelectedDeck, setDeck } = props
  const [cards, setCards] = React.useState(deck.cards)

  const count = countDeck(cards)

  const changeCount = (
    id: string,
    number: number
  ): void => {
    const updatedCards = cards.map((item): DeckItemType => {
      const updatedItem = item
      if (updatedItem.id === id) {
        if (number > 0 && item.count < 4 && count < 33) {
          updatedItem.count += number
        } else if (number < 0 && item.count > 0) {
          updatedItem.count += number
        }
      }
      return updatedItem
    })
    setCards([
      ...updatedCards,
    ])
  }

  const onSave = (): void => {
    if (count === 33) {
      setSelectedDeck(undefined)
      setDeck({
        ...deck,
        cards
      })
    }
  }

  return (
    <Box sx={{
      bgcolor: 'rgba(0,0,0,0.5)',
      borderRadius: '8px',
      p: 4,
      maxHeight: 'calc(100vh - 200px)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 4
      }}>
        <Box display='flex' flexDirection='column' flexGrow={1}>
          <Typography variant='h6'>{deck.name}</Typography>
          <Box display='flex'>
            <Typography variant='body2'>{count}</Typography>
            <Typography color='text.secondary' variant='body2'>
              / 33
            </Typography>
          </Box>
        </Box>
        <IconButton
          color='error'
          onClick={() => setSelectedDeck(undefined)}
          sx={{
            ml: 4
          }}>
          <DeleteRoundedIcon />
        </IconButton>
      </Box>
      <Box sx={{
        overflowY: 'auto',
        flexGrow: 1,
      }}>
        {cards.map((card, index) => (
          <DeckItem
            // eslint-disable-next-line react/no-array-index-key
            key={`${card.id}-${index}`}
            id={card.id}
            mana={card.mana}
            name={card.name}
            count={card.count}
            changeCount={changeCount}
          />
        ))}
      </Box>
      <Box display='flex' mt={4}>
        <Button
          onClick={onSave}
          fullWidth
          sx={{ ml: 2 }}
          variant='contained'
          color='success'
          size='small'
          startIcon={<CheckRoundedIcon />}
        >
          Save Deck
        </Button>
      </Box>
    </Box>
  )
}

export default EditDeck