import React from 'react'
import { Box, Typography } from '@iotabots/components'
import DeckBox from './DeckBox'
import { colors } from '../../styles'
import DividerSvg from '../../icons/DividerSvg'
import { DECKS } from '../../data/deck'

const Decks: React.FC = () => (
  <Box
    sx={{
      bgcolor: colors.black,
      border: '2px solid',
      borderColor: colors.gold,
      borderRadius: '8px',
      p: 5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
      }}
    >
      <Typography variant='h5' color={colors.goldLight} mb={2}>
        My Decks
      </Typography>
      <DividerSvg />
    </Box>
    {DECKS.map((deck) => (
      <DeckBox {...deck} />
    ))}
    {/* <Button
      sx={{ mt: 4 }}
      onClick={() => console.log('Create Deck')}
    >
      Create Deck
    </Button> */}
  </Box>
)

export default Decks
