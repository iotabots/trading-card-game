import React from 'react'
import { Box, Typography } from '@iotabots/components'
import { IconButton } from '@mui/material'
import ManaImage from '../../icons/Mana.png'
import { colors, transition } from '../../styles'
import MinusSvg from '../../icons/MinusSvg'
import PlusSvg from '../../icons/PlusSvg'

interface DeckItemProps {
  id: string
  mana: number
  name: string
  count: number
  changeCount: (id: string, number: number) => void
}

const DeckItem: React.FC<DeckItemProps> = (props) => {
  const { mana, name, count, id, changeCount } = props

  return (
    <Box
      display='flex'
      alignItems='center'
      sx={{
        p: 2,
        '&:hover': {
          bgcolor: colors.dark,
          borderRadius: '8px',
          '& .counter': {
            maxWidth: 95,
          },
        },
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${ManaImage})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: 44,
          height: 44,
          mr: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
        }}
      >
        {mana}
      </Box>
      <Box flexGrow={1} sx={{ mr: 2 }}>
        <Typography fontWeight='bold' color={colors.goldLight}>
          {name}
        </Typography>
      </Box>
      <Box
        className='counter'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          maxWidth: 40,
          transition,
        }}
      >
        <IconButton
          onClick={() => changeCount(id, -1)}
          sx={{
            mr: 2,
            color: colors.goldLight,
            transition,
            '&:hover svg': {
              color: 'white',
            },
          }}
        >
          <MinusSvg />
        </IconButton>
        <Typography
          sx={{ minWidth: 16 }}
          textAlign='center'
          fontSize={16}
          fontWeight='bold'
        >
          {count}
        </Typography>
        <IconButton
          onClick={() => changeCount(id, 1)}
          sx={{
            ml: 2,
            color: colors.goldLight,
            transition,
            '&:hover svg': {
              color: 'white',
            },
          }}
        >
          <PlusSvg />
        </IconButton>
      </Box>
    </Box>
  )
}

export default DeckItem
