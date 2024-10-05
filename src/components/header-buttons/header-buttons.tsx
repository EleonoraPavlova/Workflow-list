import { Button } from '@mui/material'
import { FlexContainer } from 'common/ui'
import { NavLink } from 'react-router-dom'

type Props = {
  isLoggedIn: boolean
  theme: string
  toggleTheme: () => void
  logOutHandler: () => void
}

export const HeaderButtons = ({ isLoggedIn, theme, toggleTheme, logOutHandler }: Props) => {
  return (
    <>
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
    </>
  )
}
