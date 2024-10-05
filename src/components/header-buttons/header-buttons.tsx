import { Button } from '@mui/material'
import { FlexContainer } from 'common/ui'
import { NavLink } from 'react-router-dom'

type Props = {
  isLoggedIn: boolean
  theme: string
  toggleTheme: () => void
  logOutHandler: () => void
  downloadDemo: () => void
}

export const HeaderButtons = ({ isLoggedIn, theme, toggleTheme, logOutHandler, downloadDemo }: Props) => {
  return (
    <FlexContainer jc="flex-end" gap={'10px'}>
      <Button variant="outlined" size="small" color="inherit" onClick={toggleTheme}>
        {theme}
      </Button>
      {!isLoggedIn ? (
        <Button variant="outlined" size="small" color="inherit" onClick={downloadDemo}>
          demo
        </Button>
      ) : (
        <Button variant="outlined" size="small" color="inherit" onClick={logOutHandler}>
          <NavLink to="/login">Log Out</NavLink>
        </Button>
      )}
    </FlexContainer>
  )
}
