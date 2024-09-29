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
import { Box, Grid2, Grid } from '@mui/material'
import { useLogin } from './hooks/useLogin'

type Props = {
  lightMode: boolean
}

export const Login = ({ lightMode }: Props) => {
  const { formik } = useLogin()
  const navigate = useNavigate()
  let isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn])

  return (
    <Grid2 container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <Box
          sx={{
            backgroundColor: lightMode ? 'white' : '#1e1e1e',
            padding: '10px 25px',
            marginTop: '10px',
            borderRadius: '5px',
          }}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormLabel sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', height: '45px' }}>
                  <span>Email:</span> <h6>free@samuraijs.com</h6>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', height: '30px' }}>
                  <span>Password:</span> <h6>free</h6>
                </Box>
              </FormLabel>
              <FormGroup>
                <TextField
                  label="Email"
                  margin="normal"
                  autoComplete="email"
                  error={!!(formik.touched.email && formik.errors.email)}
                  {...formik.getFieldProps('email')}
                />

                {formik.touched.email && formik.errors.email ? (
                  <h6 style={{ color: 'red', margin: '0px' }}>{formik.touched.email && formik.errors.email}</h6>
                ) : null}

                <TextField
                  label="Password"
                  margin="normal"
                  type="password"
                  autoComplete="password"
                  error={!!(formik.touched.password && formik.errors.password)}
                  {...formik.getFieldProps('password')}
                />

                {formik.touched.password && formik.errors.password ? (
                  <h6 style={{ color: 'red', margin: '0px' }}>{formik.touched.password && formik.errors.password}</h6>
                ) : null}

                <FormControlLabel
                  label={'Remember me'}
                  control={<Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe} />}
                  sx={{ marginBottom: '15px', color: lightMode ? '#1e1e1e' : 'white' }}
                />

                <Button
                  type={'submit'}
                  variant={'contained'}
                  color={'primary'}
                  sx={{ color: 'white', margin: '20px 0' }}
                  disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)}>
                  Login
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </Box>
      </Grid>
    </Grid2>
  )
}
