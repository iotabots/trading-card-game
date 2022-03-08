import React from 'react'
import { Box, Typography } from '@iotabots/components'
import defaultCoin from '../../icons/coin.png'
import premiumCoin from '../../icons/coin-rare.png'

interface CurrencyProps {
  type: 'default' | 'premium'
  value: string
}

const Currency: React.FC<CurrencyProps> = ({ type, value }) => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    marginLeft: '40px'
  }}>
    <Box sx={{
      backgroundImage: `url(${type === 'default' ? defaultCoin : premiumCoin})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      height: 32,
      width: 32,
      mr: 1
    }} />
    <Typography fontWeight='bold'>{value}</Typography>
  </Box>
)

export default Currency