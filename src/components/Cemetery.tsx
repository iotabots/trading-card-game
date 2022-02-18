import { Box, Typography } from '@iotabots/components'
import React from 'react'

interface CemeteryProps {
  cards: number
}

const Cemetery: React.FC<CemeteryProps> = (props) => {
  const { cards } = props
  return (
    <Box display='flex'>
      <Typography
        mr={2}
        fontWeight='bold'
        fontSize={12}
        color='text.disabled'
        textTransform='uppercase'
      >
        Cemetery:
      </Typography>
      <Typography
        fontWeight='bold'
        fontSize={12}
        textTransform='uppercase'
      >
        {cards}
      </Typography>
    </Box>
  )
}

export default Cemetery