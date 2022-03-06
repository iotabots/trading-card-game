/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Box, Typography } from '@iotabots/components'
import { useWeb3React } from '@web3-react/core'

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
          <td>Game ID</td>
          <td>Player1</td>
          <td>Player2</td>
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
                    {`${game.player1?.addr.substring(
                      0,
                      5
                    )}...${game.player1?.addr.substring(
                      // eslint-disable-next-line
                      game.player1?.addr.length - 3,
                      game.player1?.addr.length
                    )}`}
                  </Typography>
                </td>
                <td>
                  <Typography variant='body1'>
                    {`${game.player2?.addr.substring(
                      0,
                      5
                    )}...${game.player2?.addr.substring(
                      // eslint-disable-next-line
                      game.player2?.addr.length - 3,
                      game.player2?.addr.length
                    )}`}
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