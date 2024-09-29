import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { configureStore, UnknownAction } from '@reduxjs/toolkit'
import { todolistsReducer, appReducer, authReducer, tasksReducer } from './reducers'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
  },
})

export type AppRootState = ReturnType<typeof store.getState>


export type AppDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction> 
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, UnknownAction> //in thunk to dispatch other thunk and any actions(like a main type)
