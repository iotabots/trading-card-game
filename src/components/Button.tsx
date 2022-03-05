import React from 'react'
import { ButtonProps, Button as MuiButton } from '@mui/material'
import buttonCore from '../icons/button-inner.svg'

const Button: React.FC<ButtonProps> = (props) => {
  const { sx } = props
  return (
    <MuiButton {...props}> sx={{
      background: 'transparent !important',
      border: 'none',
      height: 38,
      backgroundImage: `url(${buttonCore})`,
      ...sx,
    }}
      Button
    </MuiButton>
  )
}

export default Button