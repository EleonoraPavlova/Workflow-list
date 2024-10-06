import { ThemeProvider } from '@mui/material'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { useAppContainer } from 'app/hooks/useAppContainer'
import { appThunks, selectAppInitialized } from 'services/reducers/appSlice'
import { RoutesComponent } from 'features/routers'
import { FlexContainer, Header, SnackBar } from 'common/ui'
import { useActions } from 'common/hooks'

export const AppContainer = () => {
  let initialized = useSelector(selectAppInitialized) //first initialization
  const { setAppInitializeTC } = useActions(appThunks)

  let [demo, setDemo] = useState<boolean>(false)

  const { lightMode, themeHandler, theme, CustomCircularProgress, toggleTheme } = useAppContainer()

  useEffect(() => {
    if (!initialized) {
      setAppInitializeTC()
    }
  }, [initialized])

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
