import { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './button.module.scss'

type InferType<T> = T extends ElementType<infer U> ? U : never

type Props<T extends ElementType = 'button'> = {
  as?: T
  variant?: 'primary' | 'green' | 'standart' | 'info'
} & ComponentPropsWithoutRef<T>

export const Button = forwardRef(
  <T extends ElementType = 'button'>(props: Props<T>, ref: ForwardedRef<InferType<T>>) => {
    const { as: Component = 'button', className, variant = 'standart', ...rest } = props

    const cn = clsx(s.button, s[variant], className)

    return <Component className={cn} ref={ref} {...rest} />
  }
)
