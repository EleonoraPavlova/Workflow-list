import { AddTaskParams, ResponseData, Task, UpdateTaskParams } from 'common/types'
import { instance } from './instance'

type GetTaskResponse = {
  error: string
  totalCount: number
  items: Task[]
}

export const tasksApi = {
  getTasks(todoListId: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todoListId}/tasks`)
  },

  createTask(params: AddTaskParams) {
    return instance.post<ResponseData<{ item: Task }>>(`todo-lists/${params.todoListId}/tasks`, {
      title: params.title,
    })
  },

  deleteTask(params: Omit<UpdateTaskParams, 'domainModel'>) {
    return instance.delete<ResponseData>(`/todo-lists/${params.todoListId}/tasks/${params.taskId}`)
  },

  updateTask(params: UpdateTaskParams) {
    return instance.put<ResponseData>(`/todo-lists/${params.todoListId}/tasks/${params.taskId}`, params.domainModel)
  },
}
