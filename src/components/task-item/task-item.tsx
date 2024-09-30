import { ListItem, Checkbox, IconButton, Typography } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import Delete from '@mui/icons-material/Delete'

import { useTaskItem } from './hooks/useTaskItem'
import { Task } from 'common/types'
import { TaskStatuses } from 'common/enums'

import { EditableSpan } from 'components/editable-span'
import s from './task-item.module.scss'
import { formatDate } from 'common/utils'
import { FlexContainer } from 'components/flex-container'

type Props = {
  task: Task
}

export const TaskItem = ({ task }: Props) => {
  let { status, title, addedDate } = task

  const { onRemoveHandler, changeTaskStatus, changeTaskTitle } = useTaskItem(task)
  const isInProgress = status === TaskStatuses.InProgress
  const isCompleted = status === TaskStatuses.Completed

  return (
    <div className={`${s.list} ${isCompleted ? s.done : ''}`}>
      <Checkbox
        checked={isCompleted}
        onChange={changeTaskStatus}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        color="success"
        disabled={isInProgress}
      />
      <FlexContainer gap="4px" fd="column" ai="flex-start">
        <EditableSpan
          value={title}
          onChange={changeTaskTitle}
          disabled={isInProgress}
          isDone={isCompleted || isInProgress}
        />
        <Typography variant="caption" sx={{ lineHeight: 0.5 }}>
          {formatDate(addedDate)}
        </Typography>
      </FlexContainer>
      <IconButton aria-label="delete" onClick={onRemoveHandler} size="small" disabled={isInProgress || isCompleted}>
        <Delete fontSize="inherit" />
      </IconButton>
    </div>
  )
}
