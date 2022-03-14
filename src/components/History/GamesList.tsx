/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Box, Typography } from '@iotabots/components'
import { useWeb3React } from '@web3-react/core'
import { shortenAddress } from '../../utils/shortenAddress'

export interface Game {
  id: number
}
export interface GamesListProps {
  games: Game[] | undefined[]
}

const GamesList: React.FC<GamesListProps> = (props) => {
  const { account, library } = useWeb3React()
  const { games } = props
  const [loadedGames, setLoadedGames] = React.useState<any>([])

  const init = async (): Promise<void> => {
    setLoadedGames(games)
  }

  React.useEffect(() => {
    if (!!account && !!library && !!games) {
      init()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <table>
        <thead>
          <tr>
            <td>Game ID</td>
            <td>Player1</td>
            <td>Player2</td>
          </tr>
        </thead>
        <tbody>
          {loadedGames &&
            loadedGames.map((game: any) => (
              <tr key={game.id}>
                <td>
                  <Typography variant='h6'>{game.id}</Typography>
                </td>
                <td>
                  <Typography variant='body1'>
                    {shortenAddress(game.player1?.addr || 'undefined')}
                  </Typography>
                </td>
                <td>
                  <Typography variant='body1'>
                    {shortenAddress(game.player2?.addr || 'undefined')}
                  </Typography>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Box>
  )
}

export default GamesList
