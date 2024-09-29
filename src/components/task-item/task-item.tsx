import { ListItem, Checkbox, IconButton } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import Delete from '@mui/icons-material/Delete'

import { useTaskItem } from './hooks/useTaskItem'
import { Task } from 'common/types'
import { TaskStatuses } from 'common/enums'

import { EditableSpan } from 'components/editable-span'
import s from './task-item.module.scss'

type Props = {
  task: Task
}

export const TaskItem = ({ task }: Props) => {
  let { status, title } = task

  const { onRemoveHandler, changeTaskStatus, changeTaskTitle } = useTaskItem(task)
  const progress = status === TaskStatuses.InProgress
  const completed = status === TaskStatuses.Completed

  return (
    <ListItem sx={{ justifyContent: 'space-between' }} className={`${s.list} ${completed || progress ? s.done : ''}`}>
      <Checkbox
        checked={completed}
        onChange={changeTaskStatus}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        color="success"
        disabled={progress}
      />
      <EditableSpan
        value={title}
        additionalClass={s.editableSpan}
        onChange={changeTaskTitle}
        disabled={progress}
        isDone={completed || progress}
      />
      <IconButton aria-label="delete" onClick={onRemoveHandler} size="small" disabled={progress || completed}>
        <Delete fontSize="inherit" />
      </IconButton>
    </ListItem>
  )
}
