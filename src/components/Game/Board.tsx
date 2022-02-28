import React from 'react'
import { Box } from '@mui/material'
import { CardType } from '../../types'

interface BoardProps {
  board: CardType[]
}

const Board: React.FC<BoardProps> = (props) => {
  const { board } = props
  return (
    <Box
      className='board'
      display='flex'
      width='100%'
    >
      {[0, 1, 2, 3, 4].map((item) => (
        <Box
          key={item}
          component='button'
          sx={{
            bgcolor: board[item] ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.25)',
            borderRadius: '8px',
            border: 'none',
            height: 240,
            width: '100%',
            mx: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {board[item] && (
            <Box
              sx={{
                backgroundImage: `url(${board[item].image})`,
                height: '90%',
                width: '100%',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }} />
          )}

        </Box>
      ))}
    </Box>
  )
}

export default Board