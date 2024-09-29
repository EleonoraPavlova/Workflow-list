
import { Box, Paper } from '@mui/material'
import { Task } from 'common/types'
import { TaskStatuses } from 'common/enums'
import { useSelector } from 'react-redux'
import { tasksSelector } from 'services/reducers/tasksSlice'
import { selectTodolists } from 'services/reducers/todolistsSlice'
import { TodolistItem } from 'components/todolist-item'



export const Todolists = () => {
  const todolists = useSelector(selectTodolists)
  const tasks = useSelector(tasksSelector)

  const todolistsMap = todolists.map((l) => {
    let tasksForTodolist = tasks[l.id] as Task[]
    if (l.filter === 'completed') {
      tasksForTodolist = tasks[l.id].filter((t: Task) => t.status === TaskStatuses.Completed)
    }
    if (l.filter === 'incomplete') {
      tasksForTodolist = tasks[l.id].filter((t: Task) => t.status === TaskStatuses.New)
    }

    return (
      <Box key={l.id} sx={{ padding: '19px 15px 0 0' }}>
        <Paper sx={{ padding: '18px', width: '280px' }} elevation={1}>
          <TodolistItem todolist={l} demo={false} tasksForTodolist={tasksForTodolist} />
        </Paper>
      </Box>
    )
  })

  return <>{todolistsMap}</>
}
