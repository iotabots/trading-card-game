import React from 'react'
import { Box, Typography } from '@iotabots/components'

interface JunkProps {
  cards: number
}

const Junk: React.FC<JunkProps> = (props) => {
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
        Junk:
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

export default Junk