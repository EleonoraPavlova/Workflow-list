import { FlexContainer, Page } from 'common/ui'
import { LoginForm } from 'components'

type Props = {
  lightMode: boolean
}

export const LoginPage = ({ lightMode }: Props) => {
  return (
    <Page>
      <FlexContainer jc="center" fd={'column'}>
        <LoginForm lightMode={lightMode} />
      </FlexContainer>
    </Page>
  )
}
