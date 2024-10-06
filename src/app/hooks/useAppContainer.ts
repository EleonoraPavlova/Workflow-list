import { CircularProgress, createTheme, styled } from '@mui/material'
import { blue, purple } from '@mui/material/colors'
import { useState } from 'react'

export function useAppContainer() {
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

  return { lightMode, themeHandler, theme, CustomCircularProgress, toggleTheme }
}
