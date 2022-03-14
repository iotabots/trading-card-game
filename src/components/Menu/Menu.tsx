import { Box, Typography } from '@iotabots/components'
import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import CollectionIcon from '../../icons/CollectionIcon'
import HistoryIcon from '../../icons/HistoryIcon'
import HomeIcon from '../../icons/HomeIcon'
import ShopIcon from '../../icons/ShopIcon'
import { colors, transition } from '../../styles'

const MENU = [
  {
    label: 'Home',
    icon: <HomeIcon />,
    link: '/'
  },
  {
    label: 'Collection',
    icon: <CollectionIcon />,
    link: '/collection'
  },
  {
    label: 'Shop',
    icon: <ShopIcon />,
    link: '/shop'
  },
  {
    label: 'History',
    icon: <HistoryIcon />,
    link: '/history'
  },
]

const Menu: React.FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <Box sx={{
      display: 'flex',
      p: '20px'
    }}>
      {MENU.map(({ label, icon, link }) => {
        const active = pathname === link
        return (
          <Box
            onClick={() => navigate(link)}
            sx={{
              width: 180,
              height: 85,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              backgroundColor:
                active ? 'rgba(255,255,255,0.03)' : 'transparent',
              mr: 4,
              cursor: 'pointer',
              transition,
              '&:hover': {
                transform: 'translateY(-2px)',
                backgroundColor: 'rgba(255,255,255,0.05)',
              },
              '& svg': {
                height: 32,
                width: 32,
                color: colors.goldLight
              }
            }}
          >
            {icon}
            <Typography sx={{
              mt: 2,
              fontWeight: 800,
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: colors.goldLight
            }}>{label}</Typography>
          </Box>
        )
      })}
    </Box>
  )
}

export default Menu