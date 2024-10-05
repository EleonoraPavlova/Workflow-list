import { Menu } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import { authThunks, selectIsLoggedIn } from 'services/reducers/authSlice'
import { useActions } from 'common/hooks'
import { FlexContainer } from '../flex-container'
import { HeaderButtons } from 'components'
import { useNavigate } from 'react-router-dom'

type Props = {
  theme: string
  toggleTheme: () => void
  setDemo: (demo: boolean) => void
}

export const Header = ({ theme, toggleTheme, setDemo }: Props) => {
  let isLoggedIn = useSelector(selectIsLoggedIn)
  const navigate = useNavigate()
  const { logOutTC } = useActions(authThunks)

  const logOutHandler = useCallback(() => {
    logOutTC()
  }, [logOutTC])

  const downloadDemoHandler = useCallback(() => {
    setDemo(true)
    navigate('/')
  }, [navigate, setDemo])

  console.log('demo')
  return (
    <AppBar position="static" sx={{ borderRadius: '5px', backgroundColor: '#8c61ff' }}>
      <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FlexContainer>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6">Todolist</Typography>
        </FlexContainer>
        <HeaderButtons
          isLoggedIn={isLoggedIn}
          theme={theme}
          toggleTheme={toggleTheme}
          logOutHandler={logOutHandler}
          downloadDemo={downloadDemoHandler}
        />
      </Toolbar>
    </AppBar>
  )
}
