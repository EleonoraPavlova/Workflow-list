import { Box, ThemeProvider } from '@mui/material'
import { useSelector } from 'react-redux'
import { useApp } from './hooks/useApp'
import { Header } from 'components/header/header'

import { selectAppInitialized } from '../services/reducers/appSlice'
import { RoutesComponent } from 'features/routers/RoutesComponent'
import { FlexContainer } from 'components/flex-container'
import { SnackBar } from 'components'

type Props = {
  demo?: boolean //download moc state
}

export const App = ({ demo = false }: Props) => {
  let initialized = useSelector(selectAppInitialized) //first initialization

  const { lightMode, themeHandler, theme, CustomCircularProgress, toggleTheme } = useApp()

  if (!initialized) {
    return (
      <FlexContainer jc='center'>
        <CustomCircularProgress />
      </FlexContainer>
    )
  }
  return (
    <ThemeProvider theme={themeHandler}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Box sx={{ margin: '0 60px' }}>
        <RoutesComponent lightMode={lightMode} />
      </Box>
      <SnackBar />
    </ThemeProvider>
  )
}
export default App
