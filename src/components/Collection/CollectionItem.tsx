/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { Box, Grid, Typography } from '@iotabots/components'
import { BoxProps } from '@mui/material'
import Card from './Card'

interface CollectionItemProps extends BoxProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any
}

const CollectionItem: React.FC<CollectionItemProps> = (props) => {
  const { item } = props
  return (
    <Grid item xs={3} justifyContent='center'>
      <Card
        number={item[0].id}
        sx={{ opacity: `${parseInt(item[1], 10) > 0 ? 1 : 0.25}` }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2
        }}>
        <Box sx={{
          bgcolor: 'rgba(0,0,0,0.5)',
          borderRadius: '4px',
          p: 1,
          px: 2,
        }}
        >
          <Typography fontWeight='bold'>{item[1]}</Typography>
        </Box>
      </Box>
    </Grid>
  )
}

export default CollectionItem