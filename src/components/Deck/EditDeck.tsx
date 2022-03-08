import React from 'react'
import { Box, Typography } from '@iotabots/components'
import { DeckItemType, DeckType } from '../../types'
import DeckItem from './DeckItem'
import { countDeck } from '../../utils/countDeck'
import { colors } from '../../styles'
import Button from '../Button'
import { DecksContext } from '../../contexts/DecksContext'

const EditDeck: React.FC = () => {
  const { edit, setEdit, decks, setDecks } = React.useContext(DecksContext)
  const [deck, setDeck] =
    React.useState<DeckType | undefined>(decks[Number(edit)] || undefined)

  if (deck !== undefined && edit !== undefined) {
    const count = countDeck(deck.cards)

    const changeCount = (
      id: string,
      number: number
    ): void => {
      const updatedCards = deck?.cards.map((item): DeckItemType => {
        const updatedItem = item
        if (updatedItem.id === id) {
          if (number > 0 && item.count < 3 && count < 33) {
            updatedItem.count += number
          } else if (number < 0 && item.count > 0) {
            updatedItem.count += number
          }
        }
        return updatedItem
      })
      setDeck({
        id: deck?.id,
        name: deck?.name,
        cards: updatedCards
      })
      const newDecks = decks.splice(edit, 1, deck)
      setDecks(newDecks)
    }

    const onSave = (): void => {
      if (count === 33) {
        setEdit(undefined)
        setDecks(decks.splice(edit, 1, deck))
      }
    }
    return (
      <Box sx={{
        position: 'sticky',
        bgcolor: colors.black,
        border: '2px solid',
        borderColor: colors.gold,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        maxHeight: 'calc(100vh - 400px)',
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 0,
          p: 5
        }}>
          <Box display='flex' flexDirection='column' flexGrow={1}>
            <Typography variant='h5' color={colors.goldLight}>
              {deck.name}
            </Typography>
          </Box>
          <Box display='flex'>
            <Typography
              variant='body2'
              color={colors.goldLight}
              fontWeight='bold'
              mr={2}
            >
              {`${count}`}
            </Typography>
            <Typography color='text.secondary' variant='body2'>
              / 33
            </Typography>
          </Box>
        </Box>
        <Box sx={{
          overflowY: 'auto',
          flexGrow: 1,
          px: 3,
          pb: 2,
        }}>
          {deck.cards.map((card, index) => (
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
        <Box display='flex' justifyContent='center' p={4}>
          <Button onClick={onSave}>
            Save Deck
          </Button>
        </Box>
      </Box >
    )
  }
  return <Box />
}

export default EditDeck