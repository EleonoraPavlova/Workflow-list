import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { Task } from 'common/types'
import { TaskItem } from 'components/task-item'
import { useTasks } from './hooks/useTasks'

type Props = {
  tasksForTodolist: Task[]
}

export const Tasks = ({ tasksForTodolist }: Props) => {
  const { sortDirection, sortedTasks, toggleSortDirection } = useTasks(tasksForTodolist)

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
