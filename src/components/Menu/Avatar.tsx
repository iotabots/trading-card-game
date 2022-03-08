import { Box } from '@iotabots/components'
import React from 'react'
import AvatarFrame from '../../icons/AvatarFrame'
import Badge from './Badge'

interface AvatarProps {
  avatar: string
}

const Avatar: React.FC<AvatarProps> = ({ avatar }) => (
  <Box sx={{
    position: 'relative',
    height: 136,
    width: 136,
  }}>
    <Box sx={{
      position: 'absolute',
      top: 18,
      left: 18,
      height: 100,
      width: 100,
      backgroundImage: `url(${avatar})`,
      backgroundSize: 'cover',
      borderRadius: '50%'
    }} />
    <Box sx={{
      position: 'absolute',
      zIndex: 2
    }}>
      <AvatarFrame />
    </Box>
    <Box sx={{
      position: 'absolute',
      zIndex: 3,
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: -8
    }}>
      <Badge>4</Badge>
    </Box>
  </Box>
)

export default Avatar