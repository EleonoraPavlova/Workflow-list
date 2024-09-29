import { Typography } from '@mui/material'

export const NotFound = () => {
  return (
    <Typography
      variant="h5"
      sx={{
        padding: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#c2c5cc',
      }}>
      404: PAGE NOT FOUND
    </Typography>
  )
}
