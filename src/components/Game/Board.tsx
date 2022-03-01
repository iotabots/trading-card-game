import React from 'react'
import { Box } from '@mui/material'
import { CardStack } from '../../types'

interface BoardProps {
  board: CardStack
  me: boolean
}

interface AttackState {
  attackerId: number | null
  defenderId: number | null
}

const Board: React.FC<BoardProps> = (props) => {
  const { board, me } = props
  // const [attack, setAttack] = React.useState<AttackState>({
  //   attackerId: null,
  //   defenderId: null
  // })
  // const onAttack =
  //   (cardId: number): any => {
  //     if (me && !!cardId) {
  //       console.log(`It's my card at ${cardId}`)
  //       const updatedAttacker = {
  //         attackerId: cardId,
  //         defenderId: attack?.defenderId
  //       }
  //       setAttack(updatedAttacker)
  //     } else {
  //       const updatedDefender = {
  //         attackerId: attack?.attackerId,
  //         defenderId: cardId,
  //       }
  //       setAttack(updatedDefender)
  //     }

  //     // Game ID
  //     // Card ID Player
  //     // Card ID Attacker
  //   }
  console.log('Board', board)


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
          // onClick={() => onAttack(parseInt(item, 2))}
          // onClick={() => console.log('Attack')}
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