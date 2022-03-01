import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Box } from '@iotabots/components'
import Energy from './Energy'

interface HealthProps {
  health: number
}

const Health: React.FC<HealthProps> = (props) => {
  const { health } = props
  return (
    <Box mb={5} width='100%'>
      <Energy
        value={health}
        max={20}
        icon={<FavoriteIcon />}
        color='error'
      />
    </Box>
  )
}

export default Health