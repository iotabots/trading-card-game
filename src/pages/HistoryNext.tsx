/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import { Box, Typography } from '@iotabots/components'
import { Container } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import MenuLayout from '../layouts/MenuLayout'
import { colors, transition } from '../styles'
import Avatar from '../components/Menu/Avatar'
import VsSvg from '../icons/VsSvg'
import contracts from '../contracts/config'
import { shortenAddress } from '../utils/shortenAddress'

const GAME_ABI = require('../contracts/game.json')

interface GameType {
  id: number
  player1: {
    addr: string
  }
  player2: {
    addr: string
  }
  winner: string
}

const HistoryNext: React.FC = () => {
  const { account, library } = useWeb3React()

  // C O N T R A C T S
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gameContract, setGameContract] = React.useState<Contract | undefined>(
    undefined
  )
  const [games, setGames] = React.useState<GameType[]>([])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const init = async (_account: any, _library: any): Promise<void> => {
    const web3 = new Web3(_library.provider)

    const GameContract = new web3.eth.Contract(
      GAME_ABI as AbiItem[],
      contracts.GAME_ADDRESS
    )
    setGameContract(GameContract)
    const promises = []
    const gamesCount: number =
      await GameContract.methods.getGamesCount().call()

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

  console.log(games)

  return (
    <MenuLayout>
      <Container maxWidth='md'>
        <Typography variant='h2' mb={4} color={colors.goldLight}>
          History
        </Typography>
        {games.map((game) => (
          <Box
            sx={{
              position: 'relative',
              borderRadius: '8px',
              border: '2px solid',
              borderColor: colors.gold,
              bgcolor: colors.black,
              mb: 4,
              p: 4,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <Box>
                <Avatar avatar='https://assets.iotabots.io/compressed/1.png' />
              </Box>
              <Box ml={2}>
                <Typography
                  variant='h5'
                  mb={1}
                  color={colors.goldLight}
                >
                  {shortenAddress(game.player1.addr)}
                </Typography>
                <Typography
                  color={colors.goldLight}
                  sx={{ opacity: 0.66 }}
                >
                  {game.player1.addr === game.winner ? 'Victory' : 'Defeat'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%) scale(1.2)',
            }}>
              <Box sx={{
                transition,
                '& svg': {
                  transform:
                    game.player2.addr === game.winner
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)'
                }
              }}>
                <VsSvg />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-49%,-57%)',
                }}>
                <Typography fontWeight='bold' color={colors.goldLight}>
                  VS
                </Typography>
              </Box>

            </Box>
            {/* {id} */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <Box mr={2}>
                <Typography
                  variant='h5'
                  textAlign='right'
                  mb={1}
                  color={colors.goldLight}
                >
                  {shortenAddress(game.player2.addr)}
                </Typography>
                <Typography
                  color={colors.goldLight}
                  sx={{ opacity: 0.66 }}
                  textAlign='right'
                >
                  {game.player2.addr === game.winner ? 'Victory' : 'Defeat'}
                </Typography>
              </Box>
              <Box>
                <Avatar avatar='https://assets.iotabots.io/compressed/1.png' />
              </Box>
            </Box>
          </Box>
        ))}
      </Container>
    </MenuLayout>
  )
}

export default HistoryNext