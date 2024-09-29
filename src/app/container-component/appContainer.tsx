import { ThemeProvider } from '@mui/material'
import { useSelector } from 'react-redux'

import { FlexContainer } from 'components/flex-container'
import { Header, SnackBar } from 'components'
import { useAppContainer } from 'app/hooks/useAppContainer'
import { selectAppInitialized } from 'services/reducers/appSlice'
import { RoutesComponent } from 'features/routers'

type Props = {
  demo?: boolean
}

export const AppContainer = ({ demo = false }: Props) => {
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
