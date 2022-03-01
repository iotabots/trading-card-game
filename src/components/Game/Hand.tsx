/* eslint-disable max-len */
import React from 'react'
import { Box } from '@mui/material'
import { CardStack } from '../../types'

interface HandProps {
  hand: CardStack
  mp: string
}

const Hand: React.FC<HandProps> = (props) => {
  const { hand, mp } = props
  return (
    <Box
      className='hand'
      width='100%'
      display='flex'
      flexDirection='row'
      justifyContent='center'
      mb={6}

    >
      {parseInt(hand.size, 2) > 0 && hand.cards.flatMap((card, index) => {
        let cardAngle
        let translateX = 0
        let translateY = 0
        const angle = 15
        const length = parseInt(hand.size, 2)
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
              parseInt(mp, 2) >= 0
                ? () => console.log('onPlay')
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
              transition: 'all ease-in-out 200ms',
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