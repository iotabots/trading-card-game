import React from 'react'
import { Box, Typography } from '@iotabots/components'
import BadgeIcon from '../../icons/Badge'

const Badge: React.FC = ({ children }) => (
  <Box sx={{
    position: 'relative',
  }}>
    <Typography sx={{
      position: 'absolute',
      zIndex: 4,
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: 12
    }}
      fontWeight={900}>{children}</Typography>
    <BadgeIcon />
  </Box>
)

export default Badge