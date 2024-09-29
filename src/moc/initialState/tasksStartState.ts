import { TaskPriorities, TaskStatuses } from 'common/enums'
import { Tasks } from 'common/types'
import { v1 } from 'uuid'

export const todoListId1 = v1()
export const todoListId2 = v1()

export const startStateTasks: Tasks = {
  [todoListId1]: [
   
    {
      id: v1(),
      title: 'Salt',
      status: TaskStatuses.New,
      description: '',
      completed: true,
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todoListId1,
      deadline: '',
      order: 1,
      addedDate: '',
    },
  ],
  [todoListId2]: [
    {
      id: v1(),
      title: 'Milk',
      status: TaskStatuses.Completed,
      description: '',
      completed: true,
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todoListId2,
      deadline: '',
      order: 1,
      addedDate: '',
    },
    {
      id: v1(),
      title: 'Juice',
      status: TaskStatuses.Completed,
      description: '',
      completed: true,
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todoListId2,
      deadline: '',
      order: 1,
      addedDate: '',
    },
    {
      id: v1(),
      title: 'Meat',
      status: TaskStatuses.New,
      description: '',
      completed: true,
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todoListId2,
      deadline: '',
      order: 1,
      addedDate: '',
    },
    {
      id: v1(),
      title: 'Bread',
      status: TaskStatuses.New,
      description: '',
      completed: true,
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todoListId2,
      deadline: '',
      order: 1,
      addedDate: '',
    },
  ],
}
