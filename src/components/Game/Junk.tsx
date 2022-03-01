import React from 'react'
import { Box, Typography } from '@iotabots/components'
import JunkIcon from '../../icons/Junk'

interface JunkProps {
  cards: string
}

const Junk: React.FC<JunkProps> = (props) => {
  const { cards } = props
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      bgcolor: '#060A12',
      p: 4
    }}>
      <JunkIcon />
      <Typography
        variant='h3'
        sx={{
          textTransform: 'uppercase',
          m: 0,
          mt: 1,
          ml: 4
        }}
      >
        {cards}
      </Typography>
    </Box>
  )
}

export default Junk