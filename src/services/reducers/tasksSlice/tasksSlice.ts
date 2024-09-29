import { setAppErrorAC, setAppSuccessAC } from '../appSlice'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'
import { AddTaskParams, Task, Tasks, UpdateTaskModel, UpdateTaskParams } from 'common/types'
import { ResultCode, TaskPriorities, TaskStatuses } from 'common/enums'
import { tasksApi } from 'services/api'
import { clearTasksTodolists } from 'services/actions'
import { AppRootState } from 'services/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todolistsThunks } from '../todolistsSlice'

const initialStateTasks: Tasks = {
  todoListId1: [
    {
      description: '',
      title: '',
      completed: false,
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      startDate: '',
      deadline: '',
      id: '',
      todoListId: '',
      order: 0,
      addedDate: '',
    },
  ],
  todoListId2: [
    {
      description: '',
      title: '',
      completed: false,
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      startDate: '',
      deadline: '',
      id: '',
      todoListId: '',
      order: 0,
      addedDate: '',
    },
  ],
}

type DeleteTaskParams = Omit<UpdateTaskParams, 'domainModel'>

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialStateTasks,
  reducers: {
    removeTaskAC: {
      reducer: (state, action: PayloadAction<{ todoListId: string; taskId: string }>) => {
        const tasks = state[action.payload.todoListId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index > -1) tasks.splice(index, 1)
      },
      prepare: (todoListId: string, taskId: string) => {
        return {
          payload: {
            todoListId,
            taskId,
          },
        }
      },
    },
    changeTaskTitleAC(state, action: PayloadAction<{ id: string; title: string; todoListId: string }>) {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex((t) => t.id === action.payload.id)
      if (index > -1) {
        tasks[index] = { ...tasks[index], title: action.payload.title }
      }
    },
    changeTaskStatusAC(state, action: PayloadAction<{ todoListId: string; id: string; status: TaskStatuses }>) {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex((t) => t.id === action.payload.id)
      if (index > -1) {
        tasks[index] = { ...tasks[index], status: action.payload.status }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsThunks.addTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsThunks.removeTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.todoListId]
      })
      .addCase(todolistsThunks.getTodolistTC.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(getTasksTC.fulfilled, (state, action) => {
        state[action.payload.todoListId] = action.payload.tasks
      })
      .addCase(addTaskTC.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task)
      })
      .addCase(removeTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoListId]
        const index = tasks.findIndex((t) => t.id === action.payload?.taskId)
        if (index > -1) tasks.splice(index, 1)
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        if (action.payload) {
          const tasks = state[action.payload.todoListId]
          const index = tasks.findIndex((t) => t.id === action.payload?.taskId)
          if (index > -1) tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      })
      .addCase(clearTasksTodolists, () => {
        return {}
      })
  },
  selectors: {
    tasksSelector: (slice) => slice,
  },
})

const getTasksTC = createAppAsyncThunk<{ tasks: Task[]; todoListId: string }, string>(
  `${tasksSlice.name}/getTasks`,
  async (todoListId: string) => {
    const res = await tasksApi.getTasks(todoListId)
    const tasks = res.data.items
    return { tasks, todoListId }
  }
)

const removeTaskTC = createAppAsyncThunk<DeleteTaskParams, DeleteTaskParams>(
  `${tasksSlice.name}/removeTask`,
  async (params, { dispatch }) => {
    let { todoListId, taskId } = params
    dispatch(changeTaskStatusAC({ todoListId, id: taskId, status: TaskStatuses.InProgress }))
    await tasksApi.deleteTask(params)
    dispatch(setAppSuccessAC({ success: 'the task was successfully deleted' }))
    return { todoListId, taskId }
  }
)

const addTaskTC = createAppAsyncThunk<{ task: Task }, AddTaskParams>(
  `${tasksSlice.name}/addTask`,
  async (params, { dispatch, rejectWithValue }) => {
    const res = await tasksApi.createTask(params)
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      const task = res.data.data.item
      dispatch(setAppSuccessAC({ success: 'the task was successfully added' }))
      return { task }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const updateTaskTC = createAppAsyncThunk<UpdateTaskParams, UpdateTaskParams>(
  `${tasksSlice.name}/updateTask`,
  async (params, thunkAPI) => {
    const { todoListId, taskId, domainModel } = params
    const { dispatch, rejectWithValue, getState } = thunkAPI
    let state = getState() as AppRootState
    const task = state.tasks[todoListId].find((t: Task) => t.id === taskId)
    if (!task) {
      dispatch(setAppErrorAC({ error: 'task not found' }))
      return rejectWithValue(null)
    }
    const model: UpdateTaskModel = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
      ...domainModel,
    }

    dispatch(changeTaskStatusAC({ todoListId, id: taskId, status: TaskStatuses.InProgress }))
    const res = await tasksApi.updateTask({ todoListId, taskId, domainModel: model })
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      dispatch(setAppSuccessAC({ success: 'the task was successfully updated' }))
      dispatch(changeTaskStatusAC({ todoListId, id: taskId, status: TaskStatuses.New }))
      return params
    } else {
      return rejectWithValue(null)
    }
  }
)

export const tasksReducer = tasksSlice.reducer
export const tasksThunks = { getTasksTC, addTaskTC, removeTaskTC, updateTaskTC }
export const { changeTaskTitleAC, changeTaskStatusAC } = tasksSlice.actions
export const { tasksSelector } = tasksSlice.selectors
