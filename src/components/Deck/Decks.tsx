import React, { Dispatch, SetStateAction } from 'react'
import { Box, Button, Typography } from '@iotabots/components'
import { IconButton } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { DeckType } from '../../types'
import DeckBox from './DeckBox'

interface DecksProps {
  deck: DeckType
  setSelectedDeck: Dispatch<SetStateAction<number | undefined>>
  onPlay: () => void
}

const Decks: React.FC<DecksProps> = (props) => {
  const { deck, setSelectedDeck, onPlay } = props

  return (
    <Box sx={{
      bgcolor: 'rgba(0,0,0,0.5)',
      borderRadius: '8px',
      p: 4
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 4
      }}>
        <Typography variant='h4'>Decks</Typography>
        <IconButton
          disabled
          color='success'
          sx={{ ml: 4 }}
        >
          <AddRoundedIcon />
        </IconButton>
      </Box>
      <DeckBox {...deck} setSelectedDeck={setSelectedDeck} />
      <Button
        sx={{ mt: 4 }}
        fullWidth
        onClick={onPlay}
      >
        Play
      </Button>
    </Box>
  )
}

export default Decks