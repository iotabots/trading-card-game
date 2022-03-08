import React from 'react'
import { Box, CssBaseline, Frame } from '@iotabots/components'
import { Route, Routes } from 'react-router-dom'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import Theme from './Theme'
import Game from './pages/Game'
import Collection from './pages/Collection'
import History from './pages/History'
import { GameProvider } from './contexts/GameContext'
import Home from './pages/Home'
import CollectionNext from './pages/CollectionNext'
import Shop from './pages/Shop'
import HistoryNext from './pages/HistoryNext'

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLibrary = (provider: any): Web3Provider => {
    const library = new Web3Provider(provider)
    library.pollingInterval = 1000
    return library
  }
  return (
    <Theme>
      <Web3ReactProvider getLibrary={getLibrary}>
        <GameProvider>
          <Box bgcolor='#0d1425' minHeight='100vh'>
            <Routes>
              <Route path='/' element={<Collection />} />
              <Route path='/home' element={<Home />} />
              <Route path='/collection' element={<CollectionNext />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/history-next' element={<HistoryNext />} />
              <Route path='/game' element={<Game />} />
              <Route path='/history' element={<History />} />
            </Routes>
            <CssBaseline />
          </Box>
        </GameProvider>
      </Web3ReactProvider>
    </Theme>
  )
}

export default App
