import { Paper } from '@mui/material'
import { Task } from 'common/types'
import { TaskStatuses } from 'common/enums'
import { useSelector } from 'react-redux'
import { tasksSelector } from 'services/reducers/tasksSlice'
import { selectTodolists } from 'services/reducers/todolistsSlice'
import { TodolistItem } from 'components/todolist-item'
import { FlexContainer } from 'common/ui'

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
      <Paper key={l.id} sx={{ padding: '18px', width: '280px' }} elevation={1}>
        <TodolistItem todolist={l} tasksForTodolist={tasksForTodolist} />
      </Paper>
    )
  })

  return (
    <FlexContainer gap="16px" pd="5px" ai="flex-start" style={{ overflow: 'auto' }}>
      {todolistsMap}
    </FlexContainer>
  )
}
