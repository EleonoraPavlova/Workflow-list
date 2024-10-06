import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FlexContainer, Page } from 'common/ui'
import { LoginForm } from 'components'
import { selectIsLoggedIn } from 'services/reducers/authSlice'

type Props = {
  lightMode: boolean
}

export const LoginPage = ({ lightMode }: Props) => {
  const navigate = useNavigate()
  let isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn])

  return (
    <Page>
      <FlexContainer jc="center" fd={'column'}>
        <LoginForm lightMode={lightMode} />
      </FlexContainer>
    </Page>
  )
}
