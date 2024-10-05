import { Task } from 'common/types'
import { useState } from 'react'

export function useTasks(tasksForTodolist: Task[]) {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  const sortedTasks = [...tasksForTodolist].sort((a, b) => {
    const dateA = new Date(a.addedDate).getTime()
    const dateB = new Date(b.addedDate).getTime()
    return sortDirection === 'asc' ? dateA - dateB : dateB - dateA
  })

  return { sortedTasks, sortDirection, toggleSortDirection }
}
