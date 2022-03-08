/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { Box, Grid, Typography } from '@iotabots/components'
import { BoxProps } from '@mui/material'
import Card from './Card'
import Badge from '../Menu/Badge'

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
          mt: -5
        }}>
        <Badge>{item[1]}</Badge>
      </Box>
    </Grid>
  )
}

export default CollectionItem