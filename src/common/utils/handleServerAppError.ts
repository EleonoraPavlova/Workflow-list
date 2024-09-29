import { setAppErrorAC } from 'services/reducers/appSlice'
import { Dispatch } from 'redux'

export const handleServerAppError = (messages: string[], dispatch: Dispatch, showGlobalError: boolean = true) => {
  if (showGlobalError) {
    dispatch(setAppErrorAC({ error: messages.length ? messages[0] : 'Some error occurred' })) //comes error text from server
  }
}
