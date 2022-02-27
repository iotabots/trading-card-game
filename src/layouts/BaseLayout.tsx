import { Box, Navigation } from '@iotabots/components'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const BaseLayout: React.FC = ({ children }) => {
  const navigate = useNavigate()
  const MENU = [
    {
      label: 'Game',
      onClick: () => navigate('/'),
    },
    {
      label: 'Collection',
      onClick: () => navigate('/collection'),
    },
    {
      label: 'History',
      onClick: () => navigate('/history'),
    },
  ]
  return (
    <Box
      pt={10}
      sx={{
        '& .MuiAppBar-root': {
          top: 20,
          left: 20,
          width: 'calc(100% - 40px)',
        },
      }}
    >
      <Navigation identity menu={MENU} mobileMenu={MENU} />
      {children}
    </Box>
  )
}

export default BaseLayout
