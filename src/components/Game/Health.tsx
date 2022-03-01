import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Box } from '@iotabots/components'
import Energy from './Energy'

interface HealthProps {
  hp: string
}

const Health: React.FC<HealthProps> = (props) => {
  const { hp } = props
  return (
    <Box mb={5} width='100%'>
      <Energy
        value={parseInt(hp, 2)}
        max={20}
        icon={<FavoriteIcon />}
        color='error'
      />
    </Box>
  )
}

export default Health