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
    <Box sx={{ pt: '160px' }}>
      {children}
    </Box>
    <Navbar />
  </Box>
)

export default MenuLayout