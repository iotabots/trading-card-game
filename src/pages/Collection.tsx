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

const CARDS_ADDRESS = '0xEB8210367814725d2F787C3040Eeb18684EA7E09'

const Collection: React.FC = () => {
  const { account, chainId, library } = useWeb3React()

  const [contract, setContract] = React.useState(undefined)

  const init = (_account: any, _library: any): void => {
    console.log('init')
    const web3 = new Web3(_library.provider)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const test = new web3.eth.Contract(CARDS_ABI, CARDS_ADDRESS)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setContract(test)
  }

  const buy = async (): Promise<void> => {
    // const web3 = new Web3(library.provider)
    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-ignore
    // const test = new web3.eth.Contract(CARDS_ABI, CARDS_ADDRESS)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // setContract(test)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (contract.methods) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const data = await contract.methods.buy_starter().send({ from: account })
      console.log('data', data)
    }
  }

  React.useEffect(() => {
    if (!!account && !!library) {
      init(account, library)
    }
    console.log('yoyo')
  }, [account, library])

  return (
    <BaseLayout>
      <Typography variant='h1'>Collection</Typography>
      {contract && <Button onClick={buy}>Buy Booster pack</Button>}
    </BaseLayout>
  )
}

export default Collection
