import React from 'react'
import { Box, CssBaseline } from '@iotabots/components'
import Theme from './Theme'
import Game from './pages/Game'

const App: React.FC = () => (
  <Theme>
    <Box bgcolor='background.paper' minHeight='100vh'>
      <Game />
      <CssBaseline />
    </Box>
  </Theme >
)

export default App
