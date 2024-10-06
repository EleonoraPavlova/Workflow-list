import { TaskPriorities, TaskStatuses } from 'common/enums'
import { Tasks } from 'common/types'

export const todoListId1 = 'todolistId1'
export const todoListId2 = 'todolistId2'

export const mockTasks: Tasks = {
  [todoListId1]: [
    {
      id: 'taskId1',
      title: 'Salt',
      status: TaskStatuses.New,
      description: '',
      completed: true,
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todoListId1,
      deadline: '',
      order: 1,
      addedDate: '2024-10-06T09:47:21.933',
    },
  ],
  [todoListId2]: [
    {
      id: 'taskId2',
      title: 'Milk',
      status: TaskStatuses.Completed,
      description: '',
      completed: true,
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todoListId2,
      deadline: '',
      order: 1,
      addedDate: '2023-10-06T09:57:21.933',
    },
    {
      id: 'taskId3',
      title: 'Juice',
      status: TaskStatuses.Completed,
      description: '',
      completed: true,
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todoListId2,
      deadline: '',
      order: 1,
      addedDate: '2020-10-06T09:57:21.933',
    },
    {
      id: 'taskId4',
      title: 'Meat',
      status: TaskStatuses.New,
      description: '',
      completed: true,
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todoListId2,
      deadline: '',
      order: 1,
      addedDate: '2024-11-06T09:57:21.933',
    },
    {
      id: 'taskId5',
      title: 'Bread',
      status: TaskStatuses.New,
      description: '',
      completed: true,
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todoListId2,
      deadline: '',
      order: 1,
      addedDate: '2024-09-06T09:57:21.933',
    },
  ],
}
