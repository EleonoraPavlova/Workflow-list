import { Menu } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { useCallback } from 'react'

import { authThunks } from 'services/reducers/authSlice'
import { useActions } from 'common/hooks'
import { FlexContainer } from '../flex-container'
import { HeaderButtons } from 'components'
import { useNavigate } from 'react-router-dom'

type Props = {
  theme: string
  demo: boolean
  toggleTheme: () => void
  setDemo: (demo: boolean) => void
}

export const Header = ({ theme, demo, toggleTheme, setDemo }: Props) => {
  const navigate = useNavigate()
  const { logOutTC } = useActions(authThunks)

  const logOutHandler = useCallback(() => {
    logOutTC()
  }, [logOutTC])

  const downloadDemoHandler = useCallback(() => {
    setDemo(true)
    navigate('/')
  }, [navigate, setDemo])

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
          demo={demo}
          theme={theme}
          toggleTheme={toggleTheme}
          setDemo={setDemo}
          logOutHandler={logOutHandler}
          downloadDemo={downloadDemoHandler}
        />
      </Toolbar>
    </AppBar>
  )
}
