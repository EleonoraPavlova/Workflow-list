import { forwardRef } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { selectAppError, selectAppSuccess, setAppErrorAC, setAppSuccessAC } from 'services/reducers/appSlice'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'common/hooks'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const SnackBar = () => {
  const error = useSelector(selectAppError)
  const success = useSelector(selectAppSuccess)

  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    dispatch(setAppErrorAC({ error: null }))
    dispatch(setAppSuccessAC({ success: null }))
  }

  if (!error && !success) return null

  return (
    <Snackbar open={!!error || !!success} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity={success ? 'success' : 'error'} onClose={handleClose} sx={{ width: '100%', color: 'white' }}>
        {success ? success : error}
      </Alert>
    </Snackbar>
  )
}
