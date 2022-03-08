import React from 'react'
import { Box } from '@iotabots/components'
import Menu from './Menu'
import { colors } from '../../styles'
import PlayButton from './PlayButton'

const Navbar: React.FC = () => (
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
    }}>
      <PlayButton />
    </Box>
  </Box>
)

export default Navbar