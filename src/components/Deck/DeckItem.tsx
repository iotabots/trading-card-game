import React from 'react'
import { Box, Typography } from '@iotabots/components'
import { IconButton } from '@mui/material'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import ManaImage from '../../icons/Mana.png'

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
    <Box display='flex' alignItems='center' sx={{ mb: 2 }}>
      <Box
        sx={{
          backgroundImage: `url(${ManaImage})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: 50,
          height: 50,
          mr: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold'
        }}
      >{mana}</Box>
      <Box flexGrow={1} sx={{ mr: 2 }}>{name}</Box>
      <Box sx={{
        mr: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <IconButton
          color='error'
          size='small'
          onClick={() => changeCount(id, -1)}
          sx={{
            mr: 2
          }}>
          <RemoveRoundedIcon />
        </IconButton>
        <Typography>{count}</Typography>
        <IconButton
          color='success'
          size='small'
          onClick={() => changeCount(id, 1)}
          sx={{
            ml: 2
          }}>
          <AddRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default DeckItem