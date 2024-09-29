import { TodolistDomain } from 'common/types'
import { v1 } from 'uuid'

const todoListId1 = v1()
const todoListId2 = v1()

export const startStateTodolists = {
  todolists: [
    {
      id: todoListId1,
      title: 'Fruit',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'idle',
    },
    {
      id: todoListId2,
      title: 'Vegetables',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'loading', 
    },
  ] as TodolistDomain[],
}
