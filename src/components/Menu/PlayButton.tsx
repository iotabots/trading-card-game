import { Box, Typography } from '@iotabots/components'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { AbiItem } from 'web3-utils'
import { Contract } from 'web3-eth-contract'
import Web3 from 'web3'
import { GameContext } from '../../contexts/GameContext'
import { DECK } from '../../data/deck'
import PlaySvg from '../../icons/PlaySvg'
import config from '../../contracts/config'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const GAME_ABI = require('../../contracts/game.json')

const PlayButton: React.FC = () => {
  const { setGameId, setGameState } =
    React.useContext(GameContext)
  const [queueTime, setQueueTime] = React.useState<number>(0)
  const navigate = useNavigate()
  const { account, library } = useWeb3React()
  const [gameContract, setGameContract] = React.useState<Contract | undefined>(
    undefined
  )

  const init = async (): Promise<void> => {
    const web3 = new Web3(library.provider)
    const GameContract = new web3.eth.Contract(
      GAME_ABI as AbiItem[],
      config.GAME_ADDRESS
    )
    setGameContract(GameContract)
  }
  const onPlay = async (): Promise<void> => {

    console.log('onPlay', gameContract)
    const array: string[] = []
    DECK.cards.map((item): void => {
      for (let index = 0; index < item.count; index += 1) {
        array.push(String(Number(item.id) + 1))
      }
    })
    console.log(DECK.cards)
    console.log('array')
    console.log(array)

    if (gameContract) {
      console.log('gameContract true')
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

  React.useEffect(() => {
    if (!!account && !!library) {
      init()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library])
  return (
    <Box
      sx={{
        position: 'relative',
        cursor: 'pointer'
      }}
      onClick={onPlay}
    >
      <PlaySvg />
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <Typography variant='h3'>
          PLAY
        </Typography>
      </Box>
    </Box>
  )
}

export default PlayButton