/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { Box, Grid, Typography } from '@iotabots/components'
import { Container } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'
import MenuLayout from '../layouts/MenuLayout'
import StarSvg from '../icons/StarSvg'
import RocketSvg from '../icons/RocketSvg'
import { colors } from '../styles'
import Button from '../components/Button'
import config from '../contracts/config'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CARD_ABI = require('../contracts/cards.json')

export interface BuyPacksProps {
  contract: Contract
}


const Shop: React.FC = () => {
  const { account, library } = useWeb3React()
  const [contract, setContract] = React.useState<Contract | undefined>(
    undefined
  )

  const init = async (): Promise<void> => {
    const web3 = new Web3(library.provider)
    const myContract = new web3.eth.Contract(
      CARD_ABI as AbiItem[],
      config.CARDS_ADDRESS
    )
    setContract(myContract)
  }

  const buyStarter = async (): Promise<void> => {
    console.log('Buy Starter')
    // @ts-ignore
    if (contract.methods) {
      // @ts-ignore
      await contract.methods.buy_starter().send({ from: account })
    }
  }

  const buyBooster = async (): Promise<void> => {
    // @ts-ignore
    if (contract.methods) {
      // @ts-ignore
      await contract.methods.buy_booster().send({ from: account })
    }
  }

  const PACKS = [
    {
      icon: <StarSvg />,
      name: 'Starter Pack',
      description: '40 unique cards',
      onClick: buyStarter
    },
    {
      icon: <RocketSvg />,
      name: 'Booster Pack',
      description: '10 random cards',
      onClick: buyBooster
    },
  ]

  React.useEffect(() => {
    if (!!account && !!library) {
      init()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library])

  return (
    <MenuLayout>
      <Container maxWidth='md'>
        <Typography mb={4} variant='h2' color={colors.goldLight}>
          Shop
        </Typography>
        <Grid container spacing={6}>
          {PACKS.flatMap(({ icon, name, description, onClick }) => (
            <Grid
              item
              xs={6}
            >
              <Box sx={{
                backgroundColor: colors.black,
                px: 4,
                py: 4,
                minHeight: '50vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid',
                borderColor: colors.gold,
                borderRadius: '8px',
              }}>
                {icon}
                <Typography
                  variant='h4'
                  mt={6}
                  mb={1}
                  sx={{ color: colors.goldLight }}
                >
                  {name}
                </Typography>
                <Typography
                  sx={{
                    color: colors.goldLight,
                    opacity: '0.66'
                  }}
                >
                  {description}
                </Typography>
                <Button color='secondary' mt={6} onClick={onClick}>
                  Buy
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MenuLayout>
  )
}

export default Shop