import { createAppAsyncThunk, handleServerAppError } from 'common/utils'
import { FilterValues, RequestStatus, Todolist, TodolistDomain } from 'common/types'
import { ResultCode } from 'common/enums'
import { clearTasksTodolists } from 'services/actions'
import { todolistsApi } from 'services/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setAppSuccessAC } from '../appSlice'

type ParamUpdateTodolist = {
  todoListId: string
  title: string
  filter: FilterValues
}

const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: {
    todolists: [] as TodolistDomain[],
  },
  reducers: {
    changeStatusTodolistAC(state, action: PayloadAction<{ entityStatus: RequestStatus; todoListId: string }>) {
      const index = state.todolists.findIndex((t) => t.id === action.payload.todoListId)
      if (index > -1) state.todolists[index].entityStatus = action.payload.entityStatus
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodolistTC.fulfilled, (state, action) => {
        return action.payload.todolists.forEach((tl) => {
          state.todolists.push({
            ...tl,
            filter: 'all',
            entityStatus: 'idle',
          })
        })
      })
      .addCase(removeTodolistTC.fulfilled, (state, action) => {
        const index = state.todolists.findIndex((t) => t.id === action.payload.todoListId)
        if (index > -1) state.todolists.splice(index, 1)
      })
      .addCase(addTodolistTC.fulfilled, (state, action) => {
        state.todolists.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
      })
      .addCase(updateTodolistTC.fulfilled, (state, action) => {
        const index = state.todolists.findIndex((t) => t.id === action.payload.todoListId)
        if (index > -1) state.todolists[index] = { ...state.todolists[index], ...action.payload }
      })
      .addCase(clearTasksTodolists, () => {
        return { todolists: [] }
      })
  },
  selectors: {
    selectTodolists: (state) => state.todolists,
  },
})

const getTodolistTC = createAppAsyncThunk<{ todolists: Todolist[] }>(
  `${todolistsSlice.name}/getTodolist`,
  async (params) => {
    const res = await todolistsApi.getTodoslists()
    return { todolists: res.data }
  }
)

const removeTodolistTC = createAppAsyncThunk<{ todoListId: string }, string>(
  `${todolistsSlice.name}/removeTodolist`,
  async (todoListId, { dispatch, rejectWithValue }) => {
    dispatch(changeStatusTodolistAC({ entityStatus: 'loading', todoListId }))
    const res = await todolistsApi.deleteTodoslist(todoListId).finally(() => {
      dispatch(changeStatusTodolistAC({ entityStatus: 'idle', todoListId }))
    })
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      dispatch(setAppSuccessAC({ success: 'todolist was successful removed' }))
      return { todoListId }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const addTodolistTC = createAppAsyncThunk<{ todolist: Todolist }, string>(
  `${todolistsSlice.name}/addNewTodolist`,
  async (title: string, { dispatch, rejectWithValue }) => {
    const res = await todolistsApi.createTodoslist(title)
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      dispatch(setAppSuccessAC({ success: 'todolist was successful added' }))
      return { todolist: res.data.data.item }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const updateTodolistTC = createAppAsyncThunk<ParamUpdateTodolist, ParamUpdateTodolist>(
  `${todolistsSlice.name}/updateTodolist`,
  async (param, { dispatch, rejectWithValue }) => {
    const res = await todolistsApi.updateTodoslist(param.todoListId, param.title)
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      dispatch(setAppSuccessAC({ success: 'todolist was successfully updated' }))
      return param
    } else {
      handleServerAppError(res.data.messages, dispatch, false)
      return rejectWithValue(null)
    }
  }
)

export const todolistsReducer = todolistsSlice.reducer
export const todolistsThunks = { getTodolistTC, removeTodolistTC, addTodolistTC, updateTodolistTC }
export const { changeStatusTodolistAC } = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors
