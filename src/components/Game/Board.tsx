import React from 'react'
import { Box } from '@mui/material'
import { CardStack } from '../../types'
import { GameContext } from '../../contexts/GameContext'

interface BoardProps {
  board: CardStack
  me: boolean
}

const Board: React.FC<BoardProps> = (props) => {
  const { board, me } = props
  const { fight, setFight } = React.useContext(GameContext)

  const onAttack = (cardId: number): any => {
    if (me) {
      setFight({
        defender: fight.defender,
        attacker: cardId
      })
    } else {
      setFight({
        defender: cardId,
        attacker: fight.attacker
      })
    }
  }

  return (
    <Box
      className='board'
      display='flex'
      width='100%'
    >
      {board.cards.map((item, index) => (
        <Box
          // eslint-disable-next-line react/no-array-index-key
          key={`${me ? 'player' : 'opponent'}-board-${index}`}
          className={`${me ? 'player' : 'opponent'}-board-${index}`}
          component='button'
          onClick={() => onAttack(Number(item))}
          sx={{
            bgcolor: item !== '0'
              ? 'rgba(0,0,0,0.5)'
              : 'rgba(0,0,0,0.25)',
            borderRadius: '8px',
            border: 'none',
            height: 240,
            width: '100%',
            mx: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: me ? 'none' : '5px solid',
            borderTop: me ? '5px solid' : 'none',
            borderColor: 'transparent',
            transition: 'all ease-in-out 200ms',
            '&:hover': {
              borderColor: 'primary.main',
              cursor: 'pointer'
            }
          }}>
          <Box
            sx={{
              backgroundImage:
                `url('https://assets.iotabots.io/tcg/${item}.png')`,
              height: '90%',
              width: '100%',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }} />

        </Box>
      ))}
    </Box>
  )
}

export default Board