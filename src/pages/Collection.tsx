/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react'
import { Box, Container, Grid, Typography } from '@iotabots/components'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { IconButton } from '@mui/material'
import BaseLayout from '../layouts/BaseLayout'
import DeckBox from '../components/DeckBox'
import BuyPacks from '../components/BuyPacks'
import CollectionItem from '../components/CollectionItem'
import { DECKS } from '../data/decks'
import { DeckType } from '../types'
import EditDeck from '../components/EditDeck'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CARDS_ABI = require('../contracts/cards.json')

const CARDS_ADDRESS = '0x29e755AD70B44d4e729483BDd35115E6f76E221F'

const Collection: React.FC = () => {
  const { account, library } = useWeb3React()
  const [decks, setDecks] = React.useState<DeckType[]>(DECKS)
  const [selectedDeck, setSelectedDeck] = React.useState<number | undefined>(undefined)
  const [contract, setContract] = React.useState(undefined)
  const [collection, setCollection] = React.useState<undefined[]>([])

  const init = async (_account: any, _library: any): Promise<void> => {
    console.log('init')
    const web3 = new Web3(_library.provider)
    // @ts-ignore
    const test = new web3.eth.Contract(CARDS_ABI, CARDS_ADDRESS)
    // @ts-ignore
    setContract(test)

    const data = await test.methods.getMyCollection().call({ from: account })
    setCollection(data)
    console.log('my collection', data)
  }

  React.useEffect(() => {
    if (!!account && !!library) {
      init(account, library)
    }
  }, [account, library])

  const onClickItem = (id: number): void => {
    setDecks(
      {
        ...decks,
      }
    )
  }

  return (
    <BaseLayout>
      <Container sx={{ pb: 6 }}>
        <Box sx={{
          mb: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Typography variant='h2'>Collection</Typography>
          <BuyPacks available={!!contract} contract={contract} />
        </Box>
        <Grid container spacing={6}>
          <Grid item xs={8} container spacing={6}>
            {collection.flatMap((item) => {
              if (item) {
                return <CollectionItem item={item} />
              }
              return <Box />
            })}
          </Grid>
          <Grid item xs={4}>
            {selectedDeck !== undefined ? (
              <EditDeck deck={decks[selectedDeck]} setSelectedDeck={setSelectedDeck} />
            ) : (
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
                    color='success'
                    onClick={() => console.log('Create Deck')}
                    sx={{
                      ml: 4
                    }}>
                    <AddRoundedIcon />
                  </IconButton>
                </Box>
                {decks.map((deck) => (
                  <DeckBox {...deck} setSelectedDeck={setSelectedDeck} />
                ))}
              </Box>
            )
            }
          </Grid>
        </Grid>
      </Container>
    </BaseLayout>
  )
}

export default Collection
