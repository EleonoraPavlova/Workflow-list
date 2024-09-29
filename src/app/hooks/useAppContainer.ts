import { CircularProgress, createTheme, styled } from '@mui/material'
import { blue, purple } from '@mui/material/colors'
import { appThunks, selectAppInitialized } from 'services/reducers/appSlice'
import { useActions } from 'common/hooks'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export function useAppContainer() {
  const { setAppInitializeTC } = useActions(appThunks)
  let initialized = useSelector(selectAppInitialized) //first initialization

  let [lightMode, setLightMode] = useState<boolean>(true)
  let theme = lightMode ? 'dark' : 'light'
  const themeHandler = createTheme({
    palette: {
      primary: blue,
      secondary: purple,
      mode: lightMode ? 'light' : 'dark',
    },
  })

  const toggleTheme = () => {
    setLightMode(!lightMode)
  }

  const CustomCircularProgress = styled(CircularProgress)(({ theme }) => ({
    '& circle': {
      strokeWidth: 2,
    },
  }))

  useEffect(() => {
    if (!initialized) {
      setAppInitializeTC()
    }
  }, [])

  return { lightMode, themeHandler, theme, CustomCircularProgress, toggleTheme }
}
