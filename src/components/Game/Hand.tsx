/* eslint-disable max-len */
import React from 'react'
import { Box } from '@mui/material'
import { CardStack } from '../../types'
import { transition } from '../../styles'

interface HandProps {
  hand: CardStack | undefined
  mana: number
  onPlayCard: (cardId: number) => Promise<void>
}

const Hand: React.FC<HandProps> = (props) => {
  const { hand, mana, onPlayCard } = props
  const [filteredHand, setFilteredHand] =
    React.useState<string[]>([])

  React.useEffect(() => {
    let deck: string[] = ['']
    if (hand) {
      deck = hand.cards.filter((card: string) => card !== '0')
    }
    setFilteredHand(deck)
  }, [hand])

  return (
    <Box
      className='hand'
      width='100%'
      display='flex'
      flexDirection='row'
      justifyContent='center'
      mb={6}
    >
      {filteredHand && hand && filteredHand.flatMap((card, index) => {
        let cardAngle
        let translateX = 0
        let translateY = 0
        const length = Number(hand.size)
        const angle = 5 + (length * 0.1)
        const sideElements = Math.floor(length / 2)
        const increment = angle / sideElements
        translateX = increment * (sideElements - index)
        if (index < sideElements) {
          cardAngle = -(increment * (sideElements - index))
          translateY = 20 * (sideElements - index)
        } else if (index > sideElements - 1) {
          cardAngle = (increment * (sideElements - (length - index) + 1))
          translateY = 20 * (sideElements - (length - index) + 1)
        }
        return (
          <Box
            className='card'
            onClick={
              mana >= 0
                ? () => onPlayCard(Number(card))
                // eslint-disable-next-line no-console
                : () => console.log('error')
            }
            key={card}
            sx={{
              backgroundImage: `url(https://assets.iotabots.io/tcg/${card}.png)`,
              height: '200px',
              width: '160px',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition,
              transformOrigin: 'bottom center',
              transform:
                `
                  rotate(${cardAngle}deg) 
                  translate(${translateX * 4}px, ${translateY}px)
                `,
              '&:hover': {
                transform: 'translateY(calc(-30% - 4px)) scale(1.2)'
              }
            }}
          />
        )
      })}
    </Box>
  )
}

export default Hand