/* eslint-disable max-len */
import { Box } from '@iotabots/components'
import { BoxProps } from '@mui/material'
import React from 'react'

const BackCard: React.FC<BoxProps> = (props) => (
  <Box
    {...props}
    sx={{
      position: 'absolute',
      height: 200,
      width: 142,
      bottom: 'auto',
      backgroundImage: 'url(https://cdn.discordapp.com/attachments/420674357652750367/946485073081946132/Back_copy.png)',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      transform: 'rotateX(51deg) rotateZ(-32deg)',
      transformStyle: 'preserve-3d',
      borderRadius: '8px',
      boxShadow: '1px 1px 0 1px #f9f9fb, -1px 0 8px 0 rgba(34, 33, 81, 0.01), 8px 8px 8px 0 rgba(34, 33, 81, 0.25)',
      transition: '0.4s ease-in-out all, 0.4s ease-in-out box-shadow',
      '&.active:hover': {
        transform: 'translate3d(4px, 0px, 0px)',
      }
    }}
  />
)

export default BackCard