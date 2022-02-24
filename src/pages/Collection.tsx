/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react'
import { Button, Typography } from '@iotabots/components'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import BaseLayout from '../layouts/BaseLayout'
// import CARDS_ABI from '../contracts/cards.json'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CARDS_ABI = require('../contracts/cards.json')

const CARDS_ADDRESS = '0x29e755AD70B44d4e729483BDd35115E6f76E221F'

const Collection: React.FC = () => {
  const { account, chainId, library } = useWeb3React()

  const [contract, setContract] = React.useState(undefined)


  const init = (_account: any, _library: any): void => {
    const web3 = new Web3(_library.provider)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setContract(new web3.eth.Contract(CARDS_ABI, CARDS_ADDRESS))
  }

  const buy = async (): Promise<void> => {
    const web3 = new Web3(library.provider)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const test = new web3.eth.Contract(CARDS_ABI, CARDS_ADDRESS)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setContract(test)
    const data = await test.methods.buy_starter().call()
    console.log('data', data)
  }

  React.useEffect(() => {
    console.log('yoyo')
  }, [account, library])

  return (
    <BaseLayout>
      <Typography variant='h1'>Collection</Typography>
      {contract && (
        <Button onClick={buy}>Buy Booster pack</Button>
      )}
    </BaseLayout>
  )
}

export default Collection