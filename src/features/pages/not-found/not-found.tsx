import { Typography } from '@mui/material'
import { FlexContainer, Page } from 'common/ui'

export const NotFound = () => {
  return (
    <Page>
      <FlexContainer jc="center">
        <Typography variant="h5" sx={{ color: '#c2c5cc' }}>
          404: PAGE NOT FOUND
        </Typography>
      </FlexContainer>
    </Page>
  )
}
