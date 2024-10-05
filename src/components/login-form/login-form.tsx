import { useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'services/reducers/authSlice'
import { useLogin } from './hooks/useLogin'
import { FlexContainer } from 'common/ui'
import s from './login-form.module.scss'

type Props = {
  lightMode: boolean
}

export const LoginForm = ({ lightMode }: Props) => {
  const { formik } = useLogin()
  const navigate = useNavigate()
  let isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn])
  console.log('isLoggedIn', isLoggedIn)
  return (
    <form onSubmit={formik.handleSubmit} className={`${s.form} ${lightMode ? s.light : s.dark}`}>
      <FormControl className={s.formControl}>
        <FormLabel sx={{ textAlign: 'center' }}>
          <FlexContainer gap={'10px'} ai={'flex-start'} fd={'column'}>
            <span> Email: free@samuraijs.com (for real data)</span>
            <span>Password: free</span>
          </FlexContainer>
        </FormLabel>
        <FormGroup className={s.formGroup}>
          <TextField
            label="Email"
            margin="none"
            autoComplete="email"
            className={s.textField}
            error={!!(formik.touched.email && formik.errors.email)}
            {...formik.getFieldProps('email')}
          />

          {formik.touched.email && formik.errors.email ? (
            <h6 className={s.h6}>{formik.touched.email && formik.errors.email}</h6>
          ) : null}

          <TextField
            label="Password"
            margin="none"
            type="password"
            autoComplete="password"
            error={!!(formik.touched.password && formik.errors.password)}
            {...formik.getFieldProps('password')}
          />

          {formik.touched.password && formik.errors.password ? (
            <h6 className={s.h6}>{formik.touched.password && formik.errors.password}</h6>
          ) : null}

          <FormControlLabel
            label={'Remember me'}
            control={<Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe} />}
            className={`${lightMode ? s.light : s.dark}`}
          />

          <Button
            type={'submit'}
            variant={'contained'}
            sx={{ backgroundColor: '#8c61ff' }}
            className={s.button}
            disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)}>
            Login
          </Button>
        </FormGroup>
      </FormControl>
    </form>
  )
}
