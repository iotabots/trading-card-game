import React from 'react'
import { Box, Typography } from '@iotabots/components'
import { Container, Grid } from '@mui/material'
import MenuLayout from '../layouts/MenuLayout'
import DividerSvg from '../icons/DividerSvg'
import { colors, transition } from '../styles'
import Button from '../components/Button'
import { DecksContext } from '../contexts/DecksContext'

const DECKS = [
  {
    name: 'Starter Deck',
    bots: 24,
    spells: 9,
    mana: {
      0: 2,
      1: 9,
      2: 6,
      3: 4,
      4: 5,
      5: 3,
      6: 2,
    },
  },
  {
    name: 'Early Rush',
    bots: 24,
    spells: 9,
    mana: {
      0: 2,
      1: 9,
      2: 6,
      3: 4,
      4: 5,
      5: 3,
      6: 2,
    },
  },
  {
    name: 'Strong Mid',
    bots: 24,
    spells: 9,
    mana: {
      0: 2,
      1: 9,
      2: 6,
      3: 4,
      4: 5,
      5: 3,
      6: 2,
    },
  },
]

const Home: React.FC = () => {
  const { selected, setSelected } = React.useContext(DecksContext)

  return (
    <MenuLayout>
      <Container>
        <Typography variant='h2' mb={4} color={colors.goldLight}>
          Choose your Deck
        </Typography>
        <Grid container spacing={6}>
          {DECKS.flatMap((deck, index) => {
            const { name } = deck
            const isSelected = selected === index
            return (
              <Grid item xs={4}>
                <Box
                  sx={{
                    position: 'relative',
                    backgroundColor: colors.black,
                    px: 4,
                    py: 4,
                    minHeight: '50vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid',
                    borderColor: colors.gold,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    opacity: isSelected ? 1 : 0.66,
                    transition,
                    '&:hover': {
                      opacity: 1,
                      pb: 6,
                      '& .select': {
                        bottom: 40,
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <DividerSvg />
                  <Typography
                    variant='h5'
                    mt={6}
                    mb={5}
                    sx={{ color: colors.goldLight }}
                  >
                    {name}
                  </Typography>
                  <DividerSvg />
                  <Box
                    className='select'
                    sx={{
                      position: 'absolute',
                      bottom: isSelected ? 40 : 26,
                      left: '50%',
                      transition,
                      transform: 'translateX(-50%)',
                      opacity: isSelected ? 1 : 0,
                    }}
                  >
                    <Button
                      color={isSelected ? 'light' : 'dark'}
                      onClick={() => setSelected(index)}
                    >
                      {isSelected ? 'Selected' : 'Select'}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </MenuLayout>
  )
}

export default Home
