import { Button } from '@mui/material'
import { FlexContainer } from 'common/ui'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectIsLoggedIn } from 'services/reducers/authSlice'

type Props = {
  theme: string
  demo: boolean
  setDemo: (demo: boolean) => void
  toggleTheme: () => void
  logOutHandler: () => void
  downloadDemo: () => void
}

export const HeaderButtons = ({ theme, demo, toggleTheme, logOutHandler, downloadDemo, setDemo }: Props) => {
  let isLoggedIn = useSelector(selectIsLoggedIn)

  const redirectToLogin = () => {
    setDemo(false)
  }

  return (
    <FlexContainer jc="flex-end" gap={'10px'}>
      {demo && !isLoggedIn && (
        <Button variant="outlined" size="small" color="inherit" onClick={redirectToLogin}>
          <NavLink to="/login">login</NavLink>
        </Button>
      )}
      <Button variant="outlined" size="small" color="inherit" onClick={toggleTheme}>
        {theme}
      </Button>
      {!isLoggedIn && !demo && (
        <Button variant="outlined" size="small" color="inherit" onClick={downloadDemo}>
          demo
        </Button>
      )}
      {isLoggedIn && (
        <Button variant="outlined" size="small" color="inherit" onClick={logOutHandler}>
          <NavLink to="/login">logout</NavLink>
        </Button>
      )}
    </FlexContainer>
  )
}
