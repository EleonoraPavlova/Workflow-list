import { memo } from 'react'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { TodolistDomain } from 'common/types'
import { useActions } from 'common/hooks'
import { todolistsThunks } from 'services/reducers/todolistsSlice'
import { FlexContainer } from 'common/ui'
import { EditableSpan } from 'components/editable-span'
import s from './todolist-title.module.scss'

type Props = {
  todolist: TodolistDomain
  disabledFor: boolean
}

export const TodolistTitle = memo(({ todolist, disabledFor }: Props) => {
  const { title, id, filter } = todolist
  const { removeTodolistTC, updateTodolistTC } = useActions(todolistsThunks)

  const changeTodolistTitle = (title: string) => {
    updateTodolistTC({ todoListId: id, title, filter })
  }

  const removeTodolist = () => {
    removeTodolistTC(id)
  }

  return (
    <FlexContainer jc="space-between">
      <EditableSpan
        value={title}
        onChange={changeTodolistTitle}
        additionalClass={s.editableSpan}
        disabled={disabledFor}
      />
      <IconButton aria-label="delete" size="small" disabled={disabledFor} onClick={removeTodolist}>
        <Delete />
      </IconButton>
    </FlexContainer>
  )
})
