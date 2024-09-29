import React from 'react'
import { useAppDispatch } from 'common/hooks'
import { useFormik } from 'formik'
import { authThunks } from 'services/reducers/authSlice'
import { LoginParams, ResponseData, ThunkErrorApiConfig } from 'common/types'

export function useLogin() {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    validate: (values) => {
      const errors: Partial<LoginParams> = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 4) {
        errors.password = 'Must be more 4 symbols'
      }

      return errors
    },

    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },

    onSubmit: (values, { setFieldError, setSubmitting }) => {
      setSubmitting(true)

      dispatch(authThunks.loginTC(values))
        .unwrap()
        .then(() => {})
        .catch((data: ResponseData | ThunkErrorApiConfig | { message: string }) => {
          if ('errors' in data) {
            const error = data as ThunkErrorApiConfig
            setFieldError('email', error.errors[0])
            setFieldError('password', error.errors[0])
          } else if ('message' in data) {
            setFieldError('email', data.message)
            setFieldError('password', data.message)
          } else {
            data.fieldsErrors.forEach((el) => {
              setFieldError(el.field, el.error)
            })
          }
        })
      setSubmitting(false)
    },
  })

  return { formik }
}
