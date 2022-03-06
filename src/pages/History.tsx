/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import { Box, Container, Typography } from '@iotabots/components'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import BaseLayout from '../layouts/BaseLayout'
import GamesList from '../components/History/GamesList'
import contracts from '../contracts/config'

const GAME_ABI = require('../contracts/game.json')

const Collection: React.FC = () => {
  const { account, library } = useWeb3React()

  // C O N T R A C T S
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gameContract, setGameContract] = React.useState<Contract | undefined>(
    undefined
  )
  const [games, setGames] = React.useState<undefined[]>([])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const init = async (_account: any, _library: any): Promise<void> => {
    const web3 = new Web3(_library.provider)

    const GameContract = new web3.eth.Contract(
      GAME_ABI as AbiItem[],
      contracts.GAME_ADDRESS
    )
    setGameContract(GameContract)
    const promises = []
    const gamesCount: number = await GameContract.methods.getGamesCount().call()

    if (gamesCount > 0) {
      for (let i = 0; i < gamesCount; i += 1) {
        const element = GameContract.methods.games(i).call()

        promises.push(element)
      }
    }
    Promise.all(promises).then((results) => {
      setGames(results)
    })
  }

  React.useEffect(() => {
    if (!!account && !!library) {
      init(account, library)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library])

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
          <Typography variant='h2'>History</Typography>
        </Box>
        {games && <GamesList games={games} />}
      </Container>
    </BaseLayout>
  )
}

export default Collection
