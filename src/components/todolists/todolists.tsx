import { Paper } from '@mui/material'
import { DemoTodolist, Task } from 'common/types'
import { TaskStatuses } from 'common/enums'
import { useSelector } from 'react-redux'
import { tasksSelector } from 'services/reducers/tasksSlice'
import { selectTodolists } from 'services/reducers/todolistsSlice'
import { TodolistItem } from 'components/todolist-item'
import { FlexContainer } from 'common/ui'
import { mockTasks } from 'moc/initialState/mockTasks'

type Props = {
  demo: boolean
  todosDemo: DemoTodolist[]
}

export const Todolists = ({ demo, todosDemo }: Props) => {
  const todolists = useSelector(selectTodolists)
  const tasks = useSelector(tasksSelector)

  const whichTodolists = demo ? todosDemo : todolists
  const whichTasks = demo ? mockTasks : tasks

  const todolistsMap = whichTodolists.map((l) => {
    let tasksForTodolist = whichTasks[l.id] as Task[]

    if (l.filter === 'completed') {
      tasksForTodolist = whichTasks[l.id].filter((t: Task) => t.status === TaskStatuses.Completed)
    }
    if (l.filter === 'incomplete') {
      tasksForTodolist = whichTasks[l.id].filter((t: Task) => t.status === TaskStatuses.New)
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
