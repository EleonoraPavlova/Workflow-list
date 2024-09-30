import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { Task } from 'common/types'
import { TaskItem } from 'components/task-item'
import { useState } from 'react'

type Props = {
  tasksForTodolist: Task[]
}

export const Tasks = ({ tasksForTodolist }: Props) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  const sortedTasks = [...tasksForTodolist].sort((a, b) => {
    const dateA = new Date(a.addedDate).getTime()
    const dateB = new Date(b.addedDate).getTime()
    return sortDirection === 'asc' ? dateA - dateB : dateB - dateA
  })

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        sx={{ borderColor: '#8c61ff', fontSize: '8px', margin: '0 auto', color: '#8c61ff' }}
        onClick={toggleSortDirection}
        startIcon={sortDirection === 'asc' ? <ArrowDownward color={'inherit'} /> : <ArrowUpward color={'inherit'} />}>
        Sort by Date
      </Button>

      {sortedTasks.length ? (
        sortedTasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <Typography variant="subtitle2" style={{ margin: '0 auto' }}>
          No tasks yet
        </Typography>
      )}
    </>
  )
}
