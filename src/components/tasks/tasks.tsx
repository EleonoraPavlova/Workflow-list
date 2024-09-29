import { List, Typography } from '@mui/material'
import { Task } from 'common/types'
import { TaskItem } from 'components/task-item'

type Props = {
  tasksForTodolist: Task[]
}

export const Tasks = ({ tasksForTodolist }: Props) => {
  if (tasksForTodolist.length) {
    return (
      <List>
        {tasksForTodolist.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </List>
    )
  } else {
    return (
      <Typography variant="subtitle2" style={{ margin: '0 auto' }}>
        No tasks yet
      </Typography>
    )
  }
}
