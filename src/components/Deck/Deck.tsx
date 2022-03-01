/* eslint-disable max-len */
import React from 'react'
import { Box, Typography } from '@iotabots/components'
import BackCard from '../Game/BackCard'
import { CardStack } from '../../types'

interface DeckProps {
  cards: CardStack
}

const Deck: React.FC<DeckProps> = (props) => {
  const { cards } = props

  const deck = cards.cards.filter((card: string) => card !== '0')

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
          {deck.length}
        </Typography>
      </Box>
    </Box>
  )
}

export default Deck