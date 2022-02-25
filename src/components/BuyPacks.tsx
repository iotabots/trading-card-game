/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Button } from '@iotabots/components'
import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { flexRowBetween } from '../styles'

export interface BuyPacksProps {
  available: boolean
  contract: undefined
}

const BuyPacks: React.FC<BuyPacksProps> = (props) => {
  const { account } = useWeb3React()
  const { available, contract } = props

  const buyStarter = async (): Promise<void> => {
    // @ts-ignore
    if (contract.methods) {
      // @ts-ignore
      const data = await contract.methods.buy_starter().send({ from: account })
      console.log('data', data)
    }
  }

  const buyBooster = async (): Promise<void> => {
    // @ts-ignore
    if (contract.methods) {
      // @ts-ignore
      const data = await contract.methods.buy_booster().send({ from: account })
      console.log('data', data)
    }
  }

  return (
    <Box sx={{ ...flexRowBetween }}>
      {available && (
        <>
          <Button color='inherit'
            onClick={buyStarter}
            sx={{
              mr: 4,
              bgcolor: 'text.primary',
              color: 'background.paper',
            }}>
            Buy Starter Pack
          </Button>
          <Button color='secondary' onClick={buyBooster}>
            Buy Booster pack
          </Button>
        </>
      )}
    </Box>
  )
}

export default BuyPacks