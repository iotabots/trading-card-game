import React from 'react'
import { Box } from '@mui/material'
import { CardType } from '../types'

interface HandProps {
  hand: CardType[]
  onPlay: (number: number) => void
  mp: number
}

const Hand: React.FC<HandProps> = (props) => {
  const { hand, onPlay, mp } = props
  return (
    <Box
      className='hand'
      width='100%'
      display='flex'
      flexDirection='row'
      justifyContent='center'
      mb={6}
    >
      {hand.length > 0 && hand.flatMap((card, index) => (
        <Box
          onClick={
            mp >= card.mana
              ? () => onPlay(index)
              : () => console.log('error')
          }
          key={card.id}
          sx={{
            backgroundImage: `url(${card.image})`,
            height: '200px',
            width: '160px',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'transparent',
            border: 'none'
          }} />
      ))}
    </Box>
  )
}

export default Hand