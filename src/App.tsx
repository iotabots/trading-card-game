import React from 'react'
import { Box, CssBaseline } from '@iotabots/components'
import { Route, Routes } from 'react-router-dom'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { GameProvider } from './contexts/GameContext'
import { DecksProvider } from './contexts/DecksContext'
import Theme from './Theme'
import Game from './pages/Game'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Shop from './pages/Shop'
import History from './pages/HistoryNext'
import './styles.css'

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
        <DecksProvider>
          <GameProvider>
            <Box bgcolor='#0d1425' minHeight='100vh'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/collection' element={<Collection />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/history' element={<History />} />
                <Route path='/game' element={<Game />} />
              </Routes>
              <CssBaseline />
            </Box>
          </GameProvider>
        </DecksProvider>
      </Web3ReactProvider>
    </Theme>
  )
}

export default App
