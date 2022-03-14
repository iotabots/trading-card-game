import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import {
  injected,
  useEagerConnect,
  useInactiveListener,
} from '@iotabots/components'
import Button from '../Button'

enum ConnectorNames {
  Injected = 'Connect',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
}
const ConnectButton: React.FC = () => {
  // Do something
  const context = useWeb3React<Web3Provider>()
  const { activate } = context

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  /* handle logic to eagerly connect to the injected ethereum provider, 
    if it exists and has granted access already */
  const triedEager = useEagerConnect()

  /* handle logic to connect in reaction to certain events on the injected
    ethereum provider, if it exists */
  useInactiveListener({ suppress: !triedEager || !!activatingConnector })

  const currentConnector = connectorsByName.Connect
  const activating = currentConnector === activatingConnector

  return (
    <Button
      color='secondary'
      onClick={(): void => {
        setActivatingConnector(currentConnector)
        activate(connectorsByName.Connect)
      }}
    >
      {activating ? '...' : 'Connect'}
    </Button>
  )
}

export default ConnectButton
