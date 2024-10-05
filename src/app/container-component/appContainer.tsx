import { ThemeProvider } from '@mui/material'
import { useSelector } from 'react-redux'

import { useAppContainer } from 'app/hooks/useAppContainer'
import { selectAppInitialized } from 'services/reducers/appSlice'
import { RoutesComponent } from 'features/routers'
import { FlexContainer, Header, SnackBar } from 'common/ui'
import { useState } from 'react'

export const AppContainer = () => {
  let initialized: boolean = useSelector(selectAppInitialized) //first initialization

  let [demo, setDemo] = useState<boolean>(false)

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
      <Header theme={theme} toggleTheme={toggleTheme} setDemo={setDemo} demo={demo} />
      <RoutesComponent demo={demo} lightMode={lightMode} />
      <SnackBar />
    </ThemeProvider>
  )
}
export default AppContainer
