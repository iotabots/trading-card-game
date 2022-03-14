import React from 'react'
import { Box } from '@iotabots/components'
import { useLocation } from 'react-router'
import Menu from './Menu'
import { colors, transition } from '../../styles'
import PlayButton from './PlayButton'

const Navbar: React.FC = () => {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <Box sx={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      height: 125,
      width: '100%',
      backgroundColor: colors.black,
      borderTop: '2px solid',
      borderColor: colors.gold
    }}>
      <Menu />
      <Box sx={{
        position: 'fixed',
        bottom: 40,
        right: 40,
        transform: isHome ? 'scale(1)' : 'scale(0.8)',
        transformOrigin: 'bottom right',
        transition
      }}>
        <PlayButton />
      </Box>
    </Box>
  )
}

export default Navbar