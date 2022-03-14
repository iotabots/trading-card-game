
import { Web3Provider } from '@ethersproject/providers'
import { Box, Logo } from '@iotabots/components'
import { useWeb3React } from '@web3-react/core'
import React from 'react'
import { colors } from '../../styles'
import ConnectButton from './ConnectButton'
import Currency from './Currency'
import PlayerInfo from './PlayerInfo'

interface WhitelistItem {
  id: string
  address: string
}
const Header: React.FC = () => {
  const { account, library } = useWeb3React<Web3Provider>()
  const [bots, setBots] = React.useState<number[]>([])

  const load = React.useCallback(async (): Promise<boolean> => {
    console.log('Header Account', account)
    const URL =
      'https://raw.githubusercontent.com/iotabots/save-the-bots/main/all.txt'

    const res = await fetch(URL)
    const data = await res.text()

    const airdropAddresses: WhitelistItem[] = []

    if (!data) {
      return false
    }

    const array = data.split('\n')
    // for (var i = 0; i < array.length; i++) {
    for (let index = 0; index < array.length - 1; index += 1) {
      const botData = array[index].split(':')
      const obj = {
        id: botData[0],
        address: botData[1]
      }
      airdropAddresses.push(obj)
    }

    const iotabots: number[] = []
    airdropAddresses.forEach((obj) => {
      if (obj.address === account) {
        iotabots.push(Number(obj.id))
      }
    })
    setBots(iotabots)
    return true
  }, [account])

  React.useEffect(() => {
    if (!!account && !!library) {
      load()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library])

  return (
    <Box sx={{
      position: 'fixed',
      zIndex: 10,
      top: 0,
      left: 0,
      height: 80,
      width: '100%',
      borderBottom: '2px solid',
      borderColor: colors.gold,
      backgroundColor: colors.black,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 6
    }}>
      {account ? (
        <>
          <Box sx={{
            transform: 'translateY(40px)'
          }}>
            <PlayerInfo
              avatar={
                // eslint-disable-next-line max-len
                `https://assets.iotabots.io/compressed/${bots[0] > 0 ? bots[0] : '1'}.png`
              }
              name={String(account)} />
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Currency type='premium' value='242' />
            <Currency type='default' value='2.400' />
          </Box>
        </>
      ) : (
        <Box sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Logo />
          <ConnectButton />
        </Box>
      )}
    </Box>
  )
}

export default Header