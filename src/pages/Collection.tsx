/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import { Box, Grid, Typography } from '@iotabots/components'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { Container } from '@mui/material'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import MenuLayout from '../layouts/MenuLayout'
import config from '../contracts/config'
import CollectionItem from '../components/Collection/CollectionItem'
import Decks from '../components/Deck/Decks'
import EditDeck from '../components/Deck/EditDeck'
import { colors } from '../styles'
import { DecksContext } from '../contexts/DecksContext'

const CARDS_ABI = require('../contracts/cards.json')

const Collection: React.FC = () => {
  const { edit } = React.useContext(DecksContext)
  const { account, library } = useWeb3React()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cardsContract, setCardsContract] = React.useState<
    Contract | undefined
  >(undefined)
  const [collection, setCollection] = React.useState<undefined[]>([])
  const init = async (): Promise<void> => {
    const web3 = new Web3(library.provider)
    const CardsContract = new web3.eth.Contract(
      CARDS_ABI as AbiItem[],
      config.CARDS_ADDRESS
    )
    setCardsContract(CardsContract)

    const data = await CardsContract.methods
      .getMyCollection()
      .call({ from: account })
    setCollection(data)
  }

  React.useEffect(() => {
    if (!!account && !!library) {
      init()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library])
  return (
    <MenuLayout>
      <Container>
        <Typography variant='h2' mb={4} color={colors.goldLight}>
          Collection
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={8} container spacing={6}>
            {collection.flatMap((item) => {
              if (item) {
                return (
                  <CollectionItem
                    key={item}
                    item={item} />
                )
              }
              return <Box />
            })}
          </Grid>
          <Grid item xs={4}>
            {edit !== undefined ? <EditDeck /> : <Decks />}
          </Grid>
        </Grid>
      </Container>
    </MenuLayout>
  )
}

export default Collection
