import { PayloadAction, createSlice, isAnyOf, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils'
import { ResultCode } from 'common/enums'
import { RequestStatus } from 'common/types'
import { authApi } from 'services/api'
import { todolistsThunks } from '../todolistsSlice'

type AppStartState = {
  status: RequestStatus
  error: string | null
  success: string | null
  initialized: boolean
}

export const appStartState: AppStartState = {
  status: 'idle',
  error: null,
  success: null,
  initialized: false, 
}

const appSlice = createSlice({
  name: 'app',
  initialState: appStartState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    // setAppStatusAC(state, action: PayloadAction<{ status: RequestStatus }>) {
    //   state.status = action.payload.status
    // },
    setAppSuccessAC(state, action: PayloadAction<{ success: string | null }>) {
      state.success = action.payload.success
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(setAppInitializeTC.fulfilled, (state) => {
      //   state.initialized = true
      // })
      .addMatcher(isAnyOf(setAppInitializeTC.fulfilled, setAppInitializeTC.rejected), (state) => {
        state.initialized = true
      })
      .addMatcher(isPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(isRejected, (state, action: any) => {
        state.status = 'failed'
        console.log('action', action)
        if (action.payload) {
          if (
            action.type === todolistsThunks.addTodolistTC.rejected.type ||
            action.type === setAppInitializeTC.rejected.type
          )
            return
          state.error = action.payload.errors[0]
        } else {
          state.error = action.error.message ? action.error.message : 'Some error occurred'
        }
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = 'succeeded'
      })
  },
  selectors: {
    selectAppStatus: (sliceState) => sliceState.status,
    selectAppError: (sliceState) => sliceState.error,
    selectAppSuccess: (sliceState) => sliceState.success,
    selectAppInitialized: (sliceState) => sliceState.initialized,
  },
})

const setAppInitializeTC = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${appSlice.name}/appInitialize`,
  async (_, { rejectWithValue }) => {
    const res = await authApi.checkAuthMe()
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      // dispatch(setIsLoggedInAC({ isLoggedIn: true }))
      return { isLoggedIn: true } // анонимный пользователь или авторизованный/and show loader of course
    } else {
      return rejectWithValue(res.data)
    }
  }
)

export const appReducer = appSlice.reducer
export const appThunks = { setAppInitializeTC }
export const { setAppErrorAC, setAppSuccessAC } = appSlice.actions
export const { selectAppStatus, selectAppError, selectAppSuccess, selectAppInitialized } = appSlice.selectors
