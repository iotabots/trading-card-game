import React from 'react'
import { Box } from '@iotabots/components'
import bgImage from '../icons/bg.png'
import Header from '../components/Menu/Header'
import Navbar from '../components/Menu/Navbar'

const MenuLayout: React.FC = ({ children }) => (
  <Box sx={{
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }}>
    <Header />
    <Box sx={{
      position: 'fixed',
      top: 80,
      left: 0,
      width: '100%',
      pt: '80px',
      pb: '40px',
      height: 'calc(100vh - 205px)',
      overflowY: 'scroll'
    }}>
      {children}
    </Box>
    <Navbar />
  </Box>
)

export default MenuLayout