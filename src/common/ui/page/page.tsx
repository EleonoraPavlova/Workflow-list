import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { LinearProgress } from '@mui/material'
import clsx from 'clsx'

import s from './page.module.scss'
import { useSelector } from 'react-redux'
import { selectAppStatus } from 'services/reducers/appSlice'

type Props = {
  mt?: CSSProperties['marginTop']
} & ComponentPropsWithoutRef<'div'>

type RefProps = ElementRef<'div'>

export const Page = forwardRef<RefProps, Props>((props, ref) => {
  const { className, mt = '40px', style, ...rest } = props
  let status = useSelector(selectAppStatus)

  const cn = clsx(s.page, className)

  const pageStyles = { marginTop: mt, ...style }

  return (
    <>
      {status === 'loading' && (
        <LinearProgress
          sx={{
            backgroundColor: 'transparent',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#8c61ff',
            },
          }}
        />
      )}
      <div className={cn} ref={ref} style={pageStyles} {...rest} />
    </>
  )
})
