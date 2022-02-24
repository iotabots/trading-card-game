import { Box, Navigation } from '@iotabots/components'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const BaseLayout: React.FC = ({ children }) => {
  const navigate = useNavigate()
  const MENU = [
    {
      label: 'Game',
      onClick: () => navigate('/')
    },
    {
      label: 'Collection',
      onClick: () => navigate('/collection')
    }
  ]
  return (
    <Box p={6} pt={11}>
      <Navigation
        identity
        menu={MENU}
        mobileMenu={MENU}
      />
      {children}
    </Box>
  )
}

export default BaseLayout