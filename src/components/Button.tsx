/* eslint-disable max-len */
import React from 'react'
import { Box } from '@mui/material'
import { BoxProps } from '@mui/system'

const Button: React.FC<BoxProps> = (props) => {
  const { children, sx } = props
  return (
    <Box
      {...props}
      sx={{
        ...sx,
        border: 'none',
        height: 42,
        display: 'flex',
        cursor: 'pointer',
      }}
    >
      <Box sx={{
        height: 42,
        width: 18,
        backgroundImage: `url(https://cdn.discordapp.com/attachments/499229928168882218/949976211101196378/edge-left.png)`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }} />
      <Box sx={{
        height: 'inherit',
        backgroundImage: `url(https://cdn.discordapp.com/attachments/499229928168882218/949975287460929596/buttonCore.png)`,
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat-x',
        px: 3,
        display: 'flex',
        alignItems: 'center',
        textTransform: 'none',
        fontWeight: 800
      }}>
        {children}
      </Box>
      <Box sx={{
        height: 42,
        width: 18,
        backgroundImage: `url(https://cdn.discordapp.com/attachments/499229928168882218/949976211101196378/edge-left.png)`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        transform: 'rotate(180deg)'
      }} />
    </Box>
  )
}

export default Button