import { Typography } from '@iotabots/components'
import { Box } from '@mui/material'
import React from 'react'

interface EnergyProps {
  value: number
  max: number
  icon: JSX.Element
  color: 'info' | 'error'
}

const Energy: React.FC<EnergyProps> = (props) => {
  const { value, max, icon, color } = props

  const boxes = []
  // eslint-disable-next-line no-plusplus
  for (let j = 1; j <= max; j++) {
    boxes.push(j)
  }

  return (
    <Box display='flex'
      alignItems='center'
      width='100%'
      position='relative'
      sx={{
        '& svg': {
          color: `${color}.main`,
          height: 24,
          width: 24
        }
      }}>
      {icon}
      <Box
        position='relative'
        ml={2}
        display='flex'
        bgcolor='transparent'
        borderRadius='8px'
        width='100%'
        height='13px'
      >
        <Box
          display='flex'
          position='absolute'
          top='0'
          left='0'
          width='100%'
          height='100%'
          py='1px'
          borderRadius='10px'
          overflow='hidden'
        >
          {boxes.length > 0 && boxes.map((box) => (
            <Box
              key={box}
              display='flex'
              justifyContent='center'
              alignItems='center'
              flexGrow='1'
              mx='1px'
              borderRadius='1px'
              bgcolor='rgba(255,255,255,0.5)'
              sx={{
                bgcolor: box <= value
                  ? `${color}.main`
                  : 'rgba(0,0,0,0.66)',
                '&:first-child': {
                  borderTopLeftRadius: '6px',
                  borderBottomLeftRadius: '6px'
                },
                '&:last-child': {
                  borderTopRightRadius: '6px',
                  borderBottomRightRadius: '6px'
                },
              }}
            />
          ))}
        </Box>
      </Box>
      <Box
        display='flex'
        flexWrap='nowrap'
        justifyContent='flex-end'
        position='absolute'
        right='0'
        top='20px'
        zIndex={2}
      >
        <Typography
          fontWeight='bold'
          color='rgba(255,255,255,1)'
          whiteSpace='nowrap'
          fontSize={12}
        >
          {value}
        </Typography>
        <Typography
          ml={1}
          fontWeight='bold'
          color='rgba(255,255,255,0.5)'
          whiteSpace='nowrap'
          fontSize={12}
        >
          / {max}
        </Typography>
      </Box>
    </Box>
  )
}

export default Energy