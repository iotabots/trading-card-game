import React from 'react'
import { Box } from '@mui/material'
import { BoxProps } from '@mui/system'
import buttonCore from '../icons/button-inner.svg'

const Button: React.FC<BoxProps> = (props) => {
  const { sx } = props
  return (
    <Box {...props}> sx={{
      background: 'transparent !important',
      border: 'none',
      height: 38,
      backgroundImage: `url(${buttonCore})`,
      ...sx,
    }}
      Button
    </Box>
  )
}

export default Button