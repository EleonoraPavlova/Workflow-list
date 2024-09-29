
import { PayloadAction, createSlice, isFulfilled } from '@reduxjs/toolkit'
import { authApi } from 'services/api'
import { appThunks, setAppSuccessAC } from '../appSlice'
import { createAppAsyncThunk } from 'common/utils'
import { LoginParams } from 'common/types'
import { ResultCode } from 'common/enums'
import { clearTasksTodolists } from 'services/actions'

export const initialAuthState = {
  email: '',
  password: '',
  rememberMe: false,
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isFulfilled(loginTC, logOutTC, appThunks.setAppInitializeTC),
        (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
          state.isLoggedIn = action.payload.isLoggedIn
        }
      )
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

const loginTC = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParams>(
  `${authSlice.name}/login`,
  async (params, { dispatch, rejectWithValue }) => {
    const res = await authApi.login(params)
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      dispatch(setAppSuccessAC({ success: 'Authorization was successful' }))
      return { isLoggedIn: true }
    } else {
      return rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
    }
  }
)

const logOutTC = createAppAsyncThunk<{ isLoggedIn: boolean }>(
  `${authSlice.name}/logOut`,
  async (_, { dispatch, rejectWithValue }) => {
    const res = await authApi.logOut()
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      dispatch(setAppSuccessAC({ success: 'You have successfully logged out' }))
      dispatch(clearTasksTodolists())
      return { isLoggedIn: false }
    } else {
      return rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
    }
  }
)

export const authReducer = authSlice.reducer
export const authThunks = { loginTC, logOutTC }
export const { selectIsLoggedIn } = authSlice.selectors
