/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import { Box, Container, Grid, Typography } from '@iotabots/components'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import BaseLayout from '../layouts/BaseLayout'
import BuyPacks from '../components/Collection/BuyPacks'
import CollectionItem from '../components/Collection/CollectionItem'
import { DECK } from '../data/decks'
import { DeckType } from '../types'
import EditDeck from '../components/Deck/EditDeck'
import Decks from '../components/Deck/Decks'

import contracts from '../contracts/config'

const CARDS_ABI = require('../contracts/cards.json')
const GAME_ABI = require('../contracts/game.json')

const Collection: React.FC = () => {
  const { account, library } = useWeb3React()

  // C O N T R A C T S
  const [cardsContract, setCardsContract] = React.useState<
    Contract | undefined
  >(undefined)
  const [gameContract, setGameContract] = React.useState<Contract | undefined>(
    undefined
  )

  const [deck, setDeck] = React.useState<DeckType>(DECK)
  const [selectedDeck, setSelectedDeck] = React.useState<number | undefined>(
    undefined
  )
  const [collection, setCollection] = React.useState<undefined[]>([])

  const init = async (_account: any, _library: any): Promise<void> => {
    const web3 = new Web3(_library.provider)
    const CardsContract = new web3.eth.Contract(
      CARDS_ABI as AbiItem[],
      contracts.CARDS_ADDRESS
    )
    setCardsContract(CardsContract)

    const data = await CardsContract.methods
      .getMyCollection()
      .call({ from: account })
    setCollection(data)

    const GameContract = new web3.eth.Contract(
      GAME_ABI as AbiItem[],
      contracts.GAME_ADDRESS
    )
    setGameContract(GameContract)
  }

  React.useEffect(() => {
    if (!!account && !!library) {
      init(account, library)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library])

  const onPlay = async (): Promise<void> => {
    const array: string[] = []

    deck.cards.map((item): void => {
      for (let index = 0; index < item.count; index += 1) {
        array.push(item.id)
      }
    })
    if (gameContract) {
      await gameContract.methods.play(array).send({ from: account })
    }
  }

  return (
    <BaseLayout>
      <Container sx={{ pb: 6 }}>
        <Box
          sx={{
            mb: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h2'>Collection</Typography>
          {cardsContract && <BuyPacks contract={cardsContract} />}
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
              <EditDeck
                deck={deck}
                setDeck={setDeck}
                setSelectedDeck={setSelectedDeck}
              />
            ) : (
              <Decks
                deck={deck}
                onPlay={onPlay}
                setSelectedDeck={setSelectedDeck}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </BaseLayout>
  )
}

export default Collection
