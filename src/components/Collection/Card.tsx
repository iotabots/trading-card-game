import React from 'react'
import { Box } from '@iotabots/components'
import { BoxProps } from '@mui/material'

interface CardProps extends BoxProps {
  number: number
}

const Card: React.FC<CardProps> = ({ sx, number }) => (
  <Box
    sx={{
      ...sx,
      backgroundImage:
        `url(https://assets.iotabots.io/tcg/${number})`,
      height: '200px',
      width: '100%',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'transparent',
      backgroundPosition: 'center',
      border: 'none',
    }} />
)

export default Card