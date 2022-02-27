import React from 'react'
import { Box, CssBaseline } from '@iotabots/components'
import { Route, Routes } from 'react-router-dom'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import Theme from './Theme'
import Game from './pages/Game'
import Collection from './pages/Collection'
import History from './pages/History'

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
        <Box bgcolor='background.paper' minHeight='100vh'>
          <Routes>
            <Route path='/' element={<Game />} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/history' element={<History />} />
          </Routes>
          <CssBaseline />
        </Box>
      </Web3ReactProvider>
    </Theme>
  )
}

export default App
