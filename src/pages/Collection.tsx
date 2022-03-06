/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import { Box, Container, Grid, Typography } from '@iotabots/components'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import { useNavigate } from 'react-router-dom'
import BaseLayout from '../layouts/BaseLayout'
import BuyPacks from '../components/Collection/BuyPacks'
import CollectionItem from '../components/Collection/CollectionItem'
import { DECK } from '../data/deck'
import { DeckType } from '../types'
import EditDeck from '../components/Deck/EditDeck'
import Decks from '../components/Deck/Decks'

import { config } from '../contracts/config'
import { GameContext } from '../contexts/GameContext'

const CARDS_ABI = require('../contracts/cards.json')
const GAME_ABI = require('../contracts/game.json')

const Collection: React.FC = () => {
  const { account, library } = useWeb3React()
  const { setGameId, setGameState } = React.useContext(GameContext)
  const navigate = useNavigate()

  // C O N T R A C T S
  const [cardsContract, setCardsContract] = React.useState<
    Contract | undefined
  >(undefined)

  const [queueTime, setQueueTime] = React.useState<number>(0)

  const [gameContract, setGameContract] = React.useState<Contract | undefined>(
    undefined
  )

  const [deck, setDeck] = React.useState<DeckType>(DECK)
  const [selectedDeck, setSelectedDeck] = React.useState<number | undefined>(
    undefined
  )
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

    const GameContract = new web3.eth.Contract(
      GAME_ABI as AbiItem[],
      config.GAME_ADDRESS
    )
    setGameContract(GameContract)
  }

  React.useEffect(() => {
    if (!!account && !!library) {
      init()
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
      // Join Queue
      await gameContract.methods
        .play(array)
        .send({ from: account })

      // Get GameId
      const gamesCountResponse = await gameContract.methods
        .getGamesCount()
        .call({ from: account })
      setGameId(gamesCountResponse - 1)

      // Get GameState
      const gameResponse = await gameContract.methods
        .games(gamesCountResponse - 1)
        .call({ from: account })

      if (gameResponse.player1.addr === account) {
        let gameResponse2
        const interval = setInterval(async () => {
          setQueueTime(queueTime + 1)
          gameResponse2 = await gameContract.methods
            .games(gamesCountResponse - 1)
            .call({ from: account })
          if (gameResponse2.player2.addr !== config.NULL_ADDRESS) {
            clearInterval(interval)
            setGameState(gameResponse2)
            navigate('/game')
          }
        }, 5000)
      } else if (gameResponse.player2.addr === account) {
        setGameState(gameResponse)
        navigate('/game')
      } else {
        // eslint-disable-next-line no-console
        console.log('error')
      }
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
                queueTime={queueTime}
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
