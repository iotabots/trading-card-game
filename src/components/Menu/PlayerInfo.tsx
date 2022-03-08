import { Box, Typography } from '@iotabots/components'
import React from 'react'
import Progress from '../../icons/Progress'
import { colors } from '../../styles'
import { shortenAddress } from '../../utils/shortenAddress'
import Avatar from './Avatar'

interface PlayerInfoProps {
  avatar: string
  name: string
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ avatar, name }) => (
  <Box sx={{
    display: 'flex',
  }}>
    <Avatar avatar={avatar} />
    <Box mt={3}>
      <Typography ml={4} mb={2} variant='h5' color={colors.goldLight}>
        {shortenAddress(name)}
      </Typography>
      <Progress progress={0.66} />
    </Box>
  </Box>
)

export default PlayerInfo