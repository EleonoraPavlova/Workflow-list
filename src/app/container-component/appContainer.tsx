import { ThemeProvider } from '@mui/material'
import { useSelector } from 'react-redux'

import { useAppContainer } from 'app/hooks/useAppContainer'
import { selectAppInitialized } from 'services/reducers/appSlice'
import { RoutesComponent } from 'features/routers'
import { FlexContainer, Header, SnackBar } from 'common/ui'

export const AppContainer = () => {
  let initialized = useSelector(selectAppInitialized) //first initialization

  const { lightMode, themeHandler, theme, CustomCircularProgress, toggleTheme } = useAppContainer()

  if (!initialized) {
    return (
      <FlexContainer jc="center">
        <CustomCircularProgress />
      </FlexContainer>
    )
  }
  return (
    <ThemeProvider theme={themeHandler}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <RoutesComponent lightMode={lightMode} />
      <SnackBar />
    </ThemeProvider>
  )
}
export default AppContainer
