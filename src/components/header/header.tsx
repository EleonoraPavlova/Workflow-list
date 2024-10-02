import { Menu } from '@mui/icons-material'
import { AppBar, Button, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectAppStatus } from 'services/reducers/appSlice'
import { authThunks, selectIsLoggedIn } from 'services/reducers/authSlice'
import { useActions } from 'common/hooks'
import { FlexContainer } from 'components/flex-container'

type Props = {
  theme: string
  toggleTheme: () => void
}

export const Header = ({ theme, toggleTheme }: Props) => {
  let status = useSelector(selectAppStatus)
  let isLoggedIn = useSelector(selectIsLoggedIn)
  const { logOutTC } = useActions(authThunks)

  const logOutHandler = useCallback(() => {
    logOutTC()
  }, [logOutTC])

  return (
    <AppBar position="static" sx={{ borderRadius: '5px', backgroundColor: '#8c61ff' }}>
      <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FlexContainer>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6">Todolist</Typography>
        </FlexContainer>
        {!isLoggedIn && (
          <FlexContainer jc="flex-end">
            <Button
              variant="outlined"
              size="small"
              color={'inherit'}
              onClick={() => console.log('demo')}
              sx={{ mr: '10px' }}>
              demo
            </Button>
            <Button
              variant="outlined"
              size="small"
              color={'inherit'}
              onClick={() => console.log('real date')}
              sx={{ mr: '10px' }}>
              real date
            </Button>
          </FlexContainer>
        )}
        <FlexContainer jc="flex-end">
          <Button variant="outlined" size="small" color={'inherit'} onClick={toggleTheme} sx={{ mr: '10px' }}>
            {theme}
          </Button>
          {isLoggedIn && (
            <Button variant="outlined" size="small" color={'inherit'} onClick={logOutHandler} sx={{ mr: '10px' }}>
              <NavLink to="/login">Log Out</NavLink>
            </Button>
          )}
        </FlexContainer>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  )
}
