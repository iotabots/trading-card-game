/* eslint-disable max-len */
import React from 'react'
import { Box, Typography } from '@iotabots/components'
import BackCard from '../Game/BackCard'

interface DeckProps {
  cards: number
}

const Deck: React.FC<DeckProps> = (props) => {
  const { cards } = props
  const deck = []
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < cards; i++) {
    deck.push(i)
  }
  return (
    <Box sx={{
      width: 142,
      mt: '80px'
    }}>
      <Box sx={{
        height: 200,
        width: 142,
        position: 'relative'
      }}>
        {deck.map((item, index) => (
          <BackCard
            top={`-${index * 2}px`}
            key={item}
            className={index === deck.length - 1 ? 'active' : ''}
          />
        ))}
      </Box>
      <Box display='flex'>
        <Typography
          mr={2}
          fontWeight='bold'
          fontSize={12}
          color='text.disabled'
          textTransform='uppercase'
        >
          Deck:
        </Typography>
        <Typography
          fontWeight='bold'
          fontSize={12}
          textTransform='uppercase'
        >
          {cards}
        </Typography>
      </Box>
    </Box>
  )
}

export default Deck