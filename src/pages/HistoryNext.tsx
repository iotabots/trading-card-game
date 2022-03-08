import React from 'react'
import { Typography } from '@iotabots/components'
import { Container } from '@mui/material'
import MenuLayout from '../layouts/MenuLayout'

const HistoryNext: React.FC = () => (
  <MenuLayout>
    <Container>
      <Typography variant='h2' mb={4}>History</Typography>
    </Container>
  </MenuLayout>
)

export default HistoryNext