import { Typography } from '@mui/material'
import { FlexContainer } from 'common/ui'
import s from './header-logo.module.scss'

type Props = {
  alt?: string
  src: string
}

export const HeaderLogo = ({ alt = 'logo', src }: Props) => {
  return (
    <FlexContainer jc="flex-start" gap={'10px'}>
      <Typography variant="h1" sx={{ fontSize: '2rem' }}>
        CogniKids
      </Typography>
      <img alt={alt} src={src} className={s.image} />
    </FlexContainer>
  )
}
