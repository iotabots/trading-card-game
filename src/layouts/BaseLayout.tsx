import { Box, Navigation } from '@iotabots/components'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const BaseLayout: React.FC = ({ children }) => {
  const navigate = useNavigate()
  const MENU = [
    {
      label: 'Collection',
      onClick: () => navigate('/'),
    },
    {
      label: 'Game',
      onClick: () => navigate('/game'),
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
        position: 'relative',
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
