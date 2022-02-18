/* eslint-disable max-len */
import { Box } from '@iotabots/components'
import { BoxProps } from '@mui/material'
import React from 'react'

const BackCard: React.FC<BoxProps> = (props) => (
  <Box
    {...props}
    sx={{
      position: 'absolute',
      height: 200,
      width: 142,
      bottom: 'auto',
      backgroundImage: 'url(https://lh3.googleusercontent.com/fife/AAWUweX36sqR_B4OlxZ4_Hku4jzfUMAwhjMo8R1PudD4amsqUdRAkwhE0k1L49Gnj0Q_vF2j-yuhr8G7x8czlbiH8qPS26t0qmuavX1uZSvud6MJdX59dSXEUpRteSAIqsS7qZ17wWa3-L2-7RP8pnD4-czsjAnRa6sFRrxTnyTqub8ojyVOjUPMLsSy1U4Jm0olX3EISWidvlz1x1N5aXXJGfxOfgCenxghljsfh5qzGtD3Pt_7Wt6JwYzkSv_tnUvsXfPtd19T8rcJXjLy5WDl8yZZOb4omshMJ0XYUNS6cCTIW7Wu9rljE8IJUfjZtS6z9TDVi7M3ygycxgJjqFWw3KkV6BIp16a3DfriO6Mso9tV7iZg7i9OxqJoyngmrXiBp-xbwyOwK4TC4-mqKvMNpAoN2of-jbRSscy8vbaETo831Qm4Bc4oYrSyfEf6zj_mELXJgLqgtX4RQZkY6VzuoKxcneleBvh0JES1vDdfcGUhrdFbEyVeAVmbkLNjbf-jIQOxmwWqBq7DB99nikR63ok48tiF6kHKr_Coo8Y4PZRWXaJo-U7-zeMcUsfVFtf14LEVdYoj1-3Op81WQBCA7gC7qRG__8bKX8P3sCS1KoZwrb5C9bGdBA3XvlQnmDa-kRRotmixjcTPM0Wn4OcodF8jnuPGlXqZ02kqrYRIT2B4mTPdrgyF0CY-4SxOwEGnGd-uYeAIPrgsGhbqmw0pgBa0KdQmUp_sXnY=w2560-h1304-ft)',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      transform: 'rotateX(51deg) rotateZ(-32deg)',
      transformStyle: 'preserve-3d',
      borderRadius: '8px',
      boxShadow: '1px 1px 0 1px #f9f9fb, -1px 0 8px 0 rgba(34, 33, 81, 0.01), 8px 8px 8px 0 rgba(34, 33, 81, 0.25)',
      transition: '0.4s ease-in-out all, 0.4s ease-in-out box-shadow',
      '&.active:hover': {
        transform: 'translate3d(4px, 0px, 0px)',
      }
    }}
  />
)

export default BackCard