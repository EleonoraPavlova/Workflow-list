import { FilterValues, RequestStatus } from 'common/types'
import { todoListId1, todoListId2 } from './mockTasks'

export const mockTodolists = {
  todolists: [
    {
      id: todoListId1,
      title: 'Shopping',
      filter: 'all' as FilterValues,
      addedDate: '18-08-1991',
      order: 1,
      entityStatus: 'idle' as RequestStatus,
    },
    {
      id: todoListId2,
      title: 'Household',
      filter: 'all' as FilterValues,
      addedDate: '15-01-2001',
      order: 2,
      entityStatus: 'idle' as RequestStatus,
    },
    {
      id: todoListId2,
      title: 'Hold',
      filter: 'completed' as FilterValues,
      addedDate: '28-09-1998',
      order: 3,
      entityStatus: 'idle' as RequestStatus,
    },
  ],
}
