import { TaskPriorities, TaskStatuses } from 'common/enums'

export type ResponseData<Data = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
  data: Data
}

export type ThunkErrorApiConfig = {
  errors: string[]
  fieldsErrors: FieldError[]
}

export type FieldError = {
  field: string
  error: string
}

export type LoginParams = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: boolean
}

export type Task = {
  description: string
  title: string
  completed: boolean
  status: TaskStatuses | number
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type Tasks = Record<string, Task[]>

export type UpdateTaskModel = {
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}

export type AddTaskParams = {
  title: string
  todoListId: string
}

export type UpdateTaskParams = {
  todoListId: string
  taskId: string
  domainModel: Partial<UpdateTaskModel>
}

export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type TodolistDomain = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export type DemoTodolist = TodolistDomain & {
  tasks: Task[]
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type FilterValues = 'all' | 'completed' | 'incomplete'
