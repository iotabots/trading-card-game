import React from 'react'
import { Box } from '@iotabots/components'
import Drop from '../../icons/Drop'
import Energy from './Energy'

const MAX_MANA = 10

interface ManaProps {
  mp: number
}

const Mana: React.FC<ManaProps> = (props) => {
  const { mp } = props

  return (
    <Box mb={4} width='100%'>
      <Energy
        value={mp}
        max={MAX_MANA}
        icon={<Drop />}
        color='info'
      />
    </Box>
  )
}

export default Mana