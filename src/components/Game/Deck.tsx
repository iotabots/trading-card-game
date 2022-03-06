/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React from 'react'
import { Box } from '@iotabots/components'
import BackCard from './BackCard'
import { CardStack } from '../../types'
import Button from '../Button'

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
            key={`${item}-${index}`}
          />
        ))}
      </Box>
      <Box display='flex'>
        <Button sx={{
          transform:
            'rotateX(49deg) rotateZ(-32deg) translateX(126px) translateY(-8px)',
          transformStyle: 'preserve-3d',
        }}>
          {cards.size}
        </Button>
      </Box>
    </Box>
  )
}

export default Deck