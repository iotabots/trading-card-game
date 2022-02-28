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
  console.log('games', games)
  const [loadedGames, setLoadedGames] = React.useState<any>([])

  const init = async (): Promise<void> => {
    console.log('games[0]', games[0])
    setLoadedGames(games)
    console.log('loadedGames', loadedGames)
  }

  React.useEffect(() => {
    if (!!account && !!library && !!games) {
      console.log('games2', games)
      init()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {loadedGames &&
        loadedGames.map((game: any) => (
          <Box
            sx={{
              mb: 4,
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='h6'>GameID: {game.id}</Typography>
            <Typography variant='body1'>Player1: {game.player1}</Typography>
            <Typography variant='body1'>Player2: {game.player2}</Typography>
          </Box>
        ))}
    </Box>
  )
}

export default GamesList
